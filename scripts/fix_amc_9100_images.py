#!/usr/bin/env python3
"""
Fix issue 1: las imágenes del producto AMC-9100 no aparecen porque el directorio
public/uploads/products/amc-9100/ nunca fue creado.

Este script:
1. Crea el directorio public/uploads/products/amc-9100/
2. Copia/normaliza la imagen fuente amc-9100.webp del directorio /public/ raíz
   (que ya está normalizada a 750x1000) a img-01.webp dentro del directorio
   del producto.
3. Genera img-02.webp como variante espejo horizontal (vista "lateral") para
   que el carrusel del producto tenga al menos 2 imágenes como declara
   static-data.ts.

Dimensiones de salida: 800x1067 para coincidir con los demás productos.
"""

import os
from PIL import Image, ImageOps

# Rutas
SRC = "/home/z/my-project/public/amc-9100.webp"
DST_DIR = "/home/z/my-project/public/uploads/products/amc-9100"

# Dimensiones estándar usadas por todos los demás productos
TARGET_W = 800
TARGET_H = 1067


def normalize_image(src_path: str, dst_path: str, mirror: bool = False) -> None:
    """Carga la imagen, la normaliza a TARGET_W x TARGET_H centrada, y la guarda."""
    img = Image.open(src_path).convert("RGBA")

    if mirror:
        img = ImageOps.mirror(img)

    # Recortar bordes transparentes (tight crop)
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    # Escalar (contain) al tamaño objetivo
    img.thumbnail((TARGET_W, TARGET_H), Image.LANCZOS)
    scaled_w, scaled_h = img.size

    # Crear canvas final centrado
    canvas = Image.new("RGBA", (TARGET_W, TARGET_H), (255, 255, 255, 255))
    x = (TARGET_W - scaled_w) // 2
    y = (TARGET_H - scaled_h) // 2
    canvas.paste(img, (x, y), img)

    canvas.save(dst_path, "WEBP", quality=92, method=6)
    print(f"  ✓ {os.path.basename(dst_path)}: {TARGET_W}x{TARGET_H} ({os.path.getsize(dst_path)/1024:.1f} KB)")


def main():
    print(f"Creando directorio: {DST_DIR}")
    os.makedirs(DST_DIR, exist_ok=True)

    print(f"\nGenerando imágenes para AMC-9100 desde {SRC}:")
    normalize_image(SRC, os.path.join(DST_DIR, "img-01.webp"), mirror=False)
    normalize_image(SRC, os.path.join(DST_DIR, "img-02.webp"), mirror=True)

    print(f"\nHecho. Lista final de archivos:")
    for f in sorted(os.listdir(DST_DIR)):
        full = os.path.join(DST_DIR, f)
        print(f"  {f}  ({os.path.getsize(full)/1024:.1f} KB)")


if __name__ == "__main__":
    main()
