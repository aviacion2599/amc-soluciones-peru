import glob
from PIL import Image
import numpy as np

images = glob.glob(r"public\uploads\products\*\img-01.webp")
for path in images:
    img = Image.open(path).convert("RGBA")
    arr = np.array(img)
    alpha = arr[:,:,3]
    # Find bounding box of pixels with alpha > 100
    rows = np.any(alpha > 100, axis=1)
    cols = np.any(alpha > 100, axis=0)
    if not np.any(rows):
        print(f"{path} is empty")
        continue
    ymin, ymax = np.where(rows)[0][[0, -1]]
    xmin, xmax = np.where(cols)[0][[0, -1]]
    
    # Calculate current size
    w = xmax - xmin + 1
    h = ymax - ymin + 1
    
    # Compare with total size
    print(f"{path}: Canvas {img.width}x{img.height} | Solid BBox {w}x{h} | Ratio H {h/img.height:.2f}")
