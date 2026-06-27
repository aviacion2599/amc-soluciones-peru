// @ts-nocheck
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

(async () => {
  const [u, p, c, b, q, a, f, t, s] = await Promise.all([
    db.user.count(),
    db.product.count(),
    db.category.count(),
    db.brand.count(),
    db.quote.count(),
    db.auditLog.count(),
    db.fAQ.count(),
    db.testimonial.count(),
    db.siteConfig.count(),
  ]);
  console.log("=== AMC DB Stats ===");
  console.log("Users:", u);
  console.log("Products:", p);
  console.log("Categories:", c);
  console.log("Brands:", b);
  console.log("Quotes:", q);
  console.log("Audit Logs:", a);
  console.log("FAQs:", f);
  console.log("Testimonials:", t);
  console.log("Site Configs:", s);
  console.log("===================");
  await db.$disconnect();
})();
