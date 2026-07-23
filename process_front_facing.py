import os
import subprocess
import glob
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
    import shutil
    if os.path.exists("temp_gdrive_2"):
        shutil.rmtree("temp_gdrive_2")
    os.makedirs("temp_gdrive_2", exist_ok=True)
    os.chdir("temp_gdrive_2")
    
    try:
        # Download AMC-3200 FOTO folder
        run_cmd('gdown --folder https://drive.google.com/drive/folders/1MnRqrXyl9oYluynnu4DrLSkAmLA_Nytw --no-check-certificate')
    except: pass
    
    try:
        # Download AMC-8100 FOTO folder
        run_cmd('gdown --folder https://drive.google.com/drive/folders/1vwXqayD0EK6CG95-wst5kmA8-vP_Pwek --no-check-certificate')
    except: pass
    
    os.chdir("..")
    
    # Process AMC-3200 
    img_3200 = glob.glob("temp_gdrive_2/**/4a961e91-34ba-410f-8b26-f9d03b696ccb.jpg", recursive=True)
    if img_3200:
        process_single_image(img_3200[0], r"public\uploads\products\amc-3200\img-01.webp")
    else:
        print("AMC-3200 image not found.")
        
    # Process AMC-8100
    img_8100 = glob.glob("temp_gdrive_2/**/c86d547b-9f85-489d-93ee-905c6a80cd5f.jpg", recursive=True)
    if img_8100:
        process_single_image(img_8100[0], r"public\uploads\products\amc-8100\img-01.webp")
    else:
        print("AMC-8100 image not found.")
