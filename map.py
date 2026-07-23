import requests
import re

html = requests.get('https://drive.google.com/drive/folders/1anDg48s3VmivgWLtejomIwxBD0dAQeil', verify=False).text

matches2 = re.finditer(r'\"([a-zA-Z0-9_.-]+\.jpg)\".*?\"([a-zA-Z0-9_-]{33})\"', html)
seen = set()
for m in matches2:
    if m.group(1) not in seen:
        print(f'{m.group(1)} -> {m.group(2)}')
        seen.add(m.group(1))
