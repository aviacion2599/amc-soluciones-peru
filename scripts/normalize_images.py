#!/usr/bin/env python3
"""Normalize all product + hero images to 3:4 aspect ratio canvas (800x1067).
Centers the content with transparent padding. Overwrites in place as WebP."""
import os
import sys
from pathlib import Path
from PIL import Image

CANVAS_W, CANVAS_H = 800, 1067  # 3:4 ratio
QUALITY = 95

def normalize_image(path: Path):
    img = Image.open(path).convert("RGBA")
    iw, ih = img.size
    
    # Scale down if larger than canvas
    scale = min(CANVAS_W / iw, CANVAS_H / ih, 1.0)
    if scale < 1.0:
        new_w = int(iw * scale)
        new_h = int(ih * scale)
        img = img.resize((new_w, new_h), Image.LANCZOS)
        iw, ih = new_w, new_h
    
    # Create canvas
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    
    # Center image on canvas
    x = (CANVAS_W - iw) // 2
    y = (CANVAS_H - ih) // 2
    canvas.paste(img, (x, y))
    
    canvas.save(path, "WEBP", quality=QUALITY, lossless=False)
    print(f"[OK] {path.relative_to(BASE)}")

BASE = Path("/home/z/my-project/public")

# Hero images
hero_imgs = sorted(BASE.glob("amc-*.webp"))
# Product images
product_imgs = sorted((BASE / "uploads" / "products").glob("*/img-*.webp"))

all_imgs = hero_imgs + product_imgs
print(f"Normalizing {len(all_imgs)} images to {CANVAS_W}x{CANVAS_H}...")

for p in all_imgs:
    normalize_image(p)

print("Done!")