#!/usr/bin/env python3
"""
Map brochure.pdf and video-01.mp4 references in static-data.ts
to the actual filenames that exist on disk.

Decision matrix per product:
- If PDF/MP4 file exists on disk with descriptive name → update URL in static-data.ts
- If no PDF/MP4 exists at all → REMOVE the entry from the documents/videos array
  so the Documents/Videos tab is hidden instead of broken.
- Rename UUID-named MP4 files to canonical video-01.mp4 / video-02.mp4.
"""
import os
import re
from pathlib import Path

ROOT = Path("/home/z/my-project")
UPLOADS = ROOT / "public/uploads/products"
SRC = ROOT / "src/lib/static-data.ts"

# Map of slug -> {expected canonical, actual filename on disk}
# Discover what's on disk for each product slug
disk_files = {}
for slug_dir in UPLOADS.iterdir():
    if not slug_dir.is_dir():
        continue
    pdfs = sorted([f.name for f in slug_dir.iterdir() if f.suffix == ".pdf"])
    mp4s = sorted([f.name for f in slug_dir.iterdir() if f.suffix == ".mp4"])
    disk_files[slug_dir.name] = {"pdfs": pdfs, "mp4s": mp4s}

print("=" * 80)
print("Disk inventory (PDFs and MP4s)")
print("=" * 80)
for slug, files in disk_files.items():
    print(f"\n[{slug}]")
    print(f"  PDFs: {files['pdfs']}")
    print(f"  MP4s: {files['mp4s']}")

# Step 1: Rename UUID-named MP4 files to canonical video-01.mp4 / video-02.mp4
print("\n" + "=" * 80)
print("Renaming MP4 files with UUID names to canonical video-NN.mp4")
print("=" * 80)

UUID_RE = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.mp4$", re.I)

for slug, files in disk_files.items():
    uuid_mp4s = [f for f in files["mp4s"] if UUID_RE.match(f)]
    canonical_mp4s = [f for f in files["mp4s"] if not UUID_RE.match(f)]

    if not uuid_mp4s:
        continue

    # Determine the starting index for new canonical names
    # If video-01.mp4 already exists, start at 2
    existing_nums = []
    for f in canonical_mp4s:
        m = re.match(r"video-(\d+)\.mp4", f)
        if m:
            existing_nums.append(int(m.group(1)))

    next_idx = max(existing_nums) + 1 if existing_nums else 1

    for uuid_name in uuid_mp4s:
        new_name = f"video-{next_idx:02d}.mp4"
        old_path = UPLOADS / slug / uuid_name
        new_path = UPLOADS / slug / new_name
        if new_path.exists():
            print(f"  ! {slug}/{new_name} already exists, skipping rename of {uuid_name}")
            continue
        old_path.rename(new_path)
        print(f"  ✓ {slug}/{uuid_name} -> {new_name}")
        next_idx += 1

# Re-inventory after renaming
disk_files = {}
for slug_dir in UPLOADS.iterdir():
    if not slug_dir.is_dir():
        continue
    pdfs = sorted([f.name for f in slug_dir.iterdir() if f.suffix == ".pdf"])
    mp4s = sorted([f.name for f in slug_dir.iterdir() if f.suffix == ".mp4"])
    disk_files[slug_dir.name] = {"pdfs": pdfs, "mp4s": mp4s}

print("\n" + "=" * 80)
print("Final disk inventory after renaming")
print("=" * 80)
for slug, files in disk_files.items():
    print(f"[{slug}] PDFs={files['pdfs']} MP4s={files['mp4s']}")

# Step 2: Build the URL mapping that static-data.ts SHOULD use
# If a product has no PDF, we'll mark documents: [].
# If a product has no MP4, we'll mark videos: [].
print("\n" + "=" * 80)
print("Mapping products to existing files")
print("=" * 80)

product_files = {}
for slug, files in disk_files.items():
    pdf = files["pdfs"][0] if files["pdfs"] else None  # use first PDF if multiple
    mp4s = files["mp4s"]
    product_files[slug] = {"pdf": pdf, "mp4s": mp4s}
    print(f"[{slug}] brochure={pdf} videos={mp4s}")

# Step 3: Read static-data.ts and rebuild the documents[] and videos[] arrays
print("\n" + "=" * 80)
print("Updating src/lib/static-data.ts")
print("=" * 80)

src_text = SRC.read_text()

# Match each product object — find "slug: '...'" + the next "documents:" + "videos:" arrays
# Strategy: iterate over each product entry (slug -> end of product object)
# For each slug, rewrite its documents: [...] and videos: [...] arrays to match disk reality.

# Find each product block by its slug
PRODUCT_RE = re.compile(
    r'(slug:\s*"([^"]+)".*?)(documents:\s*\[)([^\]]*?)(\],.*?)(videos:\s*\[)([^\]]*?)(\])',
    re.DOTALL,
)

# But order of documents/videos arrays may vary. Let's match each individually.
# We'll do this: find every `slug: "X"` and then in the next ~3000 chars,
# rewrite `documents: [...]:` and `videos: [...]`.

# Simpler: regex for documents: [ ... ] and videos: [ ... ] blocks per slug.

def rewrite_for_slug(text: str, slug: str, files: dict) -> str:
    """Find the slug's block and rewrite its documents/videos arrays."""
    # Find the slug
    slug_pattern = re.compile(
        r'(slug:\s*"' + re.escape(slug) + r'".*?)(?=\n  \},|\n\];)',
        re.DOTALL,
    )
    m = slug_pattern.search(text)
    if not m:
        print(f"  ! slug '{slug}' not found in static-data.ts")
        return text

    block = m.group(1)
    new_block = block

    # --- Build new documents array ---
    pdf = files["pdf"]
    if pdf:
        # Determine a nice title from the slug
        nice_name = slug.upper().replace("-", " ").replace(" PRO", " PRO")
        new_docs = f'\n      {{ id: "doc-{slug}", url: "/uploads/products/{slug}/{pdf}", type: "ficha", title: "Brochure {nice_name}", size: null }},\n    '
    else:
        new_docs = ""

    # Replace existing documents: [ ... ] block
    docs_re = re.compile(r'documents:\s*\[([^\]]*?)\]', re.DOTALL)
    new_block = docs_re.sub(f'documents: [{new_docs}]', new_block, count=1)

    # --- Build new videos array ---
    mp4s = files["mp4s"]
    if mp4s:
        nice_name = slug.upper().replace("-", " ").replace(" PRO", " PRO")
        vid_entries = []
        for i, mp4 in enumerate(mp4s, start=1):
            vid_id = f"vid-{slug}-{i}"
            vid_entries.append(
                f'\n      {{ id: "{vid_id}", url: "/uploads/products/{slug}/{mp4}", provider: "local", title: "{nice_name} — video {i}" }},'
            )
        new_vids = "".join(vid_entries) + "\n    "
    else:
        new_vids = ""

    vids_re = re.compile(r'videos:\s*\[([^\]]*?)\]', re.DOTALL)
    new_block = vids_re.sub(f'videos: [{new_vids}]', new_block, count=1)

    return text[:m.start()] + new_block + text[m.end():]


new_src = src_text
for slug, files in product_files.items():
    new_src = rewrite_for_slug(new_src, slug, files)

SRC.write_text(new_src)
print(f"\n✓ Updated {SRC}")

# Step 4: Show a summary diff of what changed
print("\n" + "=" * 80)
print("Summary")
print("=" * 80)
print("URLs in static-data.ts have been rewritten to match disk reality.")
print("Products without PDFs or MP4s now have empty arrays (tab hidden in UI).")
