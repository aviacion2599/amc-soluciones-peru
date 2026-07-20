#!/usr/bin/env python3
from PIL import Image
from pathlib import Path
import shutil, os

DRIVE = Path('/home/z/my-project/drive-assets/AMC SOLUCIONES PERU')
PUBLIC = Path('/home/z/my-project/public')
UPLOADS = PUBLIC / 'uploads' / 'products'

def to_webp(src, dest, quality=85, max_w=1200):
    img = Image.open(src)
    if img.mode in ('RGBA','LA','P'):
        img = img.convert('RGBA')
        bg = Image.new('RGBA', img.size, (255,255,255,255))
        bg.paste(img, mask=img.split()[3] if img.mode=='RGBA' else None)
        img = bg.convert('RGB')
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    if max_w and img.width > max_w:
        r = max_w / img.width
        img = img.resize((max_w, int(img.height * r)), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, 'WEBP', quality=quality)
    return img.size

models = [
    ('AMC-2000 _ linea esencial', 'amc-2000'),
    ('AMC-3200', 'amc-3200'),
    ('AMC-8100', 'amc-8100'),
    ('AMC-8200', 'amc-8200'),
    ('AMC-8300PRO', 'amc-8300pro'),
    ('AMC-9200', 'amc-9200'),
    ('AMC-CM3400', 'amc-cm3400'),
    ('AMC-CM3400 Max', 'amc-cm3400-max'),
    ('AMC-8100/AMC-9100', 'amc-9100'),
]

for modeldir, slug in models:
    src_dir = DRIVE / modeldir.replace('/', os.sep)
    if not src_dir.exists():
        print(f'SKIP {modeldir}')
        continue
    dest_dir = UPLOADS / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    # Clear old webp images
    for f in list(dest_dir.glob('*.webp')):
        f.unlink()
    # Convert images
    n = 0
    for img in sorted(src_dir.glob('*.jpg')) + sorted(src_dir.glob('*.JPG')) + sorted(src_dir.glob('*.png')) + sorted(src_dir.glob('*.PNG')):
        n += 1
        s = to_webp(img, dest_dir / f'img-{n:02d}.webp')
        print(f'  {slug} img-{n:02d} {s[0]}x{s[1]}')
    # Copy brochures
    for pdf in sorted(src_dir.glob('*.pdf')):
        shutil.copy2(pdf, dest_dir / 'brochure.pdf')
        print(f'  {slug} brochure.pdf')

print('\n=== PRODUCT IMAGES DONE ===')