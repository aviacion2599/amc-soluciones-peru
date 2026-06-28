import type { MetadataRoute } from "next";

/**
 * robots.ts — Next.js Metadata API.
 * Reemplaza al robots.txt estático con configuración dinámica.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login"],
      },
    ],
    sitemap: "https://amcsolucionesperu.com/sitemap.xml",
  };
}