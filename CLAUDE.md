# GARD.CL — REPOSITORY INSTRUCTIONS

Instrucciones permanentes para trabajar en este repositorio (`Cryptobal/gard-page-web`, sitio `www.gard.cl`). Todo lo declarado aquí fue verificado en el código a la fecha de creación. Cuando algo no pudo verificarse se indica: `No identificado en el repositorio`.

## 1. Project overview

- **Qué es**: sitio web corporativo y de captación de leads de **Gard Security**, empresa chilena de seguridad privada (guardias, seguridad electrónica, monitoreo, drones). Contenido 100% en español de Chile (`lang="es-CL"`).
- **Audiencia**: empresas (B2B) que buscan contratar servicios de seguridad en Chile, y postulantes a guardias (RRHH).
- **Qué comunica** (verificado en rutas y datos): 8 servicios (`app/servicios/serviceMetadata.ts`), 23 industrias (`app/industrias/industryMetadata.ts`), 10 ciudades (`lib/data/ciudad-data.ts`), blog (~93 posts markdown), páginas legales/cumplimiento, tecnología propia (ERP **OPAI**) y páginas comparativas (`/vs/*`).
- **Objetivos de conversión**: (1) cotización comercial (`/cotizar`, `/cotizador-inteligente` → leads en OPAI), (2) contacto (`/contacto`), (3) postulaciones de guardias (`/reclutamiento`), (4) clic en WhatsApp/teléfono/email.

## 2. Business and brand principles

El sitio debe transmitir: confianza, profesionalismo, capacidad operacional, cumplimiento (OS10, Ley 21.659, Ley 20.393), cobertura nacional real, tecnología (OPAI), respuesta rápida, seguridad, transparencia.

Prioridades en orden:
1. Conversión comercial
2. Claridad del mensaje
3. SEO
4. Rendimiento
5. Experiencia móvil
6. Accesibilidad
7. Confianza y consistencia de marca
8. Seguridad y privacidad
9. Mantenibilidad
10. Simplicidad técnica

## 3. Verified technology stack

| Área | Tecnología | Evidencia |
|---|---|---|
| Framework | Next.js 15.0.7 (App Router) | `package.json`, `app/` |
| Lenguaje | TypeScript 5.6 (`strict: true`) | `tsconfig.json` |
| UI | React 18.3, Tailwind CSS 3.4, componentes estilo shadcn/ui sobre Radix | `package.json`, `components/ui/` |
| Animación | Framer Motion 11 | `app/providers.tsx` |
| Temas | next-themes (`defaultTheme="dark"`, `attribute="class"`) | `app/providers.tsx` |
| Formularios | react-hook-form + zod (cotizador); useState + validación manual (contacto, reclutamiento) | `app/cotizar/components/`, `components/contacto/ContactForm.tsx` |
| Contenido blog | Markdown local + gray-matter + remark/remark-html/remark-gfm | `lib/blog.ts`, `docs/blog_posts/` |
| Imágenes | Cloudflare Images (`imagedelivery.net`) vía `<CloudflareImage/>` | `lib/images.ts`, `components/CloudflareImage.tsx` |
| Video | Cloudflare Stream | `components/CloudflareVideo.tsx` |
| Backend / CRM | **OPAI** (`https://opai.gard.cl`) — fetch directo desde el cliente, sin API routes propias para forms | `app/config/api.ts` |
| Analítica | GTM (`GTM-W9QM4NMC`) + GA4 (`G-4XJ2YKYYDH`) con gate de consentimiento; Vercel Analytics + Speed Insights | `app/components/ClientScripts.tsx`, `.env.example`, `app/layout.tsx` |
| Chat | Zoho SalesIQ | `app/components/ZohoSalesIQ.tsx` |
| Mapas | Google Maps JS API + Places (autocomplete de dirección) | `lib/googleMapsLoader.ts`, `.env.example` |
| Hosting | Vercel (`regions: ["gru1"]`, deploy vía integración Git) | `vercel.json` |
| CI | GitHub Actions (build/typecheck, Lighthouse CI, crons GSC, site-audit) | `.github/workflows/` |
| Gestor de paquetes | pnpm (CI usa pnpm 10.7.0 + Node 20) | `pnpm-lock.yaml`, `.github/workflows/nextjs.yml` |
| Testing | No hay framework de tests (`"test": "echo 'No tests configured yet'"`) | `package.json` |
| Base de datos | No identificado en el repositorio (persistencia vive en OPAI) | — |
| Email / CMS | No identificado en el repositorio (emails los dispara OPAI; no hay CMS) | — |

## 4. Repository structure

