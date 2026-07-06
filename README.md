# AMC Soluciones Perú — Plataforma Enterprise

Plataforma corporativa Enterprise para **AMC Soluciones Perú** — venta y servicio técnico de contadoras de billetes, monedas, clasificadoras y detectores.

Construida con **Next.js 16 + TypeScript + Prisma + NextAuth** siguiendo estándares Enterprise.

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 (strict) |
| UI | Tailwind CSS 4 + shadcn/ui (New York) |
| Iconos | Lucide React |
| Animación | Framer Motion |
| Estado | Zustand + TanStack Query |
| ORM | Prisma 6 (SQLite dev / PostgreSQL prod) |
| Auth | NextAuth.js v4 (JWT + 4 roles) |
| Forms | React Hook Form + Zod |
| Hosting | Vercel (recomendado) |

---

## 📐 Arquitectura

```
src/
├── app/
│   ├── (public)/                # Páginas públicas
│   ├── admin/                   # Panel CMS (protegido)
│   ├── api/                     # API Routes REST
│   │   ├── auth/[...nextauth]/  # NextAuth handler
│   │   ├── products/            # GET público
│   │   ├── categories/          # GET público
│   │   ├── brands/              # GET público
│   │   ├── quotes/              # POST público (rate-limited)
│   │   ├── contact/             # POST público (rate-limited)
│   │   ├── faq/, blog/          # GET público
│   │   └── admin/               # CRUD protegido por rol
│   ├── login/                   # Login admin
│   ├── sitemap.ts               # SEO dinámico
│   └── robots.ts                # SEO dinámico
├── components/
│   ├── ui/                      # shadcn/ui base
│   ├── layout/                  # Header, Footer, WhatsAppFloat
│   ├── home/                    # 10 secciones del Home
│   ├── product/                 # ProductCard
│   └── shared/                  # SectionTitle, QuoteForm
├── lib/
│   ├── db.ts                    # Prisma client singleton
│   ├── auth.ts                  # NextAuth config
│   ├── auth-server.ts           # Matriz de permisos + can()
│   ├── audit.ts                 # Audit log helper
│   ├── rate-limit.ts            # Rate limiting in-memory
│   ├── site-config.ts           # Datos centrales de marca
│   └── validators/              # Zod schemas (compartidos cliente/servidor)
├── hooks/
├── stores/                      # Zustand
├── types/
└── middleware.ts                # Protege /admin/*
```

---

## 🔐 Sistema de Roles

4 roles con matriz de permisos por recurso + acción:

| Rol | Acceso |
|-----|--------|
| `SUPER_ADMIN` | Total + gestión de usuarios |
| `ADMIN` | Catálogo, CMS, cotizaciones, contactos, config |
| `EDITOR` | Catálogo, CMS (no usuarios ni config) |
| `SALES` | Cotizaciones y contactos (lectura + gestión) |

---

## 🗄️ Base de Datos

13 modelos normalizados en 3FN: User, Session, Category, Subcategory, Brand, Product, ProductImage, ProductVideo, ProductDocument, ProductFeature, ProductSpecification, ProductApplication, Quote, Contact, BlogPost, FAQ, SiteConfig, Testimonial, AuditLog.

Estrategia de eliminación: **soft-delete** vía `isActive = false` (preserva auditoría + SEO).

---

## 🛠️ Setup Local

```bash
# 1. Instalar dependencias
bun install

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores

# 3. Crear base de datos
bun run db:push

# 4. Ejecutar seed inicial (usuarios + 4 productos demo + FAQ + testimonios)
bun run scripts/seed.ts

# 5. Iniciar dev server
bun run dev
```

### Credenciales demo (post-seed)

```
SUPER_ADMIN: admin@amcsolucionesperu.com / AdminAMC2026!
SALES:       ventas@amcsolucionesperu.com / SalesAMC2026!
```

⚠️ **Cambiar estas contraseñas en producción.**

---

## 📋 Scripts Disponibles

| Script | Función |
|--------|---------|
| `bun run dev` | Dev server en http://localhost:3000 |
| `bun run lint` | ESLint check |
| `bun run db:push` | Sincronizar schema Prisma con DB |
| `bun run db:generate` | Regenerar Prisma Client |
| `bun run db:migrate` | Crear migración |
| `bun run db:reset` | Resetear DB (cuidado) |
| `bun run scripts/seed.ts` | Seed inicial |

---

## 🎨 Design System

Paleta oficial extraída del logotipo AMC:

- **Azul corporativo:** `#003366` (primary)
- **Plata industrial:** `#B0B0B0` (secondary)
- **Accent:** `#0b4db8`
- Neutrals slate · success · warning · error · info

Tipografías: **Sora** (display) + **Inter** (body) + **JetBrains Mono** (datos técnicos).

Documentación completa del Design System: ver `src/app/globals.css`.

---

## 🌐 SEO Enterprise

- Metadata API dinámica por página
- JSON-LD Organization + LocalBusiness + WebSite
- Open Graph + Twitter Cards
- Sitemap.xml dinámico
- Robots.txt dinámico
- Canonical URLs
- BreadcrumbList JSON-LD
- Schema.org Product en cada producto

---

## 🚢 Deployment (Vercel)

1. Conectar repo GitHub `aviacion2599/amc-soluciones-peru` en Vercel
2. Configurar variables de entorno en Vercel:
   - `DATABASE_URL` (PostgreSQL — Neon/Supabase/Vercel Postgres)
   - `NEXTAUTH_SECRET` (generar con `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (URL producción)
3. Deploy automático en cada `git push` a `main`
4. Apuntar dominio `amcsolucionesperu.com` en Vercel

---

## 📊 Estado del Proyecto

| Fase | Estado |
|------|:------:|
| 1. Arquitectura | ✅ Congelada |
| 2. Design System | ✅ Congelada |
| 3. Frontend Home | ✅ Congelada |
| 4. Backend + Auth + API | ✅ Congelada |
| 5. CMS Admin Panel | 🚧 Pendiente |
| 6. Optimización | 🚧 Pendiente |
| 7. SEO | 🚧 Pendiente |
| 8. Testing | 🚧 Pendiente |
| 9. Deployment | 🚧 Pendiente |

---

## 📞 Contacto

**AMC Soluciones Perú** · Lima, Perú
- WhatsApp: +51 984 569 125
- Email: ventas@amcsolucionesperu.com
- Web: https://amcsolucionesperu.com
