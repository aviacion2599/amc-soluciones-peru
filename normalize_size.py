import glob
import os
from PIL import Image
import numpy as np

def normalize_images():
    target_size = 600
    target_h = 420
    max_w = 520
    
    images = glob.glob(r"public\uploads\products\*\img-01.webp")
    for img_path in images:
        try:
            img = Image.open(img_path).convert("RGBA")
            arr = np.array(img)
            alpha = arr[:,:,3]
            
            # Find solid bounding box (alpha > 50)
            rows = np.any(alpha > 50, axis=1)
            cols = np.any(alpha > 50, axis=0)
            if not np.any(rows):
                print(f"Skipping empty image: {img_path}")
                continue
                
            ymin, ymax = np.where(rows)[0][[0, -1]]
            xmin, xmax = np.where(cols)[0][[0, -1]]
            
            # Crop to solid bounding box
            cropped = img.crop((xmin, ymin, xmax + 1, ymax + 1))
            
            ratio_h = target_h / cropped.height
            ratio_w = max_w / cropped.width
            
            ratio = min(ratio_h, ratio_w)
            
            new_w = int(cropped.width * ratio)
            new_h = int(cropped.height * ratio)
            
            resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
            final_img = Image.new("RGBA", (target_size, target_size), (0, 0, 0, 0))
            offset_x = (target_size - new_w) // 2
            offset_y = (target_size - new_h) // 2
            
            final_img.paste(resized, (offset_x, offset_y), resized)
            final_img.save(img_path, "WEBP", quality=95)
            print(f"Normalized {img_path} (new size: {new_w}x{new_h})")
        except Exception as e:
            print(f"Error on {img_path}: {e}")

if __name__ == "__main__":
    normalize_images()