- `app/` — rutas App Router. Páginas estáticas por carpeta, dinámicas `[ciudad]/[servicio]`, `servicios/[slug]`, `servicios/[slug]/[industria]`, `industrias/[slug]`, `blog/[slug]` (+ paginación y tags). Route groups: `(legal)` y `(landing-cotizador-inteligente)`.
- `app/api/` — solo endpoints de blog (`blog/latest`, `blog/post/[slug]`, `blog/posts`). **No hay endpoints de formularios.**
- `app/components/` — componentes acoplados a rutas (GTM, ZohoSalesIQ, EventTracker, cookie/consent, cotizador V2). Ojo: duplica algunos nombres con `components/`.
- `app/config/api.ts` — endpoints OPAI (`API_URLS`).
- `app/data/` — datasets de UI: `servicios.ts`, `services.ts`, `industries.ts`, `servicios-por-industria.ts`, `clientes.ts`, `clients.ts`, `faqData.ts`.
- `components/` — componentes compartidos (`Header`, `Footer`, `CloudflareImage`, `ExitIntentPopup`, `RecruitFloatingCTA`) y subcarpetas por dominio (`ui/`, `seo/`, `cotizador/`, `contacto/`, `legal/`, `blog/`, …).
- `lib/` — lógica y datos de dominio: `blog.ts`, `calculadora-costos.ts`, `internal-linking.ts`, `images.ts`, `comunas-chile.ts`, `opaiPayload.ts`, `submitOpaiMessage.ts`, `ab-testing*.ts`, `analytics/`, `seo/search-console.ts` y `lib/data/` (fuentes de verdad, ver §7).
- `docs/` — blog posts (`docs/blog_posts/`), planes y guías (`SEO_OVERHAUL_PLAN.md`, `GUIA_EVENTOS_GTM_GARD.md`, `ab-testing.md`, `guidelines/`).
- `scripts/` — `validate-ciudad-content.ts`, `automations/` (Google Search Console), scripts de subida a Cloudflare.
- `middleware.ts` — redirecciones 308 legacy y cookie A/B.
- `next.config.js` — redirects SEO, headers de seguridad/CSP, config de imágenes.
- Archivos `AUDITORIA_*.md`, `RESUMEN_*.md`, `api_posts.txt`, `lighthouse-report.json`, `auditoria_gard*/`, `backup-archivos/` — históricos/generados; no son fuente de verdad ni deben leerse por defecto.

## 5. Main commands

| Acción | Comando |
|---|---|
| Instalación | `pnpm install` (hay `pnpm-lock.yaml`; CI usa pnpm 10.7.0 / Node 20) |
| Desarrollo | `pnpm dev` (`next dev --disable-source-maps`) |
| Typecheck | `pnpm typecheck` (`tsc --noEmit`) |
| Lint | `pnpm lint` (`next lint`; en build está `ignoreDuringBuilds: true`) |
| Build | `pnpm build` |
| Preview local de producción | `pnpm start` (tras build) |
| Limpiar | `pnpm clean` |
| Pruebas | No identificado en el repositorio (`pnpm test` solo imprime un mensaje) |
| Formato | No identificado en el repositorio (no hay Prettier configurado) |
| Validar contenido ciudad×servicio | `pnpm validate-ciudad` |
| GSC (indexing / analytics / credenciales) | `pnpm gsc-indexing` / `pnpm gsc-analytics` / `pnpm gsc-verify` (requieren secrets; corren en crons de GitHub Actions) |
| Despliegue | Solo documental: Vercel despliega automáticamente desde Git. No desplegar manualmente. |

## 6. Architecture

- **Routing/render**: App Router, server components por defecto. SSG con `generateStaticParams` en `servicios/[slug]`, `servicios/[slug]/[industria]` (`dynamicParams = false`, allowlist `COMBOS_INDEXABLES`), `[ciudad]/[servicio]` y todo el blog. ISR en `industrias/[slug]` (`revalidate = 3600`) y en sitemap/llms.txt (`revalidate = 86400`). `robots.txt` y `sitemap-redirect.xml` son `force-dynamic`.
- **Dos árboles ciudad**: `app/[ciudad]/[servicio]` (SSG server, plantilla `CiudadServicioGold`/`CiudadServicioLanding`) y `app/ciudades/[ciudad]/**` (client components con `useParams`; sus `generateStaticParams.ts`/`generateMetadata.ts` hermanos no se re-exportan y no tienen efecto). El árbol canónico activo para SEO es `app/[ciudad]/[servicio]`.
- **Root layout** (`app/layout.tsx`): fuentes Inter/Poppins vía `next/font` (`app/fonts.ts`), `ClientWrapper` → Providers (next-themes + AnimatePresence) + `CookieConsent`, GTM/GA4/Zoho condicionados a consentimiento (`app/context/ConsentContext.tsx`), `LocalBusinessSchema` + WebSite JSON-LD, Header, Footer, `ExitIntentPopup`, `RecruitFloatingCTA`.
- **Middleware**: redirecciones 308 de URLs legacy WordPress (`/landing-dinamico/*`, `/servicios-por-industria/*`), colapso de combos servicio×industria no indexables al servicio padre, y asignación de cookie A/B `gard_ab_cotizar_form`.
- **Formularios**: client components que hacen `POST` directo a OPAI (ver §14). No hay proxy en Next.
- **Imágenes**: todas por Cloudflare Images con `<CloudflareImage/>` (loader custom a `imagedelivery.net`, account hash en `lib/images.ts`). No usar `<img>` con rutas externas.
- **Despliegue**: push a `main` → Vercel. CI valida build/typecheck (`nextjs.yml`), Lighthouse en PRs (`lighthouse.yml`), auditoría de producción (`site-audit.yml`), crons GSC diario/semanal.
- **Config por ambiente**: `.env.example` documenta `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`; OPAI se puede sobreescribir con `NEXT_PUBLIC_OPAI_API_URL`.

