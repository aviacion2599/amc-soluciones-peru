#!/usr/bin/env python3
"""Process all Drive assets: convert to WebP, organize into public/"""
import os, shutil, subprocess
from pathlib import Path
from PIL import Image

DRIVE = Path("/home/z/my-project/drive-assets/AMC SOLUCIONES PERU")
PUBLIC = Path("/home/z/my-project/public")
UPLOADS = PUBLIC / "uploads" / "products"

def convert_to_webp(src: Path, dest: Path, quality=85, max_width=1200):
    """Convert image to WebP, optionally resize"""
    img = Image.open(src)
    # Handle RGBA (PNG with alpha)
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGBA')
        bg = Image.new('RGBA', img.size, (255, 255, 255, 255))
        bg.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
        img = bg.convert('RGB')
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize if wider than max_width
    if max_width and img.width > max_width:
        ratio = max_width / img.width
        new_h = int(img.height * ratio)
        img = img.resize((max_width, new_h), Image.LANCZOS)
    
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, 'WEBP', quality=quality)
    print(f"  {src.name} -> {dest.name} ({img.size[0]}x{img.size[1]})")
    return True

def process_model(model_dir: str, slug: str, is_new=False):
    """Process a model's images, videos, and brochures"""
    src_dir = DRIVE / model_dir
    if not src_dir.exists():
        print(f"  SKIP {model_dir} - not found")
        return
    
    dest_dir = UPLOADS / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    # Clear existing images (keep videos and PDFs if they exist)
    for f in dest_dir.glob("*.webp"):
        f.unlink()
    
    img_count = 0
    # Process images
    for img_file in sorted(src_dir.glob("*.jpg")) + sorted(src_dir.glob("*.JPG")) + sorted(src_dir.glob("*.png")) + sorted(src_dir.glob("*.PNG")):
        webp_name = f"img-{img_count+1:02d}.webp"
        convert_to_webp(img_file, dest_dir / webp_name)
        img_count += 1
    
    # Copy videos (convert .mov to .mp4 if needed)
    for vid_file in sorted(src_dir.glob("*.mp4")) + sorted(src_dir.glob("*.mov")):
        if vid_file.suffix == '.mov':
            # Convert mov to mp4
            mp4_name = "video-01.mp4"
            dest_vid = dest_dir / mp4_name
            if not dest_vid.exists():
                subprocess.run([
                    'ffmpeg', '-y', '-i', str(vid_file),
                    '-c:v', 'libx264', '-preset', 'fast', '-crf', '23',
                    '-c:a', 'aac', '-b:a', '128k',
                    str(dest_vid)
                ], capture_output=True, timeout=120)
                print(f"  {vid_file.name} -> {mp4_name}")
        else:
            mp4_name = f"video-{len(list(dest_dir.glob('video-*.mp4')))+1:02d}.mp4"
            shutil.copy2(vid_file, dest_dir / mp4_name)
            print(f"  {vid_file.name} -> {mp4_name}")
    
    # Copy brochures
    for pdf_file in sorted(src_dir.glob("*.pdf")):
        pdf_name = f"brochure{pdf_file.suffix}"
        shutil.copy2(pdf_file, dest_dir / pdf_name)
        print(f"  {pdf_file.name} -> {pdf_name}")
    
    # For CM3400, only keep 1 video
    if slug == "amc-cm3400":
        videos = sorted(dest_dir.glob("video-*.mp4"))
        if len(videos) > 1:
            for v in videos[1:]:
                v.unlink()
                print(f"  REMOVED extra video: {v.name}")
        # Rename first to video-01.mp4
        videos = sorted(dest_dir.glob("video-*.mp4"))
        if videos and videos[0].name != "video-01.mp4":
            videos[0].rename(dest_dir / "video-01.mp4")
    
    print(f"  {slug}: {img_count} images, {len(list(dest_dir.glob('video-*.mp4')))} videos, {len(list(dest_dir.glob('brochure*')))} brochures")

# Process all models
print("=== PROCESSING PRODUCT ASSETS ===")
process_model("AMC-2000 _ linea esencial", "amc-2000")
process_model("AMC-3200", "amc-3200")
process_model("AMC-8100", "amc-8100")
process_model("AMC-8200", "amc-8200")
process_model("AMC-8300PRO", "amc-8300pro")
process_model("AMC-9200", "amc-9200")
process_model("AMC-CM3400", "amc-cm3400")
process_model("AMC-CM3400 Max", "amc-cm3400-max")
process_model("AMC-8100/AMC-9100", "amc-9100", is_new=True)

