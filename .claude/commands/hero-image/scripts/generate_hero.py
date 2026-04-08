#!/usr/bin/env python3
"""
Hero Image Generator for Sales Pages
Generates professional hero images with a subject composited into contextual scenes.
Uses Google Gemini API with native image generation.

Features:
- Identity-first prompt ordering for maximum fidelity
- 3-layer composition system (background/midground/foreground)
- Domain symbol library for conceptual imagery
- Backward-compatible with legacy pedro_photo/pedro_description configs
"""

import argparse
import json
import os
import sys
from io import BytesIO
from pathlib import Path
from typing import Optional

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from google import genai
from google.genai import types
from PIL import Image


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

GEMINI_MODEL = "gemini-3.1-flash-image-preview"  # Nano Banana 2 (production)
GEMINI_MODEL_CHEAP = "gemini-2.0-flash-exp-image-generation"  # cheapest (testing)

ASPECT_RATIOS = {
    "desktop": "16:9",
    "tablet":  "4:3",
    "mobile":  "9:16",
    "square":  "1:1",
}

SCENE_CONTEXTS = {
    "course":     "modern teaching studio with a large screen showing data visualizations, bookshelves, and warm ambient lighting",
    "consulting": "executive corner office with floor-to-ceiling windows overlooking a city skyline at dusk",
    "event":      "professional stage with dramatic spotlights, LED screens, and silhouetted audience",
    "saas":       "futuristic tech workspace with floating holographic dashboards and blue accent lighting",
    "wellness":   "serene outdoor morning setting with lush greenery and soft golden sunlight",
    "finance":    "sophisticated trading floor environment with multiple monitors displaying charts",
    "legal":      "elegant law library with leather-bound volumes and warm desk lamp lighting",
    "marketing":  "high-tech command center with multiple screens showing campaign metrics and growth charts",
}

PALETTES = {
    "premium":  {"primary": "#1a1a2e", "secondary": "#16213e", "accent": "#e94560"},
    "trust":    {"primary": "#0a1628", "secondary": "#1b3a5c", "accent": "#4fc3f7"},
    "energy":   {"primary": "#0d0d0d", "secondary": "#1a0a2e", "accent": "#ff6b35"},
    "growth":   {"primary": "#0a2e1a", "secondary": "#1b4332", "accent": "#52b788"},
    "creative": {"primary": "#2d1b69", "secondary": "#11001c", "accent": "#ff00ff"},
    "warm":     {"primary": "#2c1810", "secondary": "#4a2c17", "accent": "#f4a261"},
    "obsidian_gold": {"primary": "#1A0F0A", "secondary": "#3D2B1F", "accent": "#B5563A"},
}

DOMAIN_SYMBOLS = {
    "legal": ["scales of justice", "gavel", "leather-bound law volumes", "classical columns"],
    "finance": ["ascending charts", "golden coins", "candlestick graphs"],
    "education": ["open book", "graduation cap", "glowing lightbulb"],
    "marketing": ["data dashboard", "growth arrows", "target bullseye"],
    "technology": ["circuit board pattern", "floating holographic UI"],
    "time": ["analog clock face", "chronometer", "timeline arrows", "hourglass"],
    "transformation": ["curved arrows arc", "emerging from shadow", "ascending path"],
    "wellness": ["lotus flower", "gentle water ripples", "soft light rays"],
    "course": ["open book", "data visualizations on screen", "whiteboard diagrams"],
    "consulting": ["city skyline silhouette", "glass desk reflections", "subtle charts"],
    "event": ["stage spotlights", "audience silhouettes", "LED screen glow"],
    "saas": ["floating holographic UI panels", "code fragments", "data streams"],
}

NEGATIVE_PROMPT = (
    "blurry, low quality, distorted face, extra limbs, deformed hands, text, "
    "watermark, logo, signature, overexposed, underexposed, flat lighting, "
    "stock photo look, clipart, cartoon, illustration, painting, "
    "centered composition, symmetrical layout, "
    "wrong facial features, altered beard, different clothing than described, "
    "changed hair style, modified body proportions, added accessories not described"
)

