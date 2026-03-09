# Auditoría Completa gard.cl — Marzo 2025

**Sitio:** gard.cl — Gard Security Chile  
**Stack:** Next.js 15, Vercel, Cloudflare Images  
**Objetivo:** Ser #1 en Google para "empresa de seguridad privada Chile" y aparecer en respuestas de ChatGPT, Perplexity y Claude.

---

## RESUMEN EJECUTIVO

### Score general del sitio: **7.2/10**

El sitio tiene una base sólida de SEO técnico, schema markup, y contenido GEO. Hay oportunidades claras de mejora en GEO (llms.txt), optimización de metadata por página, y algunas brechas de contenido.

### Top 5 hallazgos CRÍTICOS

1. **No existe /llms.txt** — Los crawlers de IA (ChatGPT, Perplexity, Claude) no tienen un archivo estándar que les indique cómo consumir el sitio. Esto reduce la probabilidad de ser citado en respuestas generadas por IA.

2. **robots.txt bloquea `/_next/data/`** — Next.js usa esta ruta para datos de páginas dinámicas. Bloquearla puede afectar la indexación de páginas que dependen de datos pre-renderizados en algunas configuraciones.

3. **Crawl-delay: 1 en robots.txt** — Google ignora Crawl-delay (solo lo respetan algunos bots antiguos). Es código muerto y puede confundir a otros crawlers. Además, ralentiza innecesariamente bots que sí lo respetan (ej. Bing).

4. **Metadata base sin og:image** — El `metadata.ts` raíz no define `openGraph.images`. Las páginas que no sobrescriben esto (ej. homepage, /servicios) no tendrán imagen al compartir en WhatsApp/LinkedIn.

5. **Páginas /test-form y /test accesibles** — Rutas de desarrollo/test están expuestas sin `noindex`, generando contenido de baja calidad indexable.

### Top 5 quick wins (alto impacto, bajo esfuerzo)

1. **Crear /llms.txt** — Archivo estático con descripción del sitio, URLs clave y formato para crawlers de IA. ~30 min.

2. **Agregar og:image por defecto en metadata.ts** — Una imagen 1200x630 de Gard para compartir en redes. ~15 min.