# Process hero carousel images from "Imagen de portada AMC"
print("\n=== PROCESSING HERO CAROUSEL IMAGES ===")
carousel_map = {
    "1PYeWdflYsuhQvMxCYfuevqBDkJ3oFpmn": "amc-3200",
    "1cXHBYVIzohIzeJk9tFhUIYJ05urCsLsE": "amc-8300-pro", 
    "1if3oiFJzmrk3MHDMFIAwdDJZKYMknOxQ": "amc-9100",
    "1Hn-dNBv85E5wHjjWzwN0yXT2PNs0LV4a": "amc-9200",
    "1p1JAslhJ4LBVtDEBfgpSL9acYhxfUOvi": "amc-cm3400",
    "1jMKCJv3lTqNe7C5qYacbswqOGRIGaWIl": "amc-cm3400max",
}
tmp_port = Path("/tmp")
for fid, name in carousel_map.items():
    src = tmp_port / f"port_{fid}"
    if src.exists():
        # For carousel, make all images same size (800x800 centered/cropped)
        img = Image.open(src)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Create square crop centered
        min_dim = min(img.size)
        left = (img.width - min_dim) // 2
        top = (img.height - min_dim) // 2
        img = img.crop((left, top, left + min_dim, top + min_dim))
        
        # Resize to 800x800
        img = img.resize((800, 800), Image.LANCZOS)
        
        dest = PUBLIC / f"{name}.webp"
        img.save(dest, 'WEBP', quality=90)
        print(f"  {name}.webp ({img.size[0]}x{img.size[1]})")

# Also create AMC-2000 hero image from its FOTO PRINCIPAL
src_2000 = DRIVE / "AMC-2000 _ linea esencial" / "FOTO PRINCIPAL.jpg"
if src_2000.exists():
    img = Image.open(src_2000)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    min_dim = min(img.size)
    left = (img.width - min_dim) // 2
    top = (img.height - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))
    img = img.resize((800, 800), Image.LANCZOS)
    (PUBLIC / "amc-2000.webp").unlink(missing_ok=True)
    img.save(PUBLIC / "amc-2000.webp", 'WEBP', quality=90)
    print(f"  amc-2000.webp (800x800)")

# Also create amc-8100.webp from its first product image (use existing or from drive)
src_8100 = DRIVE / "AMC-8100" / "1b4762b9-e52c-471d-91ca-7d8cbc2ecc47.jpg"
if src_8100.exists():
    img = Image.open(src_8100)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    min_dim = min(img.size)
    left = (img.width - min_dim) // 2
    top = (img.height - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))
    img = img.resize((800, 800), Image.LANCZOS)
    (PUBLIC / "amc-8100.webp").unlink(missing_ok=True)
    img.save(PUBLIC / "amc-8100.webp", 'WEBP', quality=90)
    print(f"  amc-8100.webp (800x800)")

# Also create amc-8200.webp hero image
src_8200 = DRIVE / "AMC-8200" / "6d323296-d20a-4d08-9db3-a507210f7246.jpg"
if src_8200.exists():
    img = Image.open(src_8200)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    min_dim = min(img.size)
    left = (img.width - min_dim) // 2
    top = (img.height - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))
    img = img.resize((800, 800), Image.LANCZOS)
    (PUBLIC / "amc-8200.webp").unlink(missing_ok=True)
    img.save(PUBLIC / "amc-8200.webp", 'WEBP', quality=90)
    print(f"  amc-8200.webp (800x800)")

# Process hero page images
print("\n=== PROCESSING PAGE HERO IMAGES ===")
# Servicio tecnico
shutil.copy2("/tmp/port_1tkNH4lzHzMcEfKM_UZWb3Yt5_vBeJ9zo", PUBLIC / "servicio-tecnico-hero-desktop.webp")
shutil.copy2("/tmp/port_17fOJetcemKSWFCcvIgwfrL_c_4TnrJ1f", PUBLIC / "servicio-tecnico-hero-mobile.webp")
print("  servicio-tecnico heroes updated")

# Nosotros
shutil.copy2("/tmp/port_1rnFjJWwiNm5mouhaHXNwGMorgrXTxQcx", PUBLIC / "nosotros-hero-desktop.webp")
shutil.copy2("/tmp/port_1FI4CaP9ZNIit0hy1PdGfDK7dNCXYX_fP", PUBLIC / "nosotros-hero-mobile.webp")
print("  nosotros heroes updated")

print("\n=== DONE ===")