import os
import glob
from PIL import Image

def process_tight_crop(file_path):
    try:
        img = Image.open(file_path).convert("RGBA")
        # Get bounding box of non-transparent pixels
        bbox = img.getbbox()
        if not bbox:
            print(f"Skipping {file_path} (Empty or fully transparent)")
            return
        
        # Crop to bounding box
        cropped = img.crop(bbox)
        
        # Target size
        target_size = 600
        padding = 40 # 20px padding on each side
        
        # Calculate scaling factor to fit within target_size - padding
        max_dim = max(cropped.width, cropped.height)
        scale = (target_size - padding) / max_dim
        
        new_width = int(cropped.width * scale)
        new_height = int(cropped.height * scale)
        
        # Resize cropped image
        resized = cropped.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Create new transparent canvas
        new_img = Image.new("RGBA", (target_size, target_size), (255, 255, 255, 0))
        
        # Paste resized image into center
        paste_x = (target_size - new_width) // 2
        paste_y = (target_size - new_height) // 2
        
        new_img.paste(resized, (paste_x, paste_y), resized)
        
        # Save over original
        new_img.save(file_path, "WEBP", quality=90)
        print(f"Processed {file_path}")
    except Exception as e:
        print(f"Error on {file_path}: {e}")

if __name__ == "__main__":
    files = glob.glob("public/uploads/products/*/*.webp")
    for f in files:
        process_tight_crop(f)
    print("Done tight cropping images.")
