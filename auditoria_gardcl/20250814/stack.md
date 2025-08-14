### Stack y arquitectura

- **Framework**: Next.js 14 (App Router) detectado por estructura `app/` y dependencias.
- **Runtime**: Node 18+, TypeScript 5.3.
- **UI**: TailwindCSS 3.4 con darkMode por clase, `tailwind-merge`, `tailwindcss-animate`.
- **Hosting**: Vercel (archivo `vercel.json` presente) y `@vercel/analytics` / `@vercel/speed-insights`.
- **Imágenes**: Cloudflare Images mediante componente `components/CloudflareImage.tsx`.
- **Rutas**: `app/` con múltiples rutas (`blog`, `servicios`, `ciudades`, etc.), `middleware.ts` presente.
- **SEO**: `next-seo`, múltiples `generateMetadata.ts` y `metadata.ts` por ruta.

#### Observaciones preliminares
- Revisar `next.config.js` para `images.domains`, `headers`, `redirects`, `experimental` (RSC/optimizePackageImports), y compresión.
- Verificar `middleware.ts` para redirecciones, cookies y geo.
- Confirmar política de fuentes en `app/fonts.ts` y preloads.