## 7. Sources of truth

| Dominio | Fuente de verdad | Archivos o módulos |
|---|---|---|
| Cifras de empresa (años, guardias, rating GMB, teléfono NAP) | `companyStats` — **nunca hardcodear cifras en componentes** | `lib/data/company-stats.ts` |
| Servicios (8 slugs canónicos) | `servicesMetadata` | `app/servicios/serviceMetadata.ts` (UI complementaria en `app/data/servicios.ts` y `app/data/services.ts`) |
| Industrias (23) | `industriesMetadata` | `app/industrias/industryMetadata.ts` (grilla home reducida en `app/data/industries.ts`) |
| Ciudades (10) | `ciudades` (editorial) + `ciudadesDataset` (datos oficiales con fuente URL obligatoria) | `lib/data/ciudad-data.ts`, `lib/data/ciudades-dataset.ts` |
| Contenido ciudad×servicio | `getCiudadServicioContent` + copy curado | `lib/data/getCiudadServicioContent.ts`, `lib/data/servicio-ciudad-copy.ts` |
| Combos servicio×industria indexables | Allowlist `COMBOS_INDEXABLES` / `esComboIndexable` (gobierna sitemap, `generateStaticParams` y middleware) | `lib/data/combosIndexables.ts` |
| Blog | Markdown local (no hay CMS ni API externa; `api_posts.txt` es residuo) | `docs/blog_posts/*.md`, procesado por `lib/blog.ts` |
| Clientes (logos) | `CLIENTES` / `clients` | `app/data/clientes.ts`, `app/data/clients.ts` |
| Testimonios | `testimonials` (hoy **vacío**; solo con consentimiento escrito y `verified: true`) | `lib/data/testimonials.ts` |
| FAQs | Tres fuentes según contexto: home/categorías, por servicio, por industria | `app/data/faqData.ts`, `lib/data/faq.ts`, `lib/data/industry-faqs.ts` |
| Endpoints backend | `API_URLS` | `app/config/api.ts` |
| Cálculo de precios de guardias | Constantes y lógica central | `lib/calculadora-costos.ts` |
| Imágenes | Catálogo de IDs Cloudflare | `lib/images.ts` (+ `lib/data/opai-images.ts`) |
| SEO/GSC | Constantes de propiedad y sitemap | `lib/seo/search-console.ts`, `app/sitemap.xml/route.ts` |
| Navegación global | Header y Footer | `components/Header.tsx`, `components/Footer.tsx` |
| Comunas de Chile | `COMUNAS_CHILE` | `lib/comunas-chile.ts` |
| Información legal | Route group `(legal)` + shell compartido | `app/(legal)/*`, `components/legal/LegalPageShell.tsx` |

Duplicaciones conocidas (documentadas, no "arreglar" sin tarea explícita): pares `app/data/clients.ts`/`clientes.ts` y `services.ts`/`servicios.ts`; `lib/servicios-mapping.ts` con 14 slugs legacy que no coinciden con los 8 canónicos; dos `globals.css` (`app/` y `styles/`); páginas legales sueltas (`app/privacidad`, `app/terminos`, `app/politica-ambiental`) fuera del grupo `(legal)`; componentes duplicados entre `components/` y `app/components/`.

## 8. Instruction hierarchy

1. Solicitud explícita actual del usuario.
2. Este `CLAUDE.md`.
3. Brief de la tarea.
4. Documentación local (`docs/`, `.cursorrules`, `.cursor/rules/design.mdc`).
5. Implementación existente en el código.
6. Convenciones generales de ingeniería.

El repositorio es la fuente técnica final de verdad; si la documentación contradice al código, manda el código y se reporta la discrepancia.

## 9. Mandatory working protocol

Para cada tarea: (1) leer `CLAUDE.md`; (2) leer el brief; (3) comprender el objetivo comercial y técnico; (4) identificar páginas y componentes afectados; (5) revisar los archivos indicados y sus dependencias directas; (6) verificar el estado actual real; (7) identificar la causa raíz; (8) plan compacto; (9) implementar el cambio mínimo completo; (10) validar (§26); (11) corregir fallas introducidas; (12) revisar el diff; (13) informar resultados reales, sin exagerar ni omitir.

