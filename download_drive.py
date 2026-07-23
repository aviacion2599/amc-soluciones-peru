import requests
import re
import os

url = "https://drive.google.com/drive/folders/1anDg48s3VmivgWLtejomIwxBD0dAQeil"
print("Fetching folder HTML...")
try:
    res = requests.get(url, verify=False)
    html = res.text
    # Google Drive folder pages usually contain IDs in the format of 33 alphanumeric chars
    # We will search for common file IDs
    ids = re.findall(r'"([a-zA-Z0-9_-]{33})"', html)
    # Filter unique IDs
    unique_ids = list(set(ids))
    print(f"Found {len(unique_ids)} potential IDs.")
    
    os.makedirs('temp_gdrive_3', exist_ok=True)
    
    for fid in unique_ids:
        print(f"Trying to download {fid}...")
        dl_url = f"https://drive.google.com/uc?export=download&id={fid}"
        dl_res = requests.get(dl_url, verify=False)
        if dl_res.status_code == 200 and len(dl_res.content) > 10000: # at least 10kb
            with open(f"temp_gdrive_3/{fid}.jpg", "wb") as f:
                f.write(dl_res.content)
            print(f"Saved {fid}.jpg ({len(dl_res.content)} bytes)")
        else:
            print(f"Failed or too small for {fid}")
except Exception as e:
    print("Error:", e)
