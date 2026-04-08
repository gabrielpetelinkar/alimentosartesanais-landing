#!/usr/bin/env python3
"""Generate 600x600 Hotmart product cover — Empório (Terracota + Kraft) palette."""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os

HERO = "outputs/premium-design/obsidian_gold/hero-output-v2/hero-desktop.jpg"
OUTPUT = "outputs/premium-design/obsidian_gold/capa-hotmart-600x600.png"
SIZE = 600

# Colors (Empório — Terracota + Kraft)
BG = (245, 237, 224)        # Kraft base
TERRACOTA = (181, 86, 58)   # Accent
TERRACOTA_DARK = (139, 58, 42)  # Accent dark
BROWN = (61, 43, 31)        # Text primary
BROWN_MED = (107, 87, 68)   # Text secondary
CREAM = (255, 249, 240)     # Surface

def font(name, size):
    return ImageFont.truetype(f"/tmp/Montserrat-{name}.ttf", size)

def main():
    hero = Image.open(HERO).convert("RGBA")
    canvas = Image.new("RGBA", (SIZE, SIZE), BG)

    # Crop person from hero (center-right)
    hw, hh = hero.size
    crop_h = hh
    crop_w = crop_h
    crop_left = int(hw * 0.28)
    crop_right = crop_left + crop_w
    if crop_right > hw:
        crop_right = hw
        crop_left = hw - crop_w
    person = hero.crop((crop_left, 0, crop_right, crop_h)).resize((SIZE, SIZE), Image.LANCZOS)

    # Warm the person image
    enhancer = ImageEnhance.Color(person)
    person = enhancer.enhance(1.15)  # slightly more saturated

    canvas.paste(person, (0, 0))

    # Gradient overlays — kraft tones instead of black
    grad = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(grad)

    # Bottom gradient — kraft (text area)
    for y in range(SIZE):
        if y > SIZE * 0.40:
            p = (y - SIZE * 0.40) / (SIZE * 0.60)
            a = int(min(250, p ** 1.3 * 280))
            d.rectangle([(0, y), (SIZE, y + 1)], fill=(BG[0], BG[1], BG[2], a))
        elif y < SIZE * 0.10:
            p = 1 - (y / (SIZE * 0.10))
            d.rectangle([(0, y), (SIZE, y + 1)], fill=(BG[0], BG[1], BG[2], int(p * 60)))

    # Left edge subtle — kraft
    for x in range(int(SIZE * 0.08)):
        p = 1 - (x / (SIZE * 0.08))
        d.rectangle([(x, 0), (x + 1, SIZE)], fill=(BG[0], BG[1], BG[2], int(p * 70)))

    canvas = Image.alpha_composite(canvas, grad)
    draw = ImageDraw.Draw(canvas)

    # — Layout from bottom up —

    # Bottom terracota bar
    bar_h = 48
    bar_y = SIZE - bar_h
    draw.rectangle([(0, bar_y), (SIZE, SIZE)], fill=TERRACOTA)
    draw.text((32, bar_y + 11), "R$ 27", fill=CREAM, font=font("ExtraBold", 22))
    draw.text((118, bar_y + 16), "48 pag  ·  15 capitulos  ·  3 pilares", fill=(255, 220, 200), font=font("Medium", 11))

    # Title area
    title_y = bar_y - 120
    draw.text((32, title_y), "Como Criar,", fill=BROWN, font=font("ExtraBold", 36))
    draw.text((32, title_y + 42), "Vender e Escalar", fill=BROWN, font=font("ExtraBold", 36))

    # Subtitle
    draw.text((32, title_y + 90), "Alimentos Artesanais", fill=BROWN_MED, font=font("Medium", 16))

    # Terracota accent line
    line_y = title_y - 18
    draw.rectangle([(32, line_y), (100, line_y + 3)], fill=TERRACOTA)

    # Eyebrow label
    draw.text((32, line_y - 22), "GUIA ESTRATEGICO", fill=TERRACOTA, font=font("SemiBold", 10))

    # Save
    canvas = canvas.convert("RGB")
    canvas.save(OUTPUT, quality=95)
    print(f"Saved: {OUTPUT} ({canvas.size})")

if __name__ == "__main__":
    main()
