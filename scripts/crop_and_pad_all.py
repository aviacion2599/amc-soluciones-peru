import os
from pathlib import Path
from PIL import Image

# Resoluciones
CANVAS_W, CANVAS_H = 800, 800
PADDING = 40  # pixels of padding on all sides
MAX_W, MAX_H = CANVAS_W - 2 * PADDING, CANVAS_H - 2 * PADDING

BASE_DIR = Path(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) / "public"

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

PRODUCT_DIR = BASE_DIR / "uploads" / "products"
PRODUCT_IMAGES = sorted(PRODUCT_DIR.glob("*/img-*.webp"))

ALL_IMAGES = HERO_IMAGES + PRODUCT_IMAGES

def process_image(input_path: Path) -> bool:
    if not input_path.exists():
        return False

    try:
        # Open and convert to RGBA
        img = Image.open(input_path).convert("RGBA")
        
        # Get bounding box of non-transparent pixels
        bbox = img.getbbox()
        if not bbox:
            print(f"  [WARN] Completely transparent: {input_path.name}")
            return False
            
        # Crop to bounding box
        cropped = img.crop(bbox)
        cw, ch = cropped.size
        
        # Calculate scale to fit inside MAX_W x MAX_H
        scale = min(MAX_W / cw, MAX_H / ch)
        new_w, new_h = int(cw * scale), int(ch * scale)
        
        # Resize image
        resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Create new transparent canvas
        canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (255, 255, 255, 0))
        
        # Calculate paste position for centering
        x = (CANVAS_W - new_w) // 2
        y = (CANVAS_H - new_h) // 2
        
        # Paste the resized image onto the center of the canvas
        canvas.paste(resized, (x, y))
        
        # Save overwriting the original file
        canvas.save(input_path, "WEBP", quality=95, lossless=False)
        print(f"  [OK] Processed {input_path.relative_to(BASE_DIR)}")
        
        return True
    except Exception as e:
        print(f"  [ERR] {input_path.name}: {e}")
        return False

def main():
    print(f"Processing {len(ALL_IMAGES)} images...")
    processed = 0
    for img_path in ALL_IMAGES:
        if process_image(img_path):
            processed += 1
            
    print(f"Done! Successfully cropped and padded {processed} images.")

if __name__ == "__main__":
    main()