DEFAULT_SUBJECT_DESCRIPTION = (
    "a confident Brazilian man in his 30s with short dark hair and a well-groomed beard, "
    "wearing a fitted dark blazer over a casual premium t-shirt"
)


# ---------------------------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------------------------

def _resolve_subject(config: dict) -> tuple:
    """Resolve subject_photo and subject_description with backward compat aliases.

    Returns (photo_path, description).
    """
    photo = config.get("subject_photo") or config.get("pedro_photo")
    desc = config.get("subject_description") or config.get("pedro_description") or DEFAULT_SUBJECT_DESCRIPTION
    return photo, desc


def _derive_midground(config: dict, target: str = "desktop") -> str:
    """Build midground description from explicit symbols, domain library, or context fallback."""
    symbols = config.get("symbols")
    layers = config.get("layers", {})
    midground_override = layers.get("midground")
    compact = target == "mobile"

    if midground_override and midground_override != "auto":
        if compact:
            return midground_override + " — ALL elements scaled DOWN to fit a compact top-of-frame composition"
        return midground_override

    if symbols:
        parts = []
        for i, sym in enumerate(symbols[:4]):
            obj = sym["object"]
            style = sym.get("style", "semi-transparent, ethereal")
            if compact:
                if i == 0:
                    parts.append(f"a SMALL {obj} ({style}, scaled down) tucked tightly behind the person's head/shoulders")
                elif i == 1:
                    parts.append(f"a very small {obj} ({style}, minimal size) barely visible beside the person")
                # skip tertiary symbols on mobile — too cluttered
            else:
                if i == 0:
                    parts.append(f"a large {obj} ({style}) as the dominant midground element")
                elif i == 1:
                    parts.append(f"a smaller {obj} ({style}) as secondary element")
                else:
                    parts.append(f"a subtle hint of {obj} ({style})")
        return ", ".join(parts)

    context_key = config.get("context", "course")
    domain_syms = DOMAIN_SYMBOLS.get(context_key, DOMAIN_SYMBOLS.get("transformation", []))
    if domain_syms:
        primary = domain_syms[0]
        secondary = domain_syms[1] if len(domain_syms) > 1 else None
        desc = f"a semi-transparent {primary} as a subtle conceptual element"
        if secondary:
            desc += f", with a faint {secondary} in the far background"
        return desc

    return "abstract geometric shapes, floating particles, thin luminous lines"


def _build_layout_block(config: dict, target: str, palette: dict) -> str:
    """Build layout instructions for the given target size."""
    if target == "mobile":
        return (
            "CRITICAL MOBILE LAYOUT CONSTRAINT — The person and visual elements "
            "must be contained in the TOP QUARTER of the frame (20-25% of total height). "
            "Show head and shoulders with FULL HEAD VISIBLE — do NOT crop the top of the head. "
            "Leave generous headroom above the hair. "
            "The BOTTOM 75-80% of the image MUST be COMPLETELY EMPTY — "
            f"nothing but a solid clean gradient from {palette['primary']} to {palette['secondary']}. "
            "NO particles, NO bokeh, NO lines, NO visual elements whatsoever in the "
            "bottom three-quarters. This massive empty area is reserved for text overlay."
        )
    return (
        "The person is positioned on the RIGHT side of the frame, occupying "
        "approximately 40-45% of the image width. "
        "The LEFT 50-55% of the image MUST be a clean, visually rich but TEXT-FRIENDLY area — "
        f"use a subtle gradient from {palette['primary']} to {palette['secondary']} with "
        "conceptual elements that create depth WITHOUT competing with text overlays."
    )


# ---------------------------------------------------------------------------
# Prompt Builder — Identity-First Ordering
# ---------------------------------------------------------------------------

