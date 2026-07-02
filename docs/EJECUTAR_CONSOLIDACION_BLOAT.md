# EJECUTAR — Consolidación del bloat servicio×industria (gard.cl)

> **Ejecución:** Claude Code, autónomo, fase por fase con build verde entre fases. Commits separados por fase. Cierre en **PR hacia main** (no merge directo).
> **Contexto verificado en main:** existen DOS árboles de rutas paralelos para las mismas combinaciones — Árbol A `app/servicios/[slug]/[industria]/page.tsx` (dinámico, canonical a sí mismo) y Árbol B `app/servicios-por-industria/[servicio]/[industria]/page.tsx` (estático, matriz completa ~9 servicios × ~41 industrias filtrada por un validador permisivo). Solo **6 combinaciones** tienen contenido único en `servicioIndustriaDataMap`; el resto renderiza plantilla con ~89% de solapamiento léxico (riesgo doorway) y duplica contenido entre árboles.
> **Diseño destino:** UN solo árbol público (A), indexable = SOLO combinaciones con contenido único real, todo lo demás 301 al servicio padre. La lista de indexables se deriva del dataMap: agregar contenido único = publicar página; sin contenido único no existe página. Esto supersede la Fase 1 del EJECUTAR_SEO_P0 (soft-404s de drones).

## Objetivo medible
- Páginas estáticas del build: baseline actual (~484) → reducción de ~150-190 páginas
- Sitemap: sin ninguna URL `/servicios-por-industria/`
- Toda combinación NO indexable responde **301** (nunca 200 con plantilla, nunca soft-404)
- Cero enlaces internos hacia URLs redirigidas

---

## FASE 0 — Baseline
```bash
git checkout -b feat/consolidacion-servicio-industria
pnpm build 2>&1 | grep -E "Generating static pages" | tail -1   # anotar el total como BASELINE
curl -s https://www.gard.cl/sitemap.xml | grep -c "<loc>"        # anotar URLs sitemap
```

## FASE 1 — Fuente única de combinaciones indexables

**1.1** En `app/data/servicios-por-industria.ts`, AGREGAR contenido único para la combinación que ya rankea pero no tiene entrada (auditoría Semrush: eventos rankea): nueva key `"guardias-de-seguridad__eventos-y-espectaculos"` en `servicioIndustriaDataMap`, con la misma estructura de las existentes (description 60-90 palabras específica de eventos masivos/control de accesos/aforos, 3 desafios, 3 soluciones, 1 casoExito verosímil SIN cifras inventadas de clientes reales, 4 beneficios; omitir `featuredImageId` si no hay UUID real). Redactar contenido genuinamente distinto — cero copy-paste de otras entradas.

**1.2** Crear `lib/data/combosIndexables.ts` (archivo liviano, importable desde middleware/edge):
```ts
// Fuente de verdad de combinaciones servicio×industria PÚBLICAS.
// Regla: solo entra aquí lo que tiene entrada con contenido único en
// servicioIndustriaDataMap (app/data/servicios-por-industria.ts).
// El gate de la Fase 6 verifica esa sincronía.
export const COMBOS_INDEXABLES: readonly string[] = [
  'guardias-de-seguridad__mineria',
  'guardias-de-seguridad__retail',
  'guardias-de-seguridad__sector-financiero',
  'guardias-de-seguridad__centros-comerciales',
  'guardias-de-seguridad__eventos-y-espectaculos',
  'seguridad-electronica__centros-de-datos',
  'drones-seguridad__sector-energetico',
  // Página estática dedicada ya existente (no tocar):
  'prevencion-intrusiones__parques-industriales',
] as const;

export const esComboIndexable = (servicio: string, industria: string) =>
  COMBOS_INDEXABLES.includes(`${servicio}__${industria}`);
```

**1.3** En `app/data/servicios-por-industria.ts`, REEMPLAZAR el cuerpo de `esCombinacionValida` (hoy permisivo-por-defecto) por la regla estricta:
```ts
// OLD (localizar exacto):
export function esCombinacionValida(servicioSlug: string, industriaSlug: string): boolean {
  // Buscamos la industria en nuestro mapa de servicios por industria
  const industriaConfig = serviciosPorIndustria.find(item => item.industria === industriaSlug);

  // Si la industria no tiene configuración explícita, permitimos todos los servicios
  if (!industriaConfig) {
    return true;
  }

  // Si hay configuración para la industria, verificamos si el servicio está en la lista
  return industriaConfig.servicios.includes(servicioSlug);
}

// NEW:
import { esComboIndexable } from '@/lib/data/combosIndexables';
export function esCombinacionValida(servicioSlug: string, industriaSlug: string): boolean {
  // Estricto: solo son válidas las combinaciones con contenido único publicado.
  return esComboIndexable(servicioSlug, industriaSlug);
}
```
(El import va al tope del archivo; si `@/` no resuelve en ese contexto, usar ruta relativa.)

**Checkpoint F1:** `pnpm tsc --noEmit` verde. Commit: `feat(seo): allowlist estricta de combos servicio-industria + contenido eventos`.

## FASE 2 — Árbol A pasa a estático y cerrado

