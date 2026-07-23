import requests
import re

html = requests.get('https://drive.google.com/drive/folders/1anDg48s3VmivgWLtejomIwxBD0dAQeil', verify=False).text
items = re.findall(r'\[\"([^\"]+?\.jpg)\",\"([a-zA-Z0-9_-]{33})\"\]', html)
for name, fid in items:
    print(f'File: {name} -> ID: {fid}')