def build_prompt(config: dict, target: str = "desktop") -> str:
    """Build the image generation prompt from structured config.

    Prompt section order (critical for fidelity — model weights earlier tokens more):
    1. IDENTITY LOCK — subject description + fidelity constraints + camera language
    2. LAYERS — background / midground / foreground with conceptual symbols
    3. LAYOUT — text zone constraints, person positioning
    4. STYLE — tone, color palette, quality directives, no-text/no-logos
    """
    product = config["product"]
    offer = config.get("offer", "")
    tone = config.get("tone", "authority, trust, transformation")
    context_key = config.get("context", "course")
    palette_key = config.get("palette", "premium")

    _, subject_desc = _resolve_subject(config)
    scene = SCENE_CONTEXTS.get(context_key, context_key)
    palette = PALETTES.get(palette_key, PALETTES["premium"])
    layers = config.get("layers", {})

    # --- Section 1: IDENTITY LOCK (FIRST = highest weight) ---
    if target == "mobile":
        camera = "Camera: close-up (head and shoulders with GENEROUS HEADROOM above the head, person positioned in the TOP QUARTER of the frame but NOT cropped — full head must be visible), 135mm f/2.0 equivalent"
    else:
        camera = "Camera: medium shot (waist-up), 85mm f/1.8 equivalent"

    identity_section = (
        f"IDENTITY LOCK — CRITICAL, HIGHEST PRIORITY: "
        f"The subject is {subject_desc}. "
        "You MUST preserve the subject's EXACT facial features, bone structure, beard pattern, "
        "hair texture, skin tone, body proportions, and clothing from the reference photo. "
        "DO NOT alter, improve, idealize, or stylize any facial feature. "
        f"{camera}, subject looking directly at "
        "camera with a confident, approachable expression. Sharp focus on face and eyes."
    )

    # --- Section 2: LAYERS (background / midground / foreground) ---
    bg = layers.get("background", scene)
    mg = _derive_midground(config, target)
    fg = layers.get("foreground", f"warm rim light in {palette['accent']} separating subject from background")

    layers_section = (
        f"COMPOSITION LAYERS: "
        f"BACKGROUND — {bg}. "
        f"MIDGROUND — {mg}. "
        f"FOREGROUND — {fg}."
    )

    # --- Section 3: LAYOUT ---
    layout_instruction = _build_layout_block(config, target, palette)
    layout_section = f"LAYOUT: {layout_instruction}"

    # --- Section 4: STYLE ---
    style_section = (
        f"This is a hero image for a sales page selling: {product}. "
        f"{'Offer: ' + offer + '. ' if offer else ''}"
        f"The mood and tone must convey: {tone}. "
        "STYLE: High-end advertising photography, cinematic color grading, shallow depth of field "
        "on background elements. Dramatic rim lighting separating the person from the background. "
        f"Color accents in {palette['accent']}. Ultra-sharp, magazine-quality resolution. "
        "The image should look like it was produced by a top-tier graphic design agency. "
        "ABSOLUTELY NO text, NO logos, NO watermarks, NO typography anywhere in the image."
    )

    return f"{identity_section}\n\n{layers_section}\n\n{layout_section}\n\n{style_section}"


def build_prompt_config(config: dict) -> dict:
    """Build and return the full structured prompt config as JSON (for logging/audit)."""
    _, subject_desc = _resolve_subject(config)

    result = {
        "product": config["product"],
        "offer": config.get("offer", ""),
        "tone": config.get("tone", "authority, trust, transformation"),
        "context": config.get("context", "course"),
        "palette": config.get("palette", "premium"),
        "subject_description": subject_desc,
        "symbols": config.get("symbols", []),
        "layers": config.get("layers", {}),
        "seed": config.get("seed", 42),
        "model": GEMINI_MODEL,
        "api_params": {
            "seed": config.get("seed", 42),
        },
        "targets": {},
    }

    for target, ratio in ASPECT_RATIOS.items():
        if target in config.get("sizes", ["desktop", "tablet", "mobile"]):
            result["targets"][target] = {
                "aspect_ratio": ratio,
                "prompt": build_prompt(config, target),
                "negative_prompt": NEGATIVE_PROMPT,
            }

    return result