## 10. Context and token efficiency

- Buscar de forma dirigida (grep/glob por símbolo o ruta), expandir progresivamente solo a dependencias directas.
- No leer: `node_modules`, `.next`, `pnpm-lock.yaml`, `lighthouse-report.json`, `api_posts.txt`, `auditoria_gard*/`, `backup-archivos/`, los `.md` de auditoría/resumen en la raíz, ni los 93 posts del blog completos (leer solo los relevantes a la tarea).
- Detener la exploración cuando ya hay evidencia suficiente para actuar.
- La eficiencia nunca justifica omitir validación, seguridad, SEO ni revisión responsive.

## 11. Coding standards

Convenciones verificadas del proyecto:
- TypeScript strict; sin `any` salvo justificación. Tipos exportados desde el archivo donde viven los datos.
- Server components por defecto; `'use client'` solo con estado/interactividad real.
- Imports absolutos con alias `@/` (`tsconfig.json`).
- Tailwind con el design system existente: clases `gard-*` (`gard-section`, `gard-container`, `gard-btn`, `gard-card`, …), tokens HSL `--gard-*` (`tailwind.config.ts`), tipografía Poppins (títulos) / Inter (cuerpo). No inventar valores arbitrarios de color.
- Iconos solo de `lucide-react`; prohibidos los emojis en producción (`.cursor/rules/design.mdc`).
- Imágenes solo vía `<CloudflareImage/>`.

Reglas generales: reutilizar patrones existentes; no agregar dependencias innecesarias; no duplicar código; manejar errores explícitamente; no refactorizar fuera del alcance; no reformatar archivos ajenos a la tarea; no dejar `console.log` temporales; preservar contratos públicos (URLs, exports, payloads a OPAI); resolver la causa raíz, no el síntoma.

## 12. Brand and content rules

- Contenido claro, específico y B2B; español de Chile natural, nunca calcado del inglés.
- **Prohibido inventar** cifras, clientes, certificaciones, testimonios, casos de estudio o coberturas. Cifras solo desde `companyStats`. Testimonios solo con consentimiento escrito (`lib/data/testimonials.ts`). Datos de ciudad solo con fuente oficial (`ciudades-dataset.ts`: sin fuente → `null`).
- Frases prohibidas en contenido nuevo (política Helpful Content, `.cursorrules`): "soluciones integrales", "clase mundial", "excelencia en servicio", "plan de seguridad personalizado", "protocolos de emergencia específicos", "control de acceso especializado", "capacitado en situaciones de riesgo". `scripts/validate-ciudad-content.ts` valida frases prohibidas y duplicación por 5-gramas.
- Mantener consistencia entre páginas en tiempos de respuesta, cifras, nombres de servicios y cobertura; detectar y reportar contradicciones.
- **Inconsistencia conocida a vigilar**: hay teléfonos/WhatsApp dispersos y distintos entre sí — `+56941137976` (NAP en `company-stats.ts`), `56982307771` (WhatsApp comercial en cotizadores), `56956062246` (WhatsApp RRHH, footer, `tel:` de contacto), `+56 9 6872 7644` (`lib/data/faq.ts`). Antes de tocar datos de contacto, confirmar cuál corresponde; no "unificar" sin instrucción.
- Evitar texto genérico o excesivamente promocional.

## 13. Information architecture and navigation

Navegación real: `components/Header.tsx` y `components/Footer.tsx` (chrome global desde `app/layout.tsx`; el grupo `(landing-cotizador-inteligente)` tiene layout aislado sin chrome global).

Secciones: `/` (home) · `/servicios` + `/servicios/[slug]` + combos allowlist `/servicios/[slug]/[industria]` · `/industrias` + `/industrias/[slug]` · `/ciudades` + matriz `/[ciudad]/[servicio]` · `/tecnologia-seguridad` (OPAI) · `/sobre-nosotros` · `/blog` (+ paginación/tags) · `/contacto` · `/cotizar` y `/cotizador-inteligente` · `/reclutamiento` · legales `(legal)` · landings keyword y `/vs/*` · `/portal-cliente`, `/presentacion-demo`, `/mapa-del-sitio`.

Reglas:
- No crear páginas huérfanas: toda página nueva debe estar enlazada (nav, footer, interlinking o sitemap según corresponda).
- No duplicar rutas para la misma intención de búsqueda (ya hubo consolidaciones por canibalización; ver redirects en `next.config.js`).
- Usar siempre los slugs canónicos de servicios/industrias/ciudades (§7). Nuevos combos servicio×industria requieren entrada en `COMBOS_INDEXABLES` + contenido único.
- Cambios de URL indexada exigen redirect 308 permanente en `next.config.js` o middleware.

## 14. Conversion and forms

Formularios reales (todos POST directo a OPAI, éxito inline — no existen páginas `/gracias`):

