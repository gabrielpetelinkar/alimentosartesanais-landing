#!/usr/bin/env python3
"""Generate 600x600 Hotmart product cover from hero image + LP branding."""

from PIL import Image, ImageDraw, ImageFont
import os

HERO = "outputs/premium-design/obsidian_gold/hero-output-v2/hero-desktop.jpg"
OUTPUT = "outputs/premium-design/obsidian_gold/capa-hotmart-600x600.png"
SIZE = 600

# Colors (Obsidian Gold)
BG = (10, 10, 10)
GOLD = (212, 168, 83)
WHITE = (250, 245, 235)
CREAM = (196, 185, 154)
DARK = (30, 25, 15)

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
    canvas.paste(person, (0, 0))

    # Gradient overlays
    grad = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(grad)

    # Bottom gradient — strong (text area)
    for y in range(SIZE):
        if y > SIZE * 0.40:
            p = (y - SIZE * 0.40) / (SIZE * 0.60)
            a = int(min(250, p ** 1.3 * 280))
            d.rectangle([(0, y), (SIZE, y + 1)], fill=(10, 10, 10, a))
        elif y < SIZE * 0.10:
            p = 1 - (y / (SIZE * 0.10))
            d.rectangle([(0, y), (SIZE, y + 1)], fill=(10, 10, 10, int(p * 60)))

    # Left edge subtle
    for x in range(int(SIZE * 0.08)):
        p = 1 - (x / (SIZE * 0.08))
        d.rectangle([(x, 0), (x + 1, SIZE)], fill=(10, 10, 10, int(p * 70)))

    canvas = Image.alpha_composite(canvas, grad)
    draw = ImageDraw.Draw(canvas)

    # — Layout from bottom up —

    # Bottom gold bar
    bar_h = 48
    bar_y = SIZE - bar_h
    draw.rectangle([(0, bar_y), (SIZE, SIZE)], fill=GOLD)
    draw.text((32, bar_y + 11), "R$ 27", fill=DARK, font=font("ExtraBold", 22))
    draw.text((118, bar_y + 16), "48 pág  ·  15 capítulos  ·  3 pilares", fill=(60, 48, 20), font=font("Medium", 11))

    # Title area
    title_y = bar_y - 120
    draw.text((32, title_y), "Como Criar,", fill=WHITE, font=font("ExtraBold", 36))
    draw.text((32, title_y + 42), "Vender e Escalar", fill=WHITE, font=font("ExtraBold", 36))

    # Subtitle
    draw.text((32, title_y + 90), "Alimentos Artesanais", fill=CREAM, font=font("Medium", 16))

    # Gold accent line
    line_y = title_y - 18
    draw.rectangle([(32, line_y), (100, line_y + 3)], fill=GOLD)

    # Eyebrow label
    draw.text((32, line_y - 22), "GUIA ESTRATÉGICO", fill=GOLD, font=font("SemiBold", 10))

    # Save
    canvas = canvas.convert("RGB")
    canvas.save(OUTPUT, quality=95)
    print(f"Saved: {OUTPUT} ({canvas.size})")

if __name__ == "__main__":
    main()
