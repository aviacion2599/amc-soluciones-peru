import os
import glob
from PIL import Image

def process_image(filepath):
    try:
        img = Image.open(filepath).convert("RGBA")
        
        # Make near-white pixels transparent (to ensure we crop white borders too)
        # We will check if the image has a lot of white pixels or if it's already transparent.
        # It's safer to just look at alpha. If it has a white background, we remove it.
        # But we need to be careful not to remove white parts inside the machine.
        # A safer approach: We just use getbbox() based on alpha, assuming the user provided images that are either already transparent or have a solid white background we can't easily distinguish from machine white.
        # Wait, the user said "y sin fondo osea fondo blanco como esta pero mismo tamaño". 
        # This implies they are okay with a white background, they just want them all the same size and cropped.
        # Actually, let's just make the top-left pixel color transparent if it's white?
        
        # Let's just crop based on the existing alpha channel first.
        # If the image has no transparent pixels (minimum alpha is 255), then we can try to crop white space.
        extrema = img.getextrema()
        has_alpha = extrema[3][0] < 255
        
        if not has_alpha:
            # If no alpha, assume white background
            # We'll make pure white (or near white) on the EDGES transparent by flooding or just cropping based on white
            bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
            diff = Image.new("RGBA", img.size)
            # Find bounding box by comparing with white
            for x in range(img.width):
                for y in range(img.height):
                    r, g, b, a = img.getpixel((x, y))
                    if r > 240 and g > 240 and b > 240:
                        pass # near white
                    else:
                        diff.putpixel((x,y), (0,0,0,255)) # mark non-white
            bbox = diff.getbbox()
            
            # Now make the near-white pixels transparent
            datas = img.getdata()
            newData = []
            for item in datas:
                if item[0] > 240 and item[1] > 240 and item[2] > 240:
                    newData.append((255, 255, 255, 0))
                else:
                    newData.append(item)
            img.putdata(newData)
        else:
            bbox = img.getbbox()
            
        if not bbox:
            print(f"Skipping {filepath} - empty bounding box")
            return
            
        cropped = img.crop(bbox)
        
        CANVAS_SIZE = 800
        MARGIN = 40
        MAX_DIM = CANVAS_SIZE - 2 * MARGIN
        
        width, height = cropped.size
        ratio = min(MAX_DIM / width, MAX_DIM / height)
        new_size = (int(width * ratio), int(height * ratio))
        
        resized = cropped.resize(new_size, Image.Resampling.LANCZOS)
        
        canvas = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (255, 255, 255, 0))
        
        offset_x = (CANVAS_SIZE - new_size[0]) // 2
        offset_y = (CANVAS_SIZE - new_size[1]) // 2
        canvas.paste(resized, (offset_x, offset_y), resized)
        
        canvas.save(filepath, "WEBP")
        print(f"Success: {filepath}")
        
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

files = glob.glob("public/uploads/products/**/*.webp", recursive=True)
for f in files:
    process_image(f)