| Formulario | Archivo | Endpoint OPAI | Notas |
|---|---|---|---|
| Cotización (variante control) | `app/cotizar/components/CotizacionForm.tsx` | `/api/public/gard/leads` (`source: web_cotizador`) | RHF + zod, Google Places (solo CL), dotación de guardias, honeypot `website`, 2 reintentos |
| Cotización multistep (variante A/B) | `app/cotizar/components/CotizacionFormMultiStep.tsx` | ídem | 4 pasos, partial lead en localStorage `gard_partial_lead_v1` |
| Cotizador inteligente | `app/components/cotizador/CotizadorInteligenteV2.tsx` | `/leads` (`source: web_cotizador_inteligente`) | Landing con GTM inline hardcodeado (salta el gate de consentimiento — inconsistencia conocida) |
| Contacto | `components/contacto/ContactForm.tsx` | `/api/public/gard/messages` (`type: contacto`) | Honeypot, validación manual |
| Postulación express (RRHH) | `app/reclutamiento/ReclutamientoForm.tsx` | `/api/public/gard/postulacion-express` (token `NEXT_PUBLIC_POSTULACION_TOKEN`) | RUT chileno validado (`lib/postulacion-data.ts`), comunas, manejo de duplicados (409 RUT_DUPLICADO), atribución propia (`deriveSource`) |
| Denuncias (Ley Karin / ética / cumplimiento) | `components/legal/LeyKarinDenunciaForm.tsx` + `lib/submitOpaiMessage.ts` | `/messages` (+ `/messages/upload` para evidencia) | Soporta modo anónimo |

Reglas:
- **Nunca mezclar leads comerciales con postulaciones**: endpoints, payloads y WhatsApp distintos (comercial `56982307771`; RRHH `56956062246`).
- Preservar validaciones existentes (teléfono 9 dígitos, RUT, zod), estados de carga/error/éxito, honeypots y reintentos (`lib/submitOpaiMessage.ts`: no reintenta 4xx salvo 408/429).
- Anti-spam server-side, rate limiting y captcha viven en OPAI, no en este repo — no asumir que existen aquí.
- Preservar atribución: UTMs/gclid capturados por `app/ClientUtmCapture.tsx` + `lib/analytics/formTracking.ts` y adjuntados al payload; `getPaginaWebFromEmail` deriva dominio corporativo.
- Todo cambio de formulario debe mantener los eventos de analítica (§23), accesibilidad (labels, foco, errores anunciados) y responsive.
- Consentimiento de cookies gestionado por `app/context/ConsentContext.tsx` + `app/components/cookie/`; no cargar scripts de tracking fuera de ese gate (salvo la excepción documentada del cotizador inteligente).

## 15. SEO

Implementación real:
- **Metadata**: base en `app/metadata.ts` (`metadataBase = https://www.gard.cl`; deliberadamente **sin** `alternates` globales para no heredar canonical del home — no revertir). Cada página indexable declara su propio `alternates.canonical` absoluto y OG/Twitter (estático o `generateMetadata`). `app/force-metadata.ts` / `ForceMetadataClient` es un hack solo-desarrollo.
- **Sitemap**: route handler manual `app/sitemap.xml/route.ts` (ISR 24 h): estáticas + landings keyword + servicios + combos allowlist + industrias + matriz 10×8 ciudad×servicio + blog (paginación solo hasta page/2; 3+ es noindex). **No modificar el sitemap sin avisarlo explícitamente en el resultado** — afecta indexación.
- **Robots**: `app/robots.txt/route.ts` (permite bots de IA: GPTBot, ClaudeBot, PerplexityBot, etc.). **GEO**: `app/llms.txt/route.ts` regenerado desde `companyStats`.
- **Structured data** (`components/seo/`): `LocalBusinessSchema` (global; **sin** `aggregateRating` por política de Google — no reintroducir), `BreadcrumbSchema` (+ nav visual), `ServiceSchema`, `FAQSchema`, `HowToSchema`, `OfferSchema`, `ReviewSchema`, `SchemaMarkup` (legacy en páginas ranking/mejor-empresa). WebSite JSON-LD en el layout.
- **Redirecciones**: `next.config.js` (canónica apex→www en 308, ~30 alias legacy WordPress) + middleware (árbol B→A, combos no indexables→servicio padre en un solo salto).
- **Programático**: matriz ciudad×servicio con copy curado y validador (`pnpm validate-ciudad`); landings keyword dedicadas; comparativas `/vs/*`. Enlazado interno automático vía `lib/internal-linking.ts`.
- **GSC**: crons de indexing (diario) y analytics (semanal) leyendo `lib/data/recently-updated.json`; constantes en `lib/seo/search-console.ts`.

