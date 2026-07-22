import cv2
import numpy as np
import glob
from PIL import Image

def process_image(file_path):
    try:
        # Read image with opencv
        img = cv2.imread(file_path, cv2.IMREAD_UNCHANGED)
        if img is None:
            return
            
        # If it has 3 channels, add alpha
        if img.shape[2] == 3:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
            
        h, w = img.shape[:2]
        
        # We will floodfill from the 4 corners to find the background
        # Create a mask for floodFill (needs to be h+2, w+2)
        mask = np.zeros((h+2, w+2), np.uint8)
        
        # We assume background is very close to black (or whatever color is at the corners)
        # Tolerance: 15 for RGB differences
        lo_diff = (15, 15, 15, 15)
        up_diff = (15, 15, 15, 15)
        
        # Floodfill from corners with a dummy color (e.g., pure green)
        fill_color = (0, 255, 0, 255)
        
        corners = [(0,0), (0, h-1), (w-1, 0), (w-1, h-1)]
        for pt in corners:
            cv2.floodFill(img, mask, pt, fill_color, lo_diff, up_diff, flags=4 | (255 << 8))
            
        # Now, everywhere mask is 255 (the flooded area), set alpha to 0
        # Wait, the mask returned by floodfill has 1s (or the value passed in flags) where filled.
        # We used 255 in flags.
        mask_roi = mask[1:h+1, 1:w+1]
        
        # Set alpha channel to 0 where mask_roi is 255
        img[mask_roi == 255, 3] = 0
        
        # Convert to PIL to do the bounding box and resize
        # Convert BGR to RGB
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGRA2RGBA)
        pil_img = Image.fromarray(img_rgb)
        
        bbox = pil_img.getbbox()
        if not bbox:
            print(f"Skipping {file_path} (Empty)")
            return
            
        cropped = pil_img.crop(bbox)
        
        target_size = 600
        padding = 40
        
        max_dim = max(cropped.width, cropped.height)
        scale = (target_size - padding) / max_dim
        
        new_width = int(cropped.width * scale)
        new_height = int(cropped.height * scale)
        
        resized = cropped.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        new_img = Image.new("RGBA", (target_size, target_size), (255, 255, 255, 0))
        paste_x = (target_size - new_width) // 2
        paste_y = (target_size - new_height) // 2
        
        new_img.paste(resized, (paste_x, paste_y), resized)
        
        new_img.save(file_path, "WEBP", quality=90)
        print(f"Processed {file_path}")
    except Exception as e:
        print(f"Error on {file_path}: {e}")

if __name__ == "__main__":
    files = glob.glob("public/uploads/products/*/*.webp")
    for f in files:
        process_image(f)
    print("Done OpenCV processing.")
