import glob
import os
import math
from PIL import Image
import numpy as np

def normalize_by_area():
    target_size = 600
    target_area = 135000  # Total solid pixels
    
    # Absolute bounds so it doesn't clip in the 600x600 canvas
    max_dim = 540 
    
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
            
            aspect = cropped.width / cropped.height
            
            # Calculate desired dimensions based on area
            new_h = math.sqrt(target_area / aspect)
            new_w = new_h * aspect
            
            # Clamp if it exceeds bounds
            if new_h > max_dim:
                new_h = max_dim
                new_w = new_h * aspect
            if new_w > max_dim:
                new_w = max_dim
                new_h = new_w / aspect
                
            new_w = int(new_w)
            new_h = int(new_h)
            
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
    normalize_by_area()
