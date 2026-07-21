#!/usr/bin/env python3
"""
Verify all brochure (PDF) and video (MP4) files referenced in static-data.ts
against what actually exists on disk in public/uploads/products/*/
"""
import re
import os

ROOT = "/home/z/my-project"

with open(f"{ROOT}/src/lib/static-data.ts") as f:
    content = f.read()

# Match all /uploads/products/.../*.ext references
pattern = re.compile(r"/uploads/products/([^/\"]+)/([^\s\"]+\.\w+)")
matches = pattern.findall(content)
unique = sorted(set(matches))

# Files per product (PDFs and MP4s only)
products = {}
for slug, fname in unique:
    if not fname.endswith((".pdf", ".mp4")):
        continue
    products.setdefault(slug, []).append(fname)

print("=" * 80)
print("PDF and MP4 references in static-data.ts")
print("=" * 80)
for slug in sorted(products):
    files = sorted(products[slug])
    print(f"\n[{slug}]")
    for fname in files:
        path = f"{ROOT}/public/uploads/products/{slug}/{fname}"
        if os.path.exists(path):
            size = os.path.getsize(path)
            print(f"  ✓ {fname:<40} ({size/1024:.1f} KB)")
        else:
            print(f"  ✗ {fname:<40} MISSING")

# Existing PDFs/MP4s on disk that are NOT referenced
print("\n" + "=" * 80)
print("Existing PDFs/MP4s on disk")
print("=" * 80)
for slug_dir in sorted(os.listdir(f"{ROOT}/public/uploads/products")):
    full_dir = f"{ROOT}/public/uploads/products/{slug_dir}"
    if not os.path.isdir(full_dir):
        continue
    files = [f for f in sorted(os.listdir(full_dir)) if f.endswith((".pdf", ".mp4"))]
    if files:
        print(f"\n[{slug_dir}]")
        for f in files:
            path = f"{full_dir}/{f}"
            size = os.path.getsize(path)
            print(f"  - {f:<40} ({size/1024:.1f} KB)")