# ---------------------------------------------------------------------------
# Image Generation
# ---------------------------------------------------------------------------

def generate_hero(config: dict, cheap: bool = False) -> dict:
    """Generate hero images for all requested sizes. Returns {target: filepath}."""

    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("ERROR: Set GEMINI_API_KEY or GOOGLE_API_KEY environment variable.")
        sys.exit(1)

    model = GEMINI_MODEL_CHEAP if cheap else GEMINI_MODEL
    if cheap:
        print(f"CHEAP MODE: using {model}")

    client = genai.Client(api_key=api_key)

    # Load subject's reference photo (with backward compat alias)
    subject_photo_path, _ = _resolve_subject(config)
    if not subject_photo_path or not Path(subject_photo_path).exists():
        print(f"ERROR: Subject reference photo not found at: {subject_photo_path}")
        sys.exit(1)

    subject_image = Image.open(subject_photo_path)
    print(f"Loaded subject reference photo: {subject_photo_path} ({subject_image.size})")

    # Prepare output directory
    output_dir = Path(config.get("output_dir", "./hero-output"))
    output_dir.mkdir(parents=True, exist_ok=True)

    # Save prompt config for audit
    prompt_config = build_prompt_config(config)
    config_path = output_dir / "prompt-config.json"
    with open(config_path, "w", encoding="utf-8") as f:
        json.dump(prompt_config, f, indent=2, ensure_ascii=False)
    print(f"Saved prompt config: {config_path}")

    sizes = config.get("sizes", ["desktop", "tablet", "mobile"])
    seed = config.get("seed", 42)
    results = {}

    # Mobile is ALWAYS derived from desktop — never generated independently.
    # Generate desktop first (and tablet if requested), then derive mobile via PIL.
    gemini_sizes = [s for s in sizes if s != "mobile"]
    needs_mobile = "mobile" in sizes

    # Ensure desktop is generated if mobile is requested (mobile depends on it)
    if needs_mobile and "desktop" not in gemini_sizes:
        gemini_sizes.insert(0, "desktop")

    for target in gemini_sizes:
        if target not in ASPECT_RATIOS:
            print(f"WARNING: Unknown target '{target}', skipping.")
            continue

        ratio = ASPECT_RATIOS[target]
        prompt = build_prompt(config, target)

        print(f"\n--- Generating {target} ({ratio}) ---")
        print(f"Prompt preview: {prompt[:200]}...")

        try:
            response = client.models.generate_content(
                model=model,
                contents=[
                    prompt,
                    subject_image,
                ],
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE", "TEXT"],
                    seed=seed,
                    image_config=types.ImageConfig(
                        aspect_ratio=ratio,
                    ),
                ),
            )

            # Extract and save generated image(s)
            saved = False
            for i, part in enumerate(response.candidates[0].content.parts):
                if part.inline_data is not None:
                    img_bytes = part.inline_data.data
                    img = Image.open(BytesIO(img_bytes))

                    filename = f"hero-{target}.png"
                    filepath = output_dir / filename
                    img.save(filepath, "PNG", quality=95)

                    # Also save JPEG for web
                    jpg_path = output_dir / f"hero-{target}.jpg"
                    img_rgb = img.convert("RGB") if img.mode == "RGBA" else img
                    img_rgb.save(jpg_path, "JPEG", quality=90, optimize=True)

                    print(f"Saved: {filepath} ({img.size})")
                    print(f"Saved: {jpg_path} (web-optimized)")
                    results[target] = str(filepath)
                    saved = True
                    break  # take first image only

                elif part.text:
                    print(f"Model note: {part.text[:200]}")

            if not saved:
                print(f"WARNING: No image generated for {target}.")
                if response.candidates and response.candidates[0].finish_reason:
                    print(f"Finish reason: {response.candidates[0].finish_reason}")

        except Exception as e:
            print(f"ERROR generating {target}: {e}")
            continue

    # --- Derive mobile from desktop (PIL post-processing) ---
    if needs_mobile and "desktop" in results:
        mobile_path = _derive_mobile_from_desktop(
            desktop_path=results["desktop"],
            output_dir=output_dir,
            mobile_ratio=config.get("mobile_hero_ratio", 0.30),
        )
        if mobile_path:
            results["mobile"] = mobile_path
    elif needs_mobile:
        print("WARNING: Cannot derive mobile — desktop generation failed.")

    return results