Reglas: cada página nueva indexable lleva H1 único con keyword, meta description ~140-160 caracteres, canonical, OG image y schema relevante; slugs en minúsculas con guiones consistentes con la taxonomía; alt text descriptivo; no crear páginas programáticas de baja calidad ni contenido duplicado (validar overlap); cambios de URL con redirect permanente; actualizar `recently-updated.json` cuando se publique o cambie una URL relevante.

## 16. Local SEO and coverage

- Cobertura declarable: solo las 10 ciudades de `lib/data/ciudad-data.ts` (las mismas de `areaServed` en `LocalBusinessSchema`). No declarar presencia física ni cobertura no respaldada.
- Datos locales (delitos, población, industria) solo desde `ciudades-dataset.ts` con fuente oficial (INE, CEAD, etc.); sin fuente → no publicar.
- NAP consistente desde `companyStats` (dirección Las Condes en `LocalBusinessSchema`).
- Cada página de ciudad debe tener contenido único (validador de 5-gramas) e interlinking hacia servicios e industrias relevantes.

## 17. OPAI integration and positioning

- **Relación real**: OPAI es el ERP/CRM propio de Gard (`opai.gard.cl`). Técnicamente es el backend de todos los formularios (§14); comercialmente es el diferenciador tecnológico (secciones en home, `/tecnologia-seguridad`, `/control-rondas-gps`, `/portal-cliente`, `/vs/*`; imágenes anonimizadas en `lib/data/opai-images.ts`).
- Gard se presenta como empresa de seguridad; OPAI como capacidad tecnológica diferenciadora, nunca como producto separado que compite con el mensaje principal.
- Beneficios de OPAI: concretos y verificables (rondas GPS, reportería, supervisión), sin promesas no respaldadas.
- No exponer información interna del ERP (las capturas están anonimizadas por Ley 19.628 — mantenerlo).
- Mantener coherentes nombres, enlaces y mensajes de OPAI entre páginas; no cambiar endpoints ni payloads (`app/config/api.ts`, `lib/opaiPayload.ts`) sin instrucción explícita.

## 18. Recruitment

- Flujo real: `/reclutamiento` → postulación express → OPAI (`postulacion-express`, con token) + CTA WhatsApp RRHH `56956062246`. FAB móvil `RecruitFloatingCTA` (evento `recruit_cta_click`, oculto en páginas de conversión comercial).
- Datos personales mínimos (nombre, RUT, teléfono, comuna, OS10); RUT validado y normalizado; duplicados manejados por 409.
- Atribución de origen propia (`deriveSource`: whatsapp, referido_guardia, google_ads, meta_ads, etc.; `ref=adm_*` identifica reclutador).
- Subida de archivos/documentos: endpoints definidos (`POSTULACION_UPLOAD`, `POSTULACION_DOC_TYPES`) pero el flujo completo vive en OPAI.
- No mezclar postulantes con leads comerciales (ni endpoint, ni WhatsApp, ni eventos). No registrar datos personales en analítica.

## 19. Legal and privacy

- Páginas reales: grupo `(legal)` — `codigo-etica`, `ley-karin` (con formulario de denuncia), `programa-cumplimiento`, `politica-de-privacidad`, `politica-derechos-humanos`, `terminos-de-servicio` — más las sueltas legacy `privacidad`, `terminos`, `politica-ambiental`.
- Canal de denuncias: `LeyKarinDenunciaForm` (modo anónimo disponible, evidencia vía upload a OPAI). Preservar el anonimato y no añadir tracking con PII a ese flujo.
- Cookies/consentimiento: banner y modal en `app/components/cookie/`, contexto en `app/context/ConsentContext.tsx`; los scripts de analítica dependen del consentimiento.
- Referencias normativas usadas en contenido: Ley Karin, Ley 19.628, Ley 20.393, Ley 21.659, OS10.
- No presentar redacción legal como asesoría definitiva; cambios sustantivos a textos legales requieren revisión profesional del usuario.

## 20. Frontend and UX

- Respetar el sistema visual: clases `gard-*`, tokens `--gard-*`, alternancia de fondos por sección, hero full-width, `py-16 md:py-24`, contenedor `max-w-7xl mx-auto px-4` (reglas en `.cursor/rules/design.mdc`).
- Reutilizar componentes existentes (`components/ui/`, `GardHero`, `CtaFinal`, `FaqSection`) antes de crear nuevos.
- Modo claro/oscuro obligatorio en todo componente (next-themes por clase; default dark).
- Controlar estados loading, empty, error y success en todo lo interactivo.
- CTA claros y consistentes (cotizar como acción primaria); no degradar los flujos de conversión.
- Imágenes optimizadas por Cloudflare (variant/quality correctos, `sizes` apropiado, `priority` solo above-the-fold); minimizar JavaScript de cliente (server components, `optimizePackageImports` ya configurado).
- Evitar regresiones visuales: revisar las páginas que comparten el componente tocado.

## 21. Responsive

