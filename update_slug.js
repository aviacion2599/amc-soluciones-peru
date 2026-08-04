const fs = require('fs');

const path = 'c:/dev/CLIENTES/21 CLIENTE - AMC SOLUCIONES PERU/src/app/api/products/[slug]/route.ts';
let code = fs.readFileSync(path, 'utf8');

// The new related mapping logic
const helperCode = `
function getRelatedProducts(slug, staticProduct) {
  const RELATED_MAP = {
    "amc-2000": ["amc-3200", "amc-8100"],
    "amc-3200": ["amc-2000", "amc-8100"],
    "amc-8100": ["amc-3200", "amc-2000"],
    "amc-8200": ["amc-9100", "amc-9200"],
    "amc-9100": ["amc-8200", "amc-9200"],
    "amc-9200": ["amc-9100", "amc-8200"],
  };
  
  if (RELATED_MAP[slug]) {
     return RELATED_MAP[slug].map(rs => STATIC_PRODUCTS.find(p => p.slug === rs)).filter(Boolean);
  }
  
  if (staticProduct && staticProduct.category) {
     return STATIC_PRODUCTS.filter(
        (p) => p.category.slug === staticProduct.category.slug && p.slug !== slug,
     ).slice(0, 4);
  }
  
  return [];
}
`;

// Insert the helper after the imports
code = code.replace(/export const dynamic = 'force-dynamic';/, helperCode + '\nexport const dynamic = \'force-dynamic\';');

// Replace the related assignment in the !product fallback
code = code.replace(/related: STATIC_PRODUCTS.filter\([\s\S]*?\.slice\(0, 4\),/g, 'related: getRelatedProducts(slug, staticProduct),');

// Replace the related assignment at the end of the try block
code = code.replace(/const RELATED_MAP[\s\S]*?return NextResponse.json\({ data: product, related: finalRelated }\);/m, 'return NextResponse.json({ data: product, related: getRelatedProducts(slug, staticProduct) });');

// Replace the related assignment in the catch block fallback
code = code.replace(/related: STATIC_PRODUCTS.filter\(\(p\) => p.category.slug === staticProduct.category.slug && p.slug !== slug\).slice\(0, 4\),/g, 'related: getRelatedProducts(slug, staticProduct),');

fs.writeFileSync(path, code);
console.log("Updated slug route!");