def _derive_mobile_from_desktop(
    desktop_path: str,
    output_dir: Path,
    mobile_ratio: float = 0.30,
) -> Optional[str]:
    """Derive mobile hero from desktop image via PIL.

    Takes the desktop hero, scales it proportionally to occupy `mobile_ratio`
    (default 30%) of a 9:16 mobile canvas, centers it at the top, and fills
    the rest with a smooth gradient sampled from the desktop's dark edges.
    Applies smooth fade transition at the bottom edge.

    This approach guarantees perfect visual consistency between desktop and mobile.
    """
    import numpy as np

    print(f"\n--- Deriving mobile from desktop ({mobile_ratio:.0%} top) ---")

    desktop = Image.open(desktop_path)
    dw, dh = desktop.size

    # Mobile canvas: 9:16 at the same pixel density scale
    mw = min(dw, 768)
    mh = int(mw * 16 / 9)

    # Scale desktop to fill mobile_ratio of mobile height
    target_h = int(mh * mobile_ratio)
    scale = target_h / dh
    target_w = int(dw * scale)

    desktop_scaled = desktop.resize((target_w, target_h), Image.LANCZOS)
    darr = np.array(desktop_scaled).astype(float)[:, :, :3]

    # If wider than mobile, crop center; if narrower, will center with gradient
    if target_w > mw:
        crop_x = (target_w - mw) // 2
        darr = darr[:, crop_x:crop_x + mw, :]
        paste_w = mw
        x_off = 0
    else:
        paste_w = target_w
        x_off = (mw - target_w) // 2

    # Sample gradient colors from desktop edges
    desktop_arr = np.array(desktop).astype(float)
    bg_bottom = desktop_arr[dh - 10:dh, 0:100, :3].mean(axis=(0, 1))
    bg_top = desktop_arr[dh // 2:dh // 2 + 10, 0:100, :3].mean(axis=(0, 1))

    # Build canvas with smooth vertical gradient
    canvas_arr = np.zeros((mh, mw, 3), dtype=float)
    for y in range(mh):
        t = y / mh
        canvas_arr[y, :] = bg_top * (1 - t) + bg_bottom * t

    # Paste scaled desktop centered at top
    for py in range(target_h):
        canvas_arr[py, x_off:x_off + paste_w] = darr[py, :paste_w]

    # Feather lateral edges if narrower than mobile
    if target_w < mw:
        fade_w = 30
        for py in range(target_h):
            grad_t = py / mh
            bg = bg_top * (1 - grad_t) + bg_bottom * grad_t
            for dx in range(fade_w):
                t = dx / fade_w
                canvas_arr[py, x_off + dx] = bg * (1 - t) + canvas_arr[py, x_off + dx] * t
                canvas_arr[py, x_off + paste_w - 1 - dx] = bg * (1 - t) + canvas_arr[py, x_off + paste_w - 1 - dx] * t

    # Smooth bottom transition (80px fade)
    fade_h = 80
    fade_start = target_h - fade_h
    for y in range(fade_start, target_h + 15):
        if y >= mh:
            break
        t = min(1.0, (y - fade_start) / (fade_h + 15))
        grad_t = y / mh
        bg_row = bg_top * (1 - grad_t) + bg_bottom * grad_t
        canvas_arr[y] = canvas_arr[y] * (1 - t) + bg_row * t

    result = Image.fromarray(canvas_arr.clip(0, 255).astype(np.uint8))

    png_path = output_dir / "hero-mobile.png"
    jpg_path = output_dir / "hero-mobile.jpg"
    result.save(png_path, "PNG", quality=95)
    result.convert("RGB").save(jpg_path, "JPEG", quality=90, optimize=True)

    print(f"Saved: {png_path} ({result.size}) — derived from desktop at {mobile_ratio:.0%}")
    print(f"Saved: {jpg_path} (web-optimized)")

    return str(png_path)


def _get_target_dimensions(target: str) -> Optional[tuple]:
    """Return target pixel dimensions for each screen size."""
    dims = {
        "desktop": (1920, 1080),
        "tablet":  (1024, 768),
        "mobile":  (750, 1334),
        "square":  (1080, 1080),
    }
    return dims.get(target)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Generate hero images for sales pages with subject photo compositing."
    )

    parser.add_argument("--config", "-c", type=str,
        help="Path to JSON config file with all parameters.")
    parser.add_argument("--subject-photo", type=str,
        help="Path to subject's reference photo.")
    parser.add_argument("--pedro-photo", "-p", type=str,
        help="(Alias for --subject-photo) Path to reference photo.")
    parser.add_argument("--product", type=str,
        help="Product/offer being sold (e.g. 'Curso de Direito Penal').")
    parser.add_argument("--offer", type=str, default="",
        help="Offer details (e.g. 'De R$997 por R$497').")
    parser.add_argument("--tone", type=str, default="authority, trust, transformation",
        help="Comma-separated tone keywords.")
    parser.add_argument("--context", type=str, default="course",
        choices=list(SCENE_CONTEXTS.keys()),
        help="Scene context type.")
    parser.add_argument("--palette", type=str, default="premium",
        choices=list(PALETTES.keys()),
        help="Color palette preset.")
    parser.add_argument("--symbols", type=str, default=None,
        help="JSON string of symbols array, e.g. '[{\"object\":\"scales\",\"meaning\":\"justice\"}]'")
    parser.add_argument("--seed", type=int, default=42,
        help="Seed for reproducible generation (default: 42).")
    parser.add_argument("--sizes", type=str, nargs="+",
        default=["desktop", "tablet", "mobile"],
        choices=list(ASPECT_RATIOS.keys()),
        help="Target sizes to generate.")
    parser.add_argument("--output-dir", "-o", type=str, default="./hero-output",
        help="Output directory for generated images.")
    parser.add_argument("--dry-run", action="store_true",
        help="Only build and display the prompt config, do not call API.")
    parser.add_argument("--cheap", action="store_true",
        help="Use cheapest model (gemini-2.0-flash-exp) for testing iterations.")

    args = parser.parse_args()

    # Build config from JSON file or CLI args
    if args.config:
        with open(args.config, "r", encoding="utf-8") as f:
            config = json.load(f)
        # CLI overrides for config-file mode
        if args.sizes != ["desktop", "tablet", "mobile"]:
            config["sizes"] = args.sizes
        if args.output_dir != "./hero-output":
            config["output_dir"] = args.output_dir
    else:
        if not args.product:
            parser.error("--product is required when not using --config.")

        subject_photo = args.subject_photo or args.pedro_photo
        if not subject_photo and not args.dry_run:
            parser.error("--subject-photo (or --pedro-photo) is required when not using --config.")

        config = {
            "product": args.product,
            "offer": args.offer,
            "tone": args.tone,
            "context": args.context,
            "palette": args.palette,
            "subject_photo": subject_photo,
            "seed": args.seed,
            "sizes": args.sizes,
            "output_dir": args.output_dir,
        }

        if args.symbols:
            config["symbols"] = json.loads(args.symbols)

    if args.dry_run:
        prompt_config = build_prompt_config(config)
        print(json.dumps(prompt_config, indent=2, ensure_ascii=False))
        return

    results = generate_hero(config, cheap=args.cheap)

    print(f"\n{'='*60}")
    print(f"Generation complete. {len(results)} images generated.")
    for target, path in results.items():
        print(f"  {target}: {path}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
