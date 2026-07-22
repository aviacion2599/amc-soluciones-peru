import os
import glob
from PIL import Image
from rembg import remove

def process_image(file_path):
    try:
        # Load image
        with open(file_path, "rb") as f:
            input_data = f.read()
            
        # Remove background using rembg
        output_data = remove(input_data)
        
        # Load the transparent image back into PIL
        import io
        img = Image.open(io.BytesIO(output_data)).convert("RGBA")
        
        # Crop tight to non-transparent pixels
        bbox = img.getbbox()
        if not bbox:
            print(f"Skipping {file_path} (Empty after rembg)")
            return
            
        cropped = img.crop(bbox)
        
        # Set uniform size and padding
        target_size = 600
        padding = 40 # 20px padding on each side
        
        max_dim = max(cropped.width, cropped.height)
        scale = (target_size - padding) / max_dim
        
        new_width = int(cropped.width * scale)
        new_height = int(cropped.height * scale)
        
        # Resize
        resized = cropped.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Create transparent canvas and paste
        new_img = Image.new("RGBA", (target_size, target_size), (255, 255, 255, 0))
        paste_x = (target_size - new_width) // 2
        paste_y = (target_size - new_height) // 2
        
        new_img.paste(resized, (paste_x, paste_y), resized)
        
        # Overwrite original
        new_img.save(file_path, "WEBP", quality=90)
        print(f"Processed {file_path} successfully")
    except Exception as e:
        print(f"Error on {file_path}: {e}")

if __name__ == "__main__":
    files = glob.glob("public/uploads/products/*/*.webp")
    for f in files:
        process_image(f)
    print("Done processing with rembg.")
