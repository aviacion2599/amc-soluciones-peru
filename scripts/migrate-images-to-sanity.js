process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Load environment variables manually via --env-file
// require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Since we can't easily import STATIC_PRODUCTS (TypeScript / Next.js aliases),
// we will fetch the products directly from Sanity and then match with local folders
// Or better: read the JSON we can extract, or just read `public/uploads/products/` folders!
// Actually, it's safer to read the TS file? No, running TS scripts with `ts-node` might fail due to paths.
// Let's just create a quick extraction script.

async function main() {
  console.log('Fetching products from Sanity...');
  const products = await client.fetch(`*[_type == "product"]{ _id, "slug": slug.current, name }`);
  
  for (const product of products) {
    console.log(`\nProcessing ${product.name} (${product.slug})...`);
    
    // Check if folder exists
    const productFolder = path.join(process.cwd(), 'public', 'uploads', 'products', product.slug);
    if (!fs.existsSync(productFolder)) {
      console.log(`No images folder found at ${productFolder}`);
      continue;
    }

    const files = fs.readdirSync(productFolder);
    const imageFiles = files.filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg'));
    
    if (imageFiles.length === 0) {
      console.log(`No images found in ${productFolder}`);
      continue;
    }

    const sanityImages = [];
    
    // Sort files to make sure hero is first (isPrimary)
    imageFiles.sort((a, b) => {
      if (a.includes('hero')) return -1;
      if (b.includes('hero')) return 1;
      return a.localeCompare(b);
    });

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const filePath = path.join(productFolder, file);
      console.log(`Uploading ${file}...`);
      
      try {
        const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
          filename: file,
        });
        
        sanityImages.push({
          _key: `img-${Date.now()}-${i}`,
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
          alt: `${product.name} - Vista ${i + 1}`,
          isPrimary: i === 0,
        });
        console.log(` Uploaded successfully!`);
      } catch (err) {
        console.error(` Error uploading ${file}:`, err.message);
      }
    }

    if (sanityImages.length > 0) {
      console.log(`Updating document ${product._id} with ${sanityImages.length} images...`);
      await client
        .patch(product._id)
        .set({ images: sanityImages })
        .commit();
      console.log(`Document updated!`);
    }
  }
  console.log('\nMigration of images complete!');
}

main().catch(console.error);
