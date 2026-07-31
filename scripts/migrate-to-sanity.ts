import { createClient } from '@sanity/client';
import { STATIC_CATEGORIES, STATIC_BRANDS, STATIC_PRODUCTS } from '../src/lib/static-data';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrate() {
  console.log('Migrando Brands...');
  for (const brand of STATIC_BRANDS) {
    await client.createOrReplace({
      _id: brand.id,
      _type: 'brand',
      name: brand.name,
      slug: { _type: 'slug', current: brand.slug },
      description: brand.description,
      website: brand.website,
    });
    console.log(`Brand: ${brand.name} migrado.`);
  }

  console.log('Migrando Categories...');
  for (const cat of STATIC_CATEGORIES) {
    await client.createOrReplace({
      _id: cat.id,
      _type: 'category',
      name: cat.name,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
    });
    console.log(`Category: ${cat.name} migrada.`);
  }

  console.log('Migrando Products...');
  for (const prod of STATIC_PRODUCTS) {
    
    const brandRef = { _type: 'reference', _ref: 'brand-1' };
    const categoryRef = { _type: 'reference', _ref: STATIC_CATEGORIES.find(c => c.slug === prod.category.slug)?.id };

    const doc = {
      _id: prod.id,
      _type: 'product',
      name: prod.name,
      slug: { _type: 'slug', current: prod.slug },
      summary: prod.summary,
      sku: prod.sku,
      price: prod.price,
      currency: prod.currency,
      isFeatured: prod.isFeatured,
      isNew: prod.isNew,
      isBestSeller: prod.isBestSeller,
      brand: brandRef,
      category: categoryRef,
      features: prod.features?.map(f => f.value),
      specifications: prod.specifications?.map(s => ({
        _key: s.group + s.key,
        group: s.group,
        key: s.key,
        value: s.value
      }))
    };

    await client.createOrReplace(doc);
    console.log(`Product: ${prod.name} migrado.`);
  }

  console.log('Migración a Sanity completada exitosamente.');
}

migrate().catch(console.error);
