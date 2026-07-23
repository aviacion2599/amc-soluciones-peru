import os
import subprocess
from PIL import Image

def run_cmd(cmd):
    print(f"Running: {cmd}")
    subprocess.run(cmd, shell=True, check=True)

def process_single_image(input_path, output_path):
    print(f"Processing {input_path} to {output_path} with rembg...")
    temp_out = input_path + "_nobg.png"
    run_cmd(f'rembg i "{input_path}" "{temp_out}"')
    
    try:
        img = Image.open(temp_out).convert("RGBA")
        bbox = img.getbbox()
        if not bbox:
            print(f"Empty image: {input_path}")
            return
            
        cropped = img.crop(bbox)
        
        target_size = 600
        padding = 40
        available_size = target_size - (padding * 2)
        
        ratio = min(available_size / cropped.width, available_size / cropped.height)
        new_w = int(cropped.width * ratio)
        new_h = int(cropped.height * ratio)
        
        resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        final_img = Image.new("RGBA", (target_size, target_size), (0, 0, 0, 0))
        offset_x = (target_size - new_w) // 2
        offset_y = (target_size - new_h) // 2
        
        final_img.paste(resized, (offset_x, offset_y), resized)
        
        final_img.save(output_path, "WEBP", quality=95)
        print(f"Saved {output_path} successfully.")
        
        if os.path.exists(temp_out):
            os.remove(temp_out)
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    img_path = r"public\uploads\products\amc-9100\img-01.webp"
    # Create a copy as source
    src_path = r"public\uploads\products\amc-9100\img-01_src.webp"
    if os.path.exists(img_path):
        import shutil
        shutil.copy(img_path, src_path)
        process_single_image(src_path, img_path)
        os.remove(src_path)