Validar en móvil pequeño (~360px), móvil grande, tablet y desktop. Revisar: navegación/menú, hero, formularios (cotizador multistep incluido), cards y grillas, carrusel de logos, FAQs (accordions), footer, imágenes, elementos sticky/flotantes (`RecruitFloatingCTA` es solo móvil; `ExitIntentPopup` solo desktop ≥768px), saltos de línea de titulares y áreas táctiles (~44px mínimo). No resolver desktop creando regresiones móviles: la prioridad es mobile.

## 22. Accessibility

HTML semántico y jerarquía de encabezados correcta; navegable por teclado con focus visible (existe skip-link en el layout — preservarlo); labels asociados en todos los campos; errores de formulario perceptibles y asociados al campo; contraste AA en ambos temas; alt text real en imágenes; modales/popups con manejo de foco y cierre por teclado; orden del contenido lógico; targets táctiles suficientes; respetar `prefers-reduced-motion` en animaciones Framer Motion cuando se agreguen nuevas.

## 23. Analytics

- Stack: GTM + GA4 tras consentimiento (`GoogleTagManager.tsx`, `ConsentAwareScript.tsx`), Vercel Analytics/Speed Insights, Zoho SalesIQ. Guía de nomenclatura: `docs/GUIA_EVENTOS_GTM_GARD.md` (documento de diseño; no todos sus eventos están implementados).
- Eventos implementados (dataLayer): `pageview`, `form_submission` (helper `trackFormSubmission`), `cotizacion_submit`, `cotizar_exposure`, `cotiz_step_completed`, `cotiz_step_exposure`, `cotiz_submit`, `cotiz_partial_lead_detected/resumed/dismissed`, `recruit_cta_click`, `exit_intent_shown/dismissed/converted`, `scroll_depth`, `time_on_page`; tipos para `click_whatsapp`, `click_phone`, `click_email`, `click_cta_*`, `view_categoria_*` en `app/components/EventTracker.tsx`.
- A/B testing activo `cotizar_form` (control vs multistep): cookie en middleware, helpers `lib/ab-testing*.ts`, guía en `docs/ab-testing.md`. No romper la asignación ni el header `no-store` de `/cotizar`.
- Reglas: mantener los eventos existentes al tocar formularios/CTA; no duplicar eventos; no enviar PII al dataLayer; nuevos eventos siguen la convención `[acción]_[elemento]_[detalle]`.

## 24. Performance

- Core Web Vitals vigilados por Lighthouse CI (`lighthouserc.json`, workflow en PRs) y Vercel Speed Insights.
- Imágenes: Cloudflare Images con webp/avif, `minimumCacheTTL` 24 h; lazy por defecto, `priority` solo en hero.
- Fuentes: `next/font` con `display: swap` — no agregar fuentes externas por CSS.
- JavaScript: preferir server components; scripts de terceros solo diferidos y tras consentimiento; `splitChunks` vendor ya configurado.
- Caché: headers globales `stale-while-revalidate` en `next.config.js`; `/cotizar` es deliberadamente `no-store` (A/B) — no "optimizarlo".
- Mantener SSG/ISR: no introducir `force-dynamic` ni acceso a request en páginas estáticas sin necesidad justificada.

## 25. Security

- Headers y CSP completos en `next.config.js` (HSTS, X-Frame-Options DENY, Permissions-Policy, CSP con allowlist de dominios). Si un cambio requiere un dominio nuevo (script/frame/connect), añadirlo explícitamente a la CSP y mencionarlo en el resultado.
- Validar y sanitizar entradas de usuario client-side; recordar que la validación autoritativa está en OPAI. Mantener honeypots.
- No hay rate limiting/captcha en este repo — no eliminar las defensas existentes (honeypot, reintentos limitados).
- El slug del blog se sanitiza contra path traversal en `lib/blog.ts` — preservar.
- **Nunca** commitear credenciales ni secretos: GSC service account va en GitHub Secrets; solo variables `NEXT_PUBLIC_*` son públicas por diseño. No exponer datos internos (p. ej. `activeClients` en `company-stats.ts` está marcado como dato interno, no renderizar).
- No registrar datos personales en logs ni en analítica. Dependencias nuevas: mínimas y justificadas.

## 26. Testing and validation

No hay framework de tests ni E2E configurado (`pnpm test` es un placeholder). Validación real disponible, en este orden adaptable al alcance:

1. Pruebas dirigidas — No identificado en el repositorio (no existen; validar manualmente el flujo tocado).
2. `pnpm typecheck`
3. `pnpm lint` (el build lo ignora, correrlo aparte)
4. `pnpm build` (debe pasar sin errores ni warnings nuevos; verifica SSG/ISR y metadata)
5. Integración: probar flujos contra dev (`pnpm dev`); para leads existe `node scripts/test-opai-lead.js` (envía un lead real de prueba a OPAI — usar con criterio)
6. End-to-end — No identificado en el repositorio
7. Revisión visual de las páginas afectadas (ambos temas)
8. Responsive (§21)
9. Accesibilidad (§22)
10. SEO: metadata/canonical/schema de las páginas tocadas; si se tocó schema.org, validar en validator.schema.org; contenido ciudad → `pnpm validate-ciudad`
11. Formularios y analítica: envío, estados, eventos dataLayer
12. Rendimiento: no introducir regresiones (Lighthouse CI corre en el PR)