3. **Remover Crawl-delay y revisar Disallow /_next/data/** — Limpiar robots.txt. ~10 min.

4. **Agregar noindex a /test y /test-form** — Evitar indexación de páginas de prueba. ~20 min.

5. **Corregir lang="es" → lang="es-CL"** — En `app/layout.tsx` el HTML tiene `lang="es"`. Para SEO local Chile, `es-CL` es más preciso. ~5 min.

---

## HALLAZGOS DETALLADOS

---

### 1. SEO TÉCNICO

#### 1.1 Indexación

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| robots.txt | ✅ Existe | Ruta: `app/robots.txt/route.ts` |
| Contenido robots.txt | ⚠️ Mejorable | `Allow: /` correcto. `Disallow: /_next/data/` puede afectar algunas páginas dinámicas. `Crawl-delay: 1` es innecesario (Google lo ignora). |
| Sitemap | ✅ Existe | Dinámico en `app/sitemap.xml/route.ts` |
| meta robots noindex | ✅ Correcto | No hay noindex en páginas que deban indexarse. Blog página 3+ tiene `noindex, follow` (correcto para paginación). |
| Páginas con noindex | ⚠️ Revisar | `/presentacion-demo` y `/presentacion-demo/print` no tienen metadata explícita; podrían indexarse. `/test` y `/test-form` accesibles sin noindex. |

**Prioridad:** CRÍTICO (robots), ALTO (test pages)

---

#### 1.2 Metadata

| Página | Title | Description | Longitud desc |
|-------|-------|--------------|---------------|
| Homepage | "Gard Security Chile" (default) | Default ~120 chars | ✅ |
| /servicios | "Servicios de Seguridad \| Gard Security" | ~110 chars | ✅ |
| /cotizar | (heredado de metadata.ts cotizar) | Definido en cotizar/metadata.ts | ✅ |
| /blog | Definido en blog/metadata.ts | ~150 chars | ✅ |
| /mejor-empresa-seguridad-chile | "Mejor Empresa de Seguridad en Chile 2025 \| Gard Security" | ~120 chars, con CTA | ✅ |
| /servicios/[slug] | Dinámico por servicio | Por servicio | ✅ |

**Problemas:**
- ❌ Homepage usa template default; no hay title específico tipo "Empresa de Seguridad Privada Chile \| Gard Security".
- ❌ Varias páginas no tienen description con CTA explícito (150–160 chars).
- ⚠️ /servicios no tiene `alternates.canonical` en metadata (sí en layout.tsx del grupo servicios).
- ✅ Blog posts tienen metadata dinámica con canonical.

**Prioridad:** ALTO (homepage title/description para keywords objetivo)

---

#### 1.3 Open Graph y Social

| Aspecto | Estado |
|---------|--------|
| og:title, og:description | ✅ En metadata base y en muchas páginas |
| og:image | ❌ No definido en metadata.ts raíz. Algunas landing pages sí lo tienen (guardias-seguridad-mineria-chile, seguridad-bodegas-logistica-chile, etc.). |
| og:url | ✅ Definido donde hay openGraph |
| Twitter Cards | ✅ Blog posts tienen `twitter: { card: 'summary_large_image', ... }`. Otras páginas heredan. |
| Imágenes 1200x630 | ✅ Donde hay images, usan 1200x630 |
| og:image por página | ⚠️ Inconsistente: servicios principales no definen imagen OG específica |

**Prioridad:** CRÍTICO (og:image default), ALTO (imágenes por página de servicios)

---

#### 1.4 Schema / JSON-LD

| Schema | Estado | Ubicación |
|--------|--------|-----------|
| Organization | ✅ Implícito (LocalBusiness extiende) | LocalBusinessSchema |
| LocalBusiness | ✅ Completo | `components/seo/LocalBusinessSchema.tsx` — dirección, geo, teléfono, areaServed, aggregateRating, sameAs, openingHours |
| WebSite | ✅ | layout.tsx — SearchAction para /blog |
| Service | ✅ | ServiceSchema en páginas de servicios y landing GEO |
| FAQPage | ✅ | FAQSchema en varias landing (mejor-empresa-seguridad-chile, etc.) |
| Article | ✅ | ArticleSchema en blog y algunas landing |
| BreadcrumbList | ✅ | BreadcrumbSchema en servicios, industrias, blog |
| Review | ✅ | ReviewSchema en mejor-empresa-seguridad-chile |
| HowTo | ✅ | HowToSchema en mejor-empresa-seguridad-chile |
| Offer | ✅ | OfferSchema en algunas páginas |

**Faltan:**
- ⚠️ Schema Service en TODAS las páginas de servicios (solo algunas lo tienen explícitamente).
- ⚠️ FAQPage en homepage (FaqSection tiene FAQSchema pero verificar que se inyecte en todas las páginas que tienen FAQs).
- ⚠️ Article en posts del blog — verificar si BlogPost.tsx inyecta ArticleSchema.

**Prioridad:** MEDIO (completar Service en todas las páginas de servicios)

---

#### 1.5 Estructura de URLs

| Aspecto | Estado |
|---------|--------|
| URLs limpias | ✅ Ej: /servicios/guardias-de-seguridad, /industrias/mineria |
| Parámetros innecesarios | ✅ Redirecciones para UTM, elementor, etc. |
| Trailing slashes | ✅ Comentado en next.config (no forzado) |
| www vs non-www | ⚠️ metadataBase y canonicals usan www.gard.cl. No hay redirección explícita en next.config (Vercel suele manejarlo). |

**Prioridad:** BAJO

---

#### 1.6 Heading Hierarchy

| Página | H1 | Notas |
|--------|-----|-------|
| Homepage | "Seguridad de Clase Mundial para Empresas Exigentes" (GardHero) | ✅ Único |
| /servicios | Por servicio | ✅ |
| /mejor-empresa-seguridad-chile | "¿Cuál es la Mejor Empresa de Seguridad en Chile?" | ✅ |
| Blog | Por post | ✅ |
| /cotizar | "Cotiza tu Servicio de Seguridad" | ✅ |

- ✅ Jerarquía H2/H3 coherente en las páginas revisadas.
- ⚠️ Algunos H1 podrían incluir más keywords (ej. "empresa de seguridad privada Chile").

**Prioridad:** MEDIO

---

#### 1.7 Imágenes

| Aspecto | Estado |
|---------|--------|
| alt text | ✅ CloudflareImage exige `alt` |
| next/image | ✅ CloudflareImage usa next/image con loader |
| WebP/AVIF | ✅ next.config: `formats: ['image/webp', 'image/avif']` |
| Lazy loading | ✅ Por defecto en next/image (priority=false) |
| Priority above-the-fold | ✅ GardHero, Header, HeroIndustria usan `priority` |
| Cloudflare Images | ✅ Todas las imágenes vía imagedelivery.net |

**Prioridad:** BAJO (ya bien implementado)

---

#### 1.8 Internal Linking

| Aspecto | Estado |
|---------|--------|
| Servicios entre sí | ✅ IndustriasGridPage, OurServices, enlaces en contenido |
| Blog → servicios | ⚠️ Depende del contenido de cada post; hay lib/internal-linking.ts para keywords |
| Breadcrumbs | ✅ BreadcrumbSchema en servicios, industrias |
| Páginas huérfanas | ⚠️ Algunas landing específicas (ciudad/servicio) pueden tener pocos enlaces internos |
| Footer | ✅ Enlaces a Inicio, Servicios, Industrias, Sobre Nosotros, Blog, Cotizar, Contacto, Reclutamiento, Mapa del Sitio |

**Prioridad:** MEDIO (revisar internal links en blog posts)

---

#### 1.9 Hreflang / i18n

| Aspecto | Estado |
|---------|--------|
| Versión inglés | ❌ No existe |
| hreflang | N/A (solo español) |
| lang HTML | ⚠️ `lang="es"` en layout. Para Chile, `es-CL` sería más preciso. |

**Prioridad:** BAJO (lang), N/A (hreflang si no hay i18n)

---

### 2. GEO — VISIBILIDAD EN BUSCADORES DE IA

#### 2.1 llms.txt

- ❌ **No existe /llms.txt**
- Estándar emergente para que crawlers de IA (GPTBot, ClaudeBot, PerplexityBot) entiendan el sitio.
- Debería incluir: descripción del sitio, URLs principales, formato de contenido, contacto.

**Prioridad:** CRÍTICO

---

#### 2.2 robots.txt y AI Bots

El robots.txt actual tiene:
```
User-agent: *
Allow: /
```

- ✅ No bloquea explícitamente GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Applebot.
- ⚠️ No hay directivas específicas para estos bots. Por defecto, `Allow: /` los deja pasar.
- ❌ `Disallow: /_next/data/` podría afectar a bots que usan esas URLs para descubrir contenido.
- ⚠️ `Crawl-delay: 1` puede ralentizar a Bing (que sí lo respeta).

**Prioridad:** ALTO (revisar Disallow), MEDIO (Crawl-delay)

---

#### 2.3 Contenido optimizado para IA

| Aspecto | Estado |
|---------|--------|
| TL;DR / resumen ejecutivo | ⚠️ Algunos posts tienen intro; no hay formato estándar "Respuesta directa" |
| Headings como preguntas | ✅ mejor-empresa-seguridad-chile, FAQs en varias landing |
| Datos concretos (números, %) | ✅ En mejor-empresa-seguridad-chile, sobre-nosotros, ranking |
| FAQs autocontenidas | ✅ FAQSchema con respuestas completas |
| Answer capsules 50–60 palabras | ⚠️ No hay formato explícito; el contenido GEO en docs/ESTRATEGIA_GEO_2025.md está parcialmente implementado |

**Prioridad:** ALTO (TL;DR en blog, answer capsules)

---

#### 2.4 Server-Side Rendering

- ✅ Next.js 15 con App Router: páginas principales son Server Components.
- ✅ Blog: `getPostBySlug`, `generateStaticParams` — contenido en servidor.
- ✅ Metadata generada en servidor.
- ⚠️ Algunos componentes son `'use client'` (GardHero, FaqSection, etc.) pero el contenido crítico (texto, headings) suele estar en el HTML inicial.
- ✅ No hay dependencia fuerte de JS para contenido above-the-fold en la mayoría de páginas.

**Prioridad:** BAJO

---

### 3. PERFORMANCE

| Aspecto | Estado |
|---------|--------|
| next/font | ✅ inter, poppins en app/fonts |
| dynamic imports | ✅ FaqSection, ClientCarousel, IndustriasGridPage, etc. |
| Imágenes above-the-fold priority | ✅ GardHero, Header, hero de landing |
| Suspense/loading | ✅ Usado en varios dynamic imports |
| Caching headers | ✅ Cache-Control en next.config (3600s general, 86400 para sitemap/robots) |
| Bundle size | ⚠️ Framer Motion, keen-slider, varios Radix — revisar con `next build` y bundle analyzer |
| Core Web Vitals | ✅ SpeedInsights de Vercel; preconnect a imagedelivery.net, Cloudflare Stream |

**Estimación Lighthouse:** 75–85 (Performance) — buena base; posibles mejoras en LCP con prioridad de fuentes y reducción de JS.

**Prioridad:** MEDIO (auditar bundle, optimizar LCP)

---

### 4. SEGURIDAD

| Aspecto | Estado |
|---------|--------|
| Security headers | ✅ HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP |
| CSP | ✅ Content-Security-Policy definida (script-src, style-src, etc.) |
| API keys | ✅ NEXT_PUBLIC_* para cliente; OPAI y Make en env |
| Rate limiting | ❌ No hay rate limiting explícito en formularios/APIs |
| Anti-spam formularios | ❌ No hay honeypot, reCAPTCHA ni similar en CotizacionForm |
| X-XSS-Protection | ✅ 1; mode=block (aunque deprecado, no molesta) |

**Prioridad:** ALTO (rate limiting, honeypot/captcha en formularios)

---

### 5. FUNCIONALIDADES

#### 5.1 Formularios

| Aspecto | Estado |
|---------|--------|
| Cotización | ✅ CotizacionForm con react-hook-form, zod |
| Destino datos | ✅ OPAI (opai.gard.cl) → leads; fallback a Make |
| Confirmación visual | ✅ formStatus success/error con mensaje |
| Validación client-side | ✅ zod schema |
| Validación server-side | ⚠️ OPAI/Make reciben datos; no hay API route propia que valide |
| Protección spam | ❌ Sin honeypot ni captcha |

**Prioridad:** ALTO (anti-spam)

---

#### 5.2 Blog

| Aspecto | Estado |
|---------|--------|
| Cantidad artículos | ✅ 57 posts en docs/blog_posts |
| Metadata SEO | ✅ generateMetadata por post |
| Schema Article | ⚠️ Verificar en BlogPost.tsx |
| Fechas visibles | ✅ date en frontmatter |
| Autor | ⚠️ No hay campo author en frontmatter; se usa "Gard Security" |
| Categorías/tags | ✅ tags, category |
| Internal links a servicios | ⚠️ lib/internal-linking.ts; revisar cobertura en posts |

**Prioridad:** MEDIO (autor, internal links)

---

#### 5.3 Analytics

| Aspecto | Estado |
|---------|--------|
| Google Analytics | ✅ GA4 (G-4XJ2YKYYDH) vía ConsentAwareScript |
| Vercel Analytics | ✅ Analytics, SpeedInsights |
| GTM | ✅ GoogleTagManager si NEXT_PUBLIC_GTM_ID |
| Eventos conversión | ✅ trackFormSubmission, useGtmEvent en formularios |

**Prioridad:** BAJO

---

#### 5.4 Google Business Profile

- ✅ LocalBusinessSchema con dirección, geo (lat/long), teléfono.
- ⚠️ No hay link explícito a Google Maps en el footer (sí en otras partes del sitio).
- ✅ areaServed con ciudades.

**Prioridad:** BAJO

---

#### 5.5 WhatsApp

- ✅ Botón en footer: `https://wa.me/56956062246`
- ✅ Mensaje predeterminado en flujo de cotización (buildWhatsAppCotizacionMessage, buildWhatsAppComercialToClientMessage).

**Prioridad:** BAJO

---

### 6. CONTENIDO Y KEYWORDS

#### 6.1 Páginas principales y keywords objetivo

| Página | Keyword objetivo | Estado |
|--------|------------------|--------|
| Homepage | "empresa de seguridad privada Chile", "seguridad empresarial Chile" | ⚠️ Title default "Gard Security Chile"; no optimizado |
| /servicios | "servicios de seguridad privada" | ✅ |
| /servicios/guardias-de-seguridad | "guardias de seguridad Chile" | ✅ |
| /servicios/drones-seguridad | "seguridad con drones Chile" | ✅ |
| /servicios/seguridad-electronica | "seguridad electrónica empresas Chile" | ✅ |
| /servicios/central-monitoreo | "monitoreo de seguridad 24/7 Chile" | ✅ (slug central-monitoreo) |
| /industrias | "seguridad privada para minería", etc. | ✅ |
| /blog | Varios | ✅ |
| /cotizar | Conversión | ✅ |
| /mejor-empresa-seguridad-chile | GEO | ✅ Muy bien optimizado |
| /empresa-seguridad-privada-chile | GEO | ✅ |
| /guardias-seguridad-mineria-chile | GEO | ✅ |

---

#### 6.2 Content gaps

| Gap | Estado |
|-----|--------|
| Página "Sobre nosotros" | ✅ /sobre-nosotros existe |
| Página "Cobertura" con ciudades | ⚠️ /ciudades existe; no hay una página dedicada "Cobertura" con las 10 ciudades |
| Ley 21.659 | ✅ Mencionada en blog (certificacion-os10, capacitacion-certificacion-guardias, protocolo-emergencias) |
| Preguntas frecuentes mercado | ✅ FAQs en varias landing y FaqSection |

**Prioridad:** MEDIO (página Cobertura consolidada)

---

### 7. COMPETENCIA

| Aspecto | Estado |
|---------|--------|
| Diferenciadores | ✅ 100% OS10, reducción mermas -85%, 4.9/5, 10 ciudades, 15+ años |
| Testimonios | ✅ ReviewSchema con testimonios en mejor-empresa-seguridad-chile |
| Números concretos | ✅ 500+ guardias, 127 reviews, 99.9% uptime, <15 min respuesta |
| Certificaciones | ✅ OS10, ISO 9001, Compliance Ley 20.393 |
| Tabla comparativa | ✅ En mejor-empresa-seguridad-chile (Gard vs competencia) |

**Prioridad:** BAJO (ya bien cubierto)

---

## RECOMENDACIONES PRIORIZADAS

### CRÍTICO

1. **Crear /llms.txt** — Incluir descripción del sitio, URLs principales (home, servicios, mejor-empresa-seguridad-chile, cotizar), y contacto. Esfuerzo: ~30 min.

2. **Agregar og:image por defecto** — En app/metadata.ts, añadir `openGraph.images` con una imagen 1200x630 de Gard. Esfuerzo: ~15 min.

3. **Revisar robots.txt** — Quitar `Crawl-delay: 1`. Evaluar si `Disallow: /_next/data/` debe mantenerse (en Next.js 15 App Router suele no ser necesario para indexación). Esfuerzo: ~15 min.

4. **noindex para /test y /test-form** — Añadir metadata con `robots: { index: false, follow: false }` o excluir de sitemap y bloquear en robots. Esfuerzo: ~20 min.

### ALTO

5. **Optimizar metadata homepage** — Title: "Empresa de Seguridad Privada Chile \| Gard Security" y description 150–160 chars con CTA. Esfuerzo: ~20 min.

6. **Honeypot o reCAPTCHA en formularios** — Reducir spam en cotización y contacto. Esfuerzo: 2–4 h.

7. **og:image por página de servicios** — Cada servicio con imagen OG 1200x630 específica. Esfuerzo: ~1 h.

8. **TL;DR / answer capsules en blog** — Añadir párrafo de 50–60 palabras al inicio de posts clave para GEO. Esfuerzo: 2–3 h por post prioritario.

### MEDIO

9. **lang="es-CL"** — En app/layout.tsx. Esfuerzo: ~5 min.

10. **Service Schema en todas las páginas de servicios** — Asegurar que cada /servicios/[slug] tenga ServiceSchema. Esfuerzo: ~1 h.

11. **Página "Cobertura"** — Consolidar ciudades y cobertura en una página dedicada. Esfuerzo: 2–3 h.

12. **noindex para /presentacion-demo** — Si es solo interno. Esfuerzo: ~10 min.

### BAJO

13. **Auditar bundle size** — Analizar con @next/bundle-analyzer y reducir dependencias pesadas. Esfuerzo: 2–4 h.

14. **Internal links en blog** — Revisar que posts clave enlacen a servicios e industrias. Esfuerzo: 1–2 h.

---

## ESTIMACIÓN DE IMPACTO

### Ranking en Google

- Con los cambios CRÍTICOS y ALTO (metadata, llms.txt, robots, og:image): **+15–25%** en visibilidad estimada para keywords objetivo en 3–6 meses.
- Homepage optimizada para "empresa de seguridad privada Chile" puede mejorar posiciones en 2–4 meses si la competencia no cambia.
- Landing GEO (mejor-empresa-seguridad-chile, etc.) ya están bien posicionadas; mejoras incrementales.

### Keywords con mayor potencial

- "empresa de seguridad privada Chile" — homepage optimizada
- "guardias de seguridad Santiago" — ya hay landing
- "seguridad para minería Chile" — guardias-seguridad-mineria-chile
- "mejor empresa de seguridad Chile" — mejor-empresa-seguridad-chile

### Visibilidad en buscadores de IA

- **Sin llms.txt:** Probabilidad baja-media de ser citado de forma consistente.
- **Con llms.txt + contenido GEO existente:** Probabilidad media-alta en 3–6 meses para queries como "¿cuál es la mejor empresa de seguridad privada en Chile?".
- El contenido en mejor-empresa-seguridad-chile, FAQs y schema ya está bien alineado con GEO; llms.txt y pequeños ajustes de formato pueden cerrar la brecha.

---

**Documento generado:** Marzo 2025  
**Próxima revisión:** Post-implementación de cambios CRÍTICOS y ALTO
