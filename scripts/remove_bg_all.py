#!/usr/bin/env python3
"""
Remove backgrounds from ALL hero carousel + product images using rembg.
Saves back as transparent WebP in-place.
"""
import os
import sys
from pathlib import Path
from PIL import Image
import numpy as np

# rembg needs onnxruntime which was installed
from rembg import remove

BASE_DIR = Path("/home/z/my-project/public")

# ── 1. Hero carousel images (9 webp files) ──
HERO_IMAGES = [
    BASE_DIR / "amc-cm3400.webp",
    BASE_DIR / "amc-3200.webp",
    BASE_DIR / "amc-8100.webp",
    BASE_DIR / "amc-9200.webp",
    BASE_DIR / "amc-8300-pro.webp",
    BASE_DIR / "amc-cm3400max.webp",
    BASE_DIR / "amc-2000.webp",
    BASE_DIR / "amc-9100.webp",
    BASE_DIR / "amc-8200.webp",
]

# ── 2. Product detail images (all img-*.webp in uploads/products/*/) ──
PRODUCT_DIR = BASE_DIR / "uploads" / "products"
PRODUCT_IMAGES = sorted(PRODUCT_DIR.glob("*/img-*.webp"))

ALL_IMAGES = HERO_IMAGES + PRODUCT_IMAGES


def process_image(input_path: Path) -> bool:
    """Remove background and save as transparent WebP."""
    if not input_path.exists():
        print(f"  [SKIP] Not found: {input_path}")
        return False

    try:
        # Open original
        img = Image.open(input_path).convert("RGBA")

        # Remove background using rembg
        result = remove(img)

        # Save as transparent WebP, overwriting original
        # Use high quality (95) for minimal quality loss
        result.save(input_path, "WEBP", quality=95, lossless=False)

        # Check if actually transparent now
        if result.mode == "RGBA":
            arr = np.array(result)
            alpha = arr[:, :, 3]
            transparent_pct = (alpha < 10).sum() / alpha.size * 100
            print(f"  [OK] {input_path.name} — {transparent_pct:.1f}% transparent pixels")
        else:
            print(f"  [OK] {input_path.name} (no alpha)")

        return True
    except Exception as e:
        print(f"  [ERR] {input_path.name}: {e}")
        return False


def main():
    print(f"Found {len(ALL_IMAGES)} images to process")
    print(f"  Hero: {len(HERO_IMAGES)}")
    print(f"  Products: {len(PRODUCT_IMAGES)}")
    print()

    ok = 0
    fail = 0
    for i, img_path in enumerate(ALL_IMAGES, 1):
        label = "HERO" if img_path in HERO_IMAGES else "PROD"
        print(f"[{i}/{len(ALL_IMAGES)}] [{label}] {img_path.relative_to(BASE_DIR)}")
        if process_image(img_path):
            ok += 1
        else:
            fail += 1

    print(f"\nDone! {ok} succeeded, {fail} failed out of {len(ALL_IMAGES)}")


if __name__ == "__main__":
    main()