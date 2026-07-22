import sys
from pathlib import Path
from PIL import Image

def remove_white(input_path: str):
    p = Path(input_path)
    if not p.exists():
        print(f"[SKIP] Not found: {p}")
        return
    
    img = Image.open(p).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # threshold for white
    for item in datas:
        # if white or very near white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(p, "WEBP", quality=95, lossless=False)
    print(f"[OK] Removed white bg from {p.name}")

if __name__ == "__main__":
    for arg in sys.argv[1:]:
        remove_white(arg)
