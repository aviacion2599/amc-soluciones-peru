const exactOrder = [
  "amc-2000",
  "amc-3200",
  "amc-8100",
  "amc-8200",
  "amc-9100",
  "amc-9200",
  "amc-cm3400",
  "amc-cm3400-max"
];

const products = [
  { slug: "amc-cm3400" },
  { slug: "amc-cm3400-max" },
  { slug: "amc-2000" },
  { slug: "amc-3200" },
  { slug: "amc-8100" },
  { slug: "amc-8200" },
  { slug: "amc-9200" },
  { slug: "amc-9100" }
];

products.sort((a, b) => {
  const idxA = exactOrder.indexOf(a.slug);
  const idxB = exactOrder.indexOf(b.slug);
  const valA = idxA !== -1 ? idxA : 999;
  const valB = idxB !== -1 ? idxB : 999;
  return valA - valB;
});

console.log(products.map(p => p.slug));
