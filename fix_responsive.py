import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Replace lg:py-24 with lg:py-16 2xl:py-24
    content = content.replace('lg:py-24', 'lg:py-16 2xl:py-24')
    
    # 2. HeroPremium specific tweaks
    if 'HeroPremium.tsx' in filepath:
        # Reduce text size on xl (1366px)
        content = content.replace('xl:text-[3.4rem]', 'xl:text-[2.75rem] 2xl:text-[3.4rem]')
        # Reduce min height and padding
        content = content.replace('lg:pt-[84px] pb-10 sm:pb-12 lg:pb-16 min-h-[100svh] lg:min-h-[85vh]', 'lg:pt-[80px] pb-10 sm:pb-12 lg:pb-12 min-h-[100svh] lg:min-h-[580px] 2xl:min-h-[85vh]')
        # Reduce image container height
        content = content.replace('lg:h-[450px]', 'lg:h-[380px] 2xl:h-[450px]')
        # Reduce max-width on xl
        content = content.replace('xl:max-w-[600px]', 'xl:max-w-[500px] 2xl:max-w-[600px]')

    # 3. ProductCarousel tweaks
    if 'ProductCarousel.tsx' in filepath:
        content = content.replace('lg:py-16', 'lg:py-12 2xl:py-16')
        
    # 4. Nosotros page hero
    if 'nosotros\\page.tsx' in filepath or 'nosotros/page.tsx' in filepath:
        content = content.replace('lg:pt-[84px] pb-[80px] sm:pb-0', 'lg:pt-[80px] pb-[80px] sm:pb-0 lg:min-h-[580px] 2xl:min-h-[100svh]')
        
    if original != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

if __name__ == "__main__":
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.tsx'):
                process_file(os.path.join(root, file))
    print("Done adjusting responsiveness.")