En `app/servicios/[slug]/[industria]/page.tsx`:
- AGREGAR (no existe hoy):
```ts
import { COMBOS_INDEXABLES } from '@/lib/data/combosIndexables';

export const dynamicParams = false;

export function generateStaticParams() {
  return COMBOS_INDEXABLES
    .filter((c) => c !== 'prevencion-intrusiones__parques-industriales') // esa ruta es estática dedicada
    .map((c) => {
      const [slug, industria] = c.split('__');
      return { slug, industria };
    });
}
```
- El `notFound()` existente por `!esCombinacionValida` se mantiene (doble cinturón).

**Checkpoint F2:** `pnpm build` verde; en el output deben aparecer exactamente las 7 rutas de A. Commit: `feat(seo): arbol A estatico con allowlist y dynamicParams=false`.

## FASE 3 — 301s: unificar árboles y matar doorways

**3.1** En `next.config.*` dentro de `redirects()`, AGREGAR al inicio del array:
```js
// Árbol B (legacy) → Árbol A: conserva equity de las ~184 URLs históricas
{
  source: '/servicios-por-industria/:servicio/:industria',
  destination: '/servicios/:servicio/:industria',
  permanent: true,
},
{
  source: '/servicios-por-industria/:servicio',
  destination: '/servicios/:servicio',
  permanent: true,
},
{ source: '/servicios-por-industria', destination: '/servicios', permanent: true },
```

**3.2** En `middleware.ts`, AGREGAR manejo para combos NO indexables del árbol A (llegan por 3.1 o por enlaces externos viejos): si el path matchea `/servicios/{slug}/{industria}` (dos segmentos tras /servicios/, sin extensión) y `!esComboIndexable(slug, industria)` → `NextResponse.redirect` **308/301 permanente** a `/servicios/{slug}`. Importar SOLO desde `lib/data/combosIndexables` (liviano, edge-safe). Respetar el matcher/estructura existente del middleware; no romper redirects previos.

**3.3** ELIMINAR el árbol B completo: `git rm -r app/servicios-por-industria/`.

**Checkpoint F3:** `pnpm build` verde. Pruebas locales (`pnpm start` o dev):
```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" localhost:3000/servicios-por-industria/guardias-de-seguridad/mineria   # 308→/servicios/guardias-de-seguridad/mineria
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" localhost:3000/servicios/drones-seguridad/retail                        # 308→/servicios/drones-seguridad
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/servicios/guardias-de-seguridad/mineria                                   # 200
```
Commit: `feat(seo): 301 arbol legacy y combos sin contenido unico; elimina arbol B`.

## FASE 4 — Sitemap limpio

En `app/sitemap.xml/route.ts`: ELIMINAR toda emisión de URLs `/servicios-por-industria/...`; la sección servicio×industria queda SOLO con las 8 combinaciones de `COMBOS_INDEXABLES` bajo `/servicios/{slug}/{industria}` (priority 0.7, monthly). Las landings `/industrias/[slug]` NO se tocan en este EJECUTAR.

**Checkpoint F4:** build + inspección del XML generado: `grep -c "servicios-por-industria"` en la salida = 0. Commit: `feat(seo): sitemap sin arbol legacy, solo combos indexables`.

## FASE 5 — Enlaces internos

```bash
grep -rn "servicios-por-industria" app components lib --include="*.tsx" --include="*.ts" | grep -v "app/data/servicios-por-industria.ts" | grep -v "next.config"
```
Para CADA resultado: reescribir el enlace al árbol A si el combo es indexable, o al servicio/industria padre si no. En `app/components/IndustriasGridPage.tsx`: los links de servicios por industria deben generarse SOLO para combos indexables (filtrar con `esComboIndexable`); las industrias sin combo indexable enlazan a `/industrias/{slug}`.

**Checkpoint F5:** el grep anterior devuelve 0 resultados fuera de data/config. Commit: `fix(seo): enlaces internos solo a combos indexables`.

## FASE 6 — Gates de aceptación (bloqueantes)

```bash
# Sincronía dataMap ↔ allowlist (excepto la estática dedicada):
node -e "const m=require('fs').readFileSync('app/data/servicios-por-industria.ts','utf8');const keys=[...m.matchAll(/\"([a-z-]+__[a-z-]+)\":/g)].map(x=>x[1]);const {COMBOS_INDEXABLES}=require('./lib/data/combosIndexables.ts');" 2>/dev/null || echo "verificar sincronía manualmente: keys del dataMap ⊆ COMBOS_INDEXABLES y viceversa (menos prevencion-intrusiones__parques-industriales)"
grep -c "__" lib/data/combosIndexables.ts                                    # 8
pnpm tsc --noEmit && pnpm build                                              # verde; anotar total de páginas vs BASELINE (esperado: −150 a −190)
grep -rn "servicios-por-industria" app components lib --include="*.tsx" | grep -v "data/servicios-por-industria.ts" | wc -l   # 0
```

## FASE 7 — PR

Abrir PR hacia main titulado `SEO: consolidación servicio×industria (un árbol, allowlist, 301s)` con: BASELINE vs páginas finales, URLs eliminadas del sitemap, tabla de 301s de muestra, y este checklist post-merge para Carlos:
- [ ] GSC: Inspección de URL sobre 3 URLs legacy `/servicios-por-industria/...` → confirmar que Google ve el 301
- [ ] GSC: solicitar reindexación de las 8 combinaciones indexables
- [ ] Semrush Site Audit: recrawl y confirmar caída de páginas duplicadas/thin
- [ ] Vigilar GSC 2 semanas: si alguna URL eliminada tenía impresiones reales, evaluar sumarla al dataMap con contenido único (nunca revivirla como plantilla)
