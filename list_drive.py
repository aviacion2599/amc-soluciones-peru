import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = 'https://drive.google.com/drive/folders/1anDg48s3VmivgWLtejomIwxBD0dAQeil'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
res = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')

# find file IDs and names
items = re.findall(r'\[\"(.*?)\",\"([a-zA-Z0-9_-]{28,})\"\]', res)
seen = set()
for item in items:
    name, file_id = item
    if file_id not in seen:
        print(f"File: {name} ID: {file_id}")
        seen.add(file_id)
