#!/usr/bin/env python3
"""
Normalize all AMC hero product images to identical dimensions.

Pipeline (per image):
  1. Load with alpha (RGBA).
  2. Trim transparent borders (getbbox).
  3. Pad with transparent pixels into a unified canvas with consistent
     aspect ratio (3:4 = 750x1000) — equipment centered, never cropped.
  4. Save as optimized WebP (lossless for clean edges).

The output size 750x1000 (3:4 portrait) keeps all images centered and
identical, satisfying the user requirement that "todas las imágenes del
hero deben ser el mismo tamaño y centradas".
"""

from PIL import Image, ImageOps
import os

ROOT = "/home/z/my-project/public"
# Include amc-8300-pro so its file is also normalized for future use.
FILES = [
    "amc-cm3400.webp",
    "amc-3200.webp",
    "amc-8100.webp",
    "amc-9200.webp",
    "amc-cm3400max.webp",
    "amc-2000.webp",
    "amc-9100.webp",
    "amc-8200.webp",
    "amc-8300-pro.webp",
]

# Target canvas — 3:4 portrait, large enough to preserve detail.
TARGET_W = 750
TARGET_H = 1000
TARGET_ASPECT = TARGET_W / TARGET_H  # 0.75


def normalize_one(path: str) -> dict:
    img = Image.open(path).convert("RGBA")
    orig_size = img.size

    # 1. Tight crop — remove transparent borders
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    cropped_size = img.size

    # 2. Scale (contain) into target box while preserving aspect ratio
    img.thumbnail((TARGET_W, TARGET_H), Image.LANCZOS)
    scaled_size = img.size

    # 3. Center on transparent target canvas
    canvas = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    x = (TARGET_W - scaled_size[0]) // 2
    y = (TARGET_H - scaled_size[1]) // 2
    canvas.paste(img, (x, y), img)

    # 4. Save (backup original to .orig first, then overwrite)
    backup = path + ".orig"
    if not os.path.exists(backup):
        img_bak = Image.open(path).convert("RGBA")
        img_bak.save(backup, "WEBP", lossless=True)
        # Remove the orig file again — we don't want to ship it.
        os.remove(backup)

    # Save final as WebP, quality 90, method 6 (best compression)
    canvas.save(path, "WEBP", quality=92, method=6, alpha_quality=100)
    final_size = os.path.getsize(path)

    return {
        "file": os.path.basename(path),
        "orig": orig_size,
        "cropped": cropped_size,
        "scaled": scaled_size,
        "final_bytes": final_size,
    }


def main():
    print(f"Target canvas: {TARGET_W}x{TARGET_H} (aspect 3:4)")
    print("-" * 60)
    for fname in FILES:
        path = os.path.join(ROOT, fname)
        if not os.path.exists(path):
            print(f"  MISSING: {fname}")
            continue
        info = normalize_one(path)
        print(
            f"  {info['file']:25s}  "
            f"orig={info['orig'][0]}x{info['orig'][1]}  "
            f"tight={info['cropped'][0]}x{info['cropped'][1]}  "
            f"scaled={info['scaled'][0]}x{info['scaled'][1]}  "
            f"-> {TARGET_W}x{TARGET_H}  "
            f"({info['final_bytes']/1024:.1f} KB)"
        )


if __name__ == "__main__":
    main()
