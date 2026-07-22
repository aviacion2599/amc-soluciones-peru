import sys
from PIL import Image

def analyze(filepath):
    img = Image.open(filepath).convert("RGBA")
    print(f"Original size: {img.size}")
    bbox = img.getbbox()
    print(f"Bounding box: {bbox}")
    
    # check if there are transparent pixels
    extrema = img.getextrema()
    print(f"Extrema (R,G,B,A): {extrema}")

analyze("public/uploads/products/amc-cm3400/img-01.webp")