No declarar una tarea completa sin ejecutar las validaciones que apliquen.

## 27. Git and change management

- Rama principal: `main` (deploy automático a Vercel). No commitear directo a `main`; trabajar en ramas de feature.
- Convención de commits: `tipo(scope): descripción` (ej. `fix(seo): ...`, `feat(cotizador): ...`).
- Mantener cambios acotados a la tarea; revisar el diff completo antes de commitear; no sobrescribir cambios del usuario.
- No hacer force push, commits, merges ni despliegues salvo instrucción explícita.
- No modificar `app/sitemap.xml/route.ts`, redirects ni URLs indexadas sin declararlo explícitamente en el resultado.

## 28. Destructive actions

Antes de cualquier acción destructiva (borrar archivos/rutas, cambiar URLs indexadas, tocar producción, DNS, hosting, analítica, formularios/endpoints OPAI, secretos, servicios externos, despliegues): verificar entorno y objetivo, alcance exacto, existencia de respaldo, plan de rollback y autorización explícita del usuario. Eliminar una página indexada exige redirect permanente y actualización de sitemap. Nunca eliminar archivos sin confirmación.

## 29. Definition of done

Una tarea termina solo cuando: el comportamiento pedido está implementado; la causa raíz está resuelta; conversión y contenido quedaron preservados; SEO, responsive, accesibilidad y seguridad fueron consideradas según el alcance; las validaciones aplicables fueron ejecutadas; el diff fue revisado; no hay cambios ajenos al alcance; y se informaron los riesgos materiales.

## 30. Final response format

Al cerrar una tarea, informar con esta estructura:

### Implementado
### Validación
### Archivos principales
### Riesgos o pendientes

## 31. Verified project facts

| Área | Implementación verificada | Fuente |
|---|---|---|
| Framework | Next.js 15.0.7, App Router, TS strict, pnpm | `package.json`, `tsconfig.json` |
| Renderizado | SSG (`servicios`, combos allowlist con `dynamicParams=false`, ciudad×servicio, blog), ISR 1 h (`industrias/[slug]`), ISR 24 h (sitemap, llms.txt) | exports en cada `page.tsx`/`route.ts` |
| Dominio canónico | `https://www.gard.cl` (apex → www en 308) | `next.config.js`, `app/metadata.ts` |
| Backend forms | OPAI `https://opai.gard.cl` — `/api/public/gard/{leads,messages,postulacion-express}` + `/api/public/config`; fetch directo del cliente, sin API routes propias | `app/config/api.ts`, forms en §14 |
| Comandos | `pnpm dev/build/start/lint/typecheck/validate-ciudad/gsc-*`; sin tests ni formatter | `package.json` |
| Contenido | Datos en TS (`lib/data/`, `app/data/`), blog en markdown local (`docs/blog_posts/`, ~93 posts), sin CMS ni BD en el repo | `lib/blog.ts`, `lib/data/` |
| Cifras | Fuente única `companyStats` (fundada 2022, 10 ciudades, GMB 4.9/57 reseñas, etc.) | `lib/data/company-stats.ts` |
| Formularios | Cotización (2 variantes A/B) + cotizador inteligente + contacto + postulación express + denuncias Ley Karin; honeypot; éxito inline | §14 |
| Analítica | GTM `GTM-W9QM4NMC` + GA4 `G-4XJ2YKYYDH` con consentimiento; Vercel Analytics/Speed Insights; Zoho SalesIQ; eventos en §23 | `app/components/`, `.env.example` |
| A/B | Experimento `cotizar_form` vía cookie `gard_ab_cotizar_form` (middleware, 50/50, 90 días) | `middleware.ts`, `lib/ab-testing*.ts` |
| SEO | Metadata API por página (canonical propio), sitemap/robots/llms.txt como route handlers, schemas JSON-LD (`components/seo/`), redirects 308 masivos, allowlist de combos, interlinking automático | §15 |
| Hosting/CI | Vercel (gru1, deploy por Git) + GitHub Actions (build, Lighthouse, site-audit, crons GSC diario/semanal) | `vercel.json`, `.github/workflows/` |
| Integraciones externas | OPAI, Cloudflare Images/Stream, Google Maps/Places, GTM/GA4, Zoho SalesIQ, Google Search Console API, Hotjar y Google Ads permitidos en CSP | `next.config.js`, `app/config/api.ts` |
| No identificado en el repositorio | Framework de tests, E2E, formatter, base de datos propia, CMS, envío de email desde el repo, rate limiting/captcha propio | — |
