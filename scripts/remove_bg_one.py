#!/usr/bin/env python3
"""Remove background from a single image using rembg, save as transparent WebP."""
import sys
from pathlib import Path
from PIL import Image
from rembg import remove

def process(input_path: str):
    p = Path(input_path)
    if not p.exists():
        print(f"[SKIP] Not found: {p}")
        return
    
    img = Image.open(p).convert("RGBA")
    result = remove(img)
    result.save(p, "WEBP", quality=95, lossless=False)
    print(f"[OK] {p.name} ({p.stat().st_size} bytes)")

if __name__ == "__main__":
    process(sys.argv[1])