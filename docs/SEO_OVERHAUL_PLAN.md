# Plan de Transformación SEO · Gard Security · 90 días

> **Objetivo**: pasar de "bien rankeado en un rubro sin competencia digital seria" a **líder indiscutido en SEO de seguridad privada en Chile**, con un foso de contenido + autoridad que tome 2-3 años replicar.
>
> **Principio rector**: cirugía, no demolición. No se rehace el sitio desde cero.
>
> **Stack fijo**: Next.js 15 · Vercel · GitHub (`Cryptobal/gard-page-web`) · Cloudflare Images · Cowork (automatización nocturna).

---

## 0. Cómo usar este plan

1. Commitealo al repo como `/docs/SEO_OVERHAUL_PLAN.md` — es tu tablero vivo.
2. Cada tarea tiene: **Objetivo**, **Archivos afectados**, **Prompt ejecutable** (copy-paste literal), **Definition of Done** (DoD).
3. Marcá tareas con `[x]` a medida que las cerrás. Hacé commit al cerrar cada una.
4. Las fases son secuenciales en dependencias duras. Dentro de cada fase podés paralelizar.
5. Los prompts están pensados para **Claude Code** (corriendo localmente en tu repo) o **Cowork** (workflows nocturnos). Siempre está indicado cuál.

---

## 1. Decisiones bloqueantes (resolver ANTES de Fase 1)

No podés arrancar sin estos datos. Te toma **30 minutos**. Completá los valores acá mismo y commiteá el archivo.

```yaml
# === DATOS DE EMPRESA — FUENTE ÚNICA DE VERDAD ===
empresa:
  anios_experiencia: ___        # el número REAL. Si dudas, pon el menor.
  guardias_activos: ___         # dotación actual promedio
  clientes_activos: ___         # contratos vigentes (no históricos)
  ciudades_cobertura: 10
  guardias_os10_pct: ___        # % del plantel con OS10 vigente
  central_monitoreo: true
  anio_fundacion: ___

reviews_reales:
  google_my_business_count: ___
  google_my_business_rating: ___
  trustpilot: false            # o true + rating
  otras_verificables: ___

testimonios_con_consentimiento:
  # Lista nombres de contactos de clientes que aceptarían aparecer con
  # foto + cargo + empresa. Mínimo 3, ideal 5.
  - nombre: ___
    empresa: ___
    cargo: ___
    foto_disponible: ___
  - ___

competencia_observada:
  # Qué empresa chilena de seguridad está haciendo SEO más agresivo hoy
  # (que no sea Prosegur/G4S/Securitas). Requiere 20 min de búsqueda.
  - ___
```

**Regla de oro**: si no tenés un dato, no lo inventes. Ponlo menor y real. E-E-A-T premia honestidad verificable.

---

## 2. Fase 0 · Setup (Día 0 · 2 h)

### 0.1 · Branch y protecciones

```bash
# En tu terminal, dentro del repo local
git checkout main
git pull
git checkout -b seo-overhaul-2026
git push -u origin seo-overhaul-2026
```

Luego en GitHub: Settings → Branches → Require PR para `main`. Todo pasa por PR desde `seo-overhaul-2026` o feature branches derivadas.

### 0.2 · Checklist de entorno Cowork

- [ ] Workflow nocturno tiene acceso a `ANTHROPIC_API_KEY` (para generación de contenido con Claude API)
- [ ] Tiene credenciales de GitHub con permiso de push a `Cryptobal/gard-page-web`
- [ ] Tiene acceso a Google Search Console API (para 4.3)
- [ ] Log de runs accesible (para auditar qué generó cada noche)

### 0.3 · Baseline de métricas (fotografía del antes)

Anota en `/docs/seo-baseline-2026-04.md`:

- Top 20 keywords rankeadas en GSC últimos 28 días (CTR + posición + impresiones)
- Lighthouse mobile score de: `/`, `/santiago/guardias-de-seguridad`, `/guardias-de-seguridad-privada-para-empresas`, `/blog`
- Número de URLs indexadas según GSC
- Backlinks según Ahrefs (dominios referentes, DR)

Esto es tu línea base. Sin esto, no podés demostrar progreso en 90 días.

---

## 3. Fase 1 · Parar la hemorragia (Semanas 1-2)

**Meta**: eliminar inconsistencias E-E-A-T y claims riesgosas. Nada nuevo todavía.

---

### Tarea 1.1 · Fuente única de verdad para stats

**Problema**: tres cifras distintas de años de experiencia en el mismo sitio (8, 10, 15). Cifras de clientes/guardias también inconsistentes.

**Archivos afectados**: crear `/lib/data/company-stats.ts`, refactorizar ~12 referencias.

**Prompt para Claude Code** (copy-paste):

```
Contexto: estoy limpiando inconsistencias de E-E-A-T en gard.cl. Hoy hay
tres números distintos de "años de experiencia" en el sitio (8+, 10+, 15+).
Esto daña mi autoridad ante Google.

Tarea:
1. Crear /lib/data/company-stats.ts con esta estructura (TypeScript, exportando
   un objeto const readonly tipado):

   export const companyStats = {
     yearsExperience: <VALOR>,         // USAR: <<<PEGAR EL VALOR DECIDIDO>>>
     activeGuards: <VALOR>,
     activeClients: <VALOR>,
     citiesCovered: 10,
     os10CertifiedPct: <VALOR>,
     foundedYear: <VALOR>,
     monitoringCenter247: true,
   } as const;

   export type CompanyStats = typeof companyStats;

2. Buscar TODAS las referencias hardcodeadas en el repo a los valores viejos:
   "8+ Años", "más de 10 años", "más de 15 años", "50+ Clientes", "200+ guardias",
   "8+", "10+", "15+", etc. Usa ripgrep o similar.
   Listámelas primero antes de modificar nada.

3. Una vez confirmada la lista conmigo, reemplazar cada hardcoded por una
   importación desde '/lib/data/company-stats.ts'. Ejemplo:
     Antes: "Más de 10 años de experiencia"
     Después: `Más de ${companyStats.yearsExperience} años de experiencia`

4. Incluir las metadata (meta description de páginas) y el llms.txt si hay
   números repetidos ahí también.

5. Al terminar, correr `npm run build` y verificar que no rompió tipos ni nada.

6. Commit con mensaje: "refactor(seo): single source of truth for company stats"

NO inventes valores. Si alguno no está en el config que te pasé, preguntá.
```

**Definition of Done**:
- [ ] Archivo `company-stats.ts` existe y está tipado
- [ ] `grep -r "más de 10 años"` (y variantes con 8, 15) devuelve 0 resultados fuera del stats file
- [ ] Build verde
- [ ] PR abierto, reviewed, merged

---

### Tarea 1.2 · Auditar AggregateRating schema

**Problema**: el schema JSON-LD del homepage declara `AggregateRating`. Si las estrellas no están respaldadas por reviews verificables, Google puede aplicar manual action por spam de rich results.

**Decisión binaria**:

- **Opción A — Tenés reviews reales en GMB (≥5 reviews, ≥4.0 avg)**: implementar correctamente con los números exactos y mantener el schema.
- **Opción B — No tenés o son pocas**: remover el schema HOY y activar una campaña de pedido de reviews.

**Prompt para Claude Code (Opción A)**:

```
Tarea: auditar y corregir el schema AggregateRating del sitio.

1. Encontrar dónde se genera el JSON-LD con @type "AggregateRating". Probablemente
   en /app/layout.tsx, /app/page.tsx o un componente de SEO en /components/.

2. Reemplazar los valores actuales con:
     ratingValue: <<<AVG_REAL_DE_GMB>>>
     reviewCount: <<<COUNT_REAL_DE_GMB>>>
     bestRating: "5"
     worstRating: "1"

3. Agregar un link desde la página de "Sobre Nosotros" hacia la ficha GMB
   para que Google pueda cross-validar.

4. Commit: "fix(seo): align aggregateRating schema with real GMB reviews"
```

**Prompt para Claude Code (Opción B — más seguro)**:

```
Tarea: remover AggregateRating schema del sitio completo.

1. Buscar todas las ocurrencias de "AggregateRating" en el repo.
2. Remover el bloque completo (conservar el resto del JSON-LD).
3. Verificar con https://validator.schema.org/ después del deploy que el
   schema sigue válido pero sin AggregateRating.
4. Commit: "fix(seo): remove unverified AggregateRating schema to avoid spam risk"
```

**Definition of Done**:
- [ ] Opción elegida y ejecutada
- [ ] Validator.schema.org da verde sobre el homepage
- [ ] Si Opción A: link a GMB desde "Sobre Nosotros" activo
- [ ] Si Opción B: campaña de reviews iniciada (ver 1.2.bis)

### Tarea 1.2.bis · Campaña de reviews GMB (solo si elegiste Opción B)

**Prompt para email a clientes actuales** (no es prompt de código, es texto a enviar):

```
Asunto: Una pequeña ayuda que vale oro para nosotros

Hola [Nombre],

Estamos mejorando nuestra presencia digital y una review honesta tuya en Google
nos ayuda muchísimo — más que cualquier campaña pagada que podamos hacer.

Te tomará 60 segundos: [LINK DIRECTO A GMB REVIEW]

Si algo no está 100%, decímelo a mí primero antes de la review. Prefiero
arreglarlo que perderte como cliente.

Gracias,
[Tu nombre]
```

Meta: **10 reviews reales en 3 semanas**. Con eso sí podés reactivar el schema en sprint 3.

---

### Tarea 1.3 · Reemplazar testimonios falsos

**Problema**: los testimonios actuales ("Confían en nuestra seguridad operacional", "Valoraron nuestra cobertura nacional 24/7") parecen generados. Para una empresa de seguridad, destruyen confianza.

**Plan**:

1. Enviar email a los 3-5 clientes del config inicial pidiendo:
   - Quote real de 2-3 frases
   - Foto profesional del contacto (LinkedIn sirve)
   - Permiso escrito para usar logo + quote en web

2. Mientras llegan, **remover los testimonios falsos del homepage**. Un testimonio falso daña más de lo que aporta.

**Prompt para email a clientes** (texto):

```
Asunto: ¿Me ayudás con un testimonio para la web?

Hola [Nombre],

Estoy actualizando la sección de "Clientes" de gard.cl y me gustaría mucho que
apareciera tu voz real, no un texto genérico que haga mi equipo.

Te mando tres preguntas cortas. Respondé como hablarías vos, no como un
comunicado:

1. ¿Qué problema concreto te ayudamos a resolver?
2. ¿Qué es lo que más valorás del servicio hoy?
3. Una oración que le dirías a otro gerente de operaciones evaluando contratarnos.

Te paso después a aprobar cualquier texto antes de publicar. ¿Te sirve una foto
profesional tuya (basta con la de LinkedIn)?

Gracias,
[Tu nombre]
```

**Prompt para Claude Code (remover falsos ahora, componer estructura para los reales cuando lleguen)**:

```
Tarea: modernizar la sección de testimonios.

1. Encontrar el componente que renderiza los testimonios en homepage
   (probablemente /components/testimonials/ o similar).

2. Crear /lib/data/testimonials.ts con esta estructura:

   export type Testimonial = {
     id: string;
     clientName: string;          // persona
     clientRole: string;          // cargo
     companyName: string;
     companyLogo: string;         // path a Cloudflare image
     quote: string;               // 2-3 frases MÁXIMO, en primera persona
     photoUrl?: string;
     industry: string;
     verified: true;              // solo publicamos verificados
   };

   export const testimonials: Testimonial[] = [
     // VACÍO POR AHORA. Se llena solo cuando llegan los testimonios reales.
   ];

3. Modificar el componente para que, si testimonials.length === 0, muestre
   únicamente una grilla de LOGOS de clientes con una heading que diga:
   "Empresas que ya confían en nosotros". Sin quotes inventados.

4. Cuando testimonials.length >= 3, mostrar testimonios con foto + quote + cargo.

5. Commit: "fix(seo): remove fabricated testimonials, prepare real-testimonial schema"
```

**Definition of Done**:
- [ ] Emails enviados a mínimo 5 clientes
- [ ] Testimonios falsos removidos del live
- [ ] Estructura técnica lista para recibir los reales

---

### Tarea 1.4 · Nuevo H1 homepage + meta optimizados

**Problema**: H1 actual "Seguridad de Clase Mundial para Empresas Exigentes" tiene cero targeting de keyword principal.

**Nuevo H1** (recomendado):
> **Empresa de Seguridad Privada en Chile · Guardias OS10 con Cobertura Nacional 24/7**

**Alternativas si te parece muy largo**:
- "Guardias de Seguridad Privada para Empresas en Chile" (más corto, keyword exacta)
- "Empresa de Seguridad Privada en Chile · Guardias Certificados OS10"

**Prompt para Claude Code**:

```
Tarea: optimizar H1 y metadata del homepage para la keyword principal
"empresa de seguridad privada Chile" y secundarias "guardias de seguridad",
"guardias OS10".

1. Abrir /app/page.tsx (o donde esté el H1 del home).

2. Cambiar H1 actual ("Seguridad de Clase Mundial para Empresas Exigentes")
   por: "Empresa de Seguridad Privada en Chile · Guardias OS10 con Cobertura Nacional 24/7"

3. Agregar un subtítulo (p tag) debajo:
   "Protegemos más de [companyStats.activeClients] empresas en [companyStats.citiesCovered] ciudades con guardias certificados, monitoreo 24/7 y tecnología propia."
   (usar la companyStats que creaste en 1.1)

4. Actualizar el metadata export del app/page.tsx:
     title: "Empresa de Seguridad Privada en Chile | Gard Security"
     description: "Guardias de seguridad certificados OS10, monitoreo 24/7, drones y seguridad electrónica. [X] años protegiendo empresas en 10 ciudades de Chile. Cotización en menos de 12 horas."

5. Actualizar og:title y og:description para que coincidan.

6. Verificar que "Seguridad de Clase Mundial" todavía aparece en algún lado
   como tagline secundario si te gusta como frase, pero NUNCA como H1.

7. Commit: "feat(seo): keyword-optimized H1 and metadata on homepage"
```

**Definition of Done**:
- [ ] Nuevo H1 live
- [ ] Metadata actualizada
- [ ] Verificar en Search Console URL Inspection que Google renderiza el nuevo H1 (puede tomar 3-7 días)

---

## 4. Fase 2 · Rescatar páginas de ciudad (Semanas 3-6)

**Meta**: convertir 80 páginas de "doorway templated" en 80 páginas genuinamente únicas.

**Regla innegociable**: cada página de ciudad debe tener **mínimo 800 palabras únicas** — no sustitución de "Santiago" por "Temuco". Google detecta esa estructura en segundos.

---

### Tarea 2.1 · Dataset oficial por ciudad

Antes de generar nada, necesitás **datos reales** que solo aplican a esa ciudad. Son tu munición para que cada página sea única.

**Fuentes oficiales chilenas**:

- **Subsecretaría de Prevención del Delito** — `http://cead.spd.gov.cl/estadisticas-delictuales/` — tasa de delitos por comuna, tipos de delito (robo en lugar habitado, con violencia, con intimidación, etc.)
- **INE** — datos demográficos y económicos por región
- **Cámara Chilena de la Construcción** — obras activas por región (argumento para ofrecer seguridad de obra)
- **SONAMI** — faenas mineras por región
- **Fiscalía de Chile** — reportes de delitos económicos regionales

**Archivos afectados**: crear `/lib/data/ciudades-dataset.ts`

**Prompt para Cowork (nightly, 1 ciudad por noche · 10 noches)**:

```
Rol: eres un investigador de datos locales para una empresa de seguridad
privada chilena. Tu output se usará en páginas web públicas, así que cada
dato debe ser VERIFICABLE con fuente oficial.

Ciudad objetivo: {{CIUDAD}}
Región: {{REGION}}

Tarea: buscar y retornar en formato JSON los siguientes datos. Si un dato no
está disponible en fuente oficial, poner null. NO inventar bajo ningún concepto.

{
  "ciudad": "{{CIUDAD}}",
  "region": "{{REGION}}",
  "poblacion": <int o null>,
  "poblacion_anio": <año del dato>,
  "poblacion_fuente_url": "<URL INE>",
  "delitos_2024": {
    "robo_lugar_habitado_tasa_100k": <float o null>,
    "robo_con_violencia_tasa_100k": <float o null>,
    "hurto_tasa_100k": <float o null>,
    "comuna_mas_afectada": "<string o null>",
    "fuente_url": "<URL SPD>"
  },
  "industrias_predominantes": ["<string>", ...],
  "empresas_grandes_en_la_zona": [
    {"nombre": "<string>", "industria": "<string>"}
  ],
  "proyectos_construccion_activos": <int o null>,
  "proyectos_construccion_fuente": "<URL CChC>",
  "puntos_interes_seguridad": [
    "<string: aeropuerto/puerto/zona franca/centro logístico/etc.>"
  ],
  "particularidades_geograficas": "<string: describe en 2-3 líneas por qué
     esta ciudad tiene desafíos únicos de seguridad>",
  "regulaciones_locales_relevantes": "<string o null>"
}

Reglas:
- Todo con fuente URL. Si no tenés fuente, es null.
- No rellenes con prosa genérica tipo "ciudad importante con desafíos únicos".
  Quiero hechos.
- Tasa de delitos: usa datos 2024 o el más reciente disponible.
- Si una industria es marginal, no la pongas. Mejor 3 industrias verdaderas que 8 forzadas.

Al terminar las 10 ciudades, consolidá todos los JSON en
/lib/data/ciudades-dataset.ts exportando una const tipada.
```

**Definition of Done**:
- [ ] 10 archivos JSON generados en `/lib/data/ciudades/*.json` con datos reales + URLs de fuente
- [ ] `/lib/data/ciudades-dataset.ts` consolidado y tipado
- [ ] Spot check manual de 2 ciudades: datos coinciden con las fuentes citadas

---

### Tarea 2.2 · Plantilla de oro · Santiago primero

Regla: **no se genera por lotes hasta que UNA página esté perfecta y validada**.

**Estructura obligatoria de cada página de ciudad** (nuevo template):

1. **H1 único** con keyword principal + localización
2. **Párrafo introductorio de 120-180 palabras** con datos específicos de la ciudad (no plantilla)
3. **Sección "Panorama de seguridad en [CIUDAD]"** — tasas reales de delitos, fuente citada
4. **Sección "Industrias que protegemos aquí"** — las 3 industrias REALMENTE relevantes para esa ciudad, no las 8 genéricas
5. **Sección "Zonas de cobertura"** — comunas/sectores específicos con descripción de 2-3 líneas cada una
6. **Mini-caso de estudio** — anonimizado si hace falta, pero real ("Cliente del sector minero en Antofagasta, reducción X% en incidentes")
7. **FAQ específico** — 4-5 preguntas con respuestas particulares a esa ciudad (ej: "¿Cuánto cuesta un guardia OS10 en Santiago?" con rango real de mercado)
8. **CTA de cotización** con formulario pre-filled de ciudad

**Archivos afectados**: `/app/[ciudad]/[servicio]/page.tsx`, `/components/ciudad/*`

**Prompt para Claude Code**:

```
Tarea: reconstruir /app/[ciudad]/[servicio]/page.tsx siguiendo una nueva
estructura que elimina el patrón doorway actual.

Contexto: hoy, las 80 páginas de ciudad × servicio tienen ~89% de vocabulario
idéntico entre sí. Necesito que cada página sea genuinamente única en contenido
pero consistente en layout.

1. Refactorizar el componente para que consuma datos de:
   - /lib/data/ciudades-dataset.ts (datos que generaste en 2.1)
   - /lib/data/ciudad-data.ts (existente, industrias por ciudad)
   - /lib/data/servicio-ciudad-copy.ts (NUEVO archivo que vamos a crear abajo)

2. Crear /lib/data/servicio-ciudad-copy.ts con esta estructura:

   export type ServicioCiudadCopy = {
     ciudad: string;
     servicio: string;
     heroH1: string;              // único por combinación
     introParagraph: string;      // 120-180 palabras únicas
     panoramaSeguridad: string;   // usando datos reales de dataset
     industriasRelevantes: {
       nombre: string;
       porQueImporta: string;     // específico a ciudad + servicio
     }[];
     zonasCobertura: {
       nombre: string;
       descripcion: string;
     }[];
     casoEstudio: {
       cliente: string;           // "Empresa minera en Antofagasta"
       problema: string;
       solucion: string;
       resultado: string;         // métrica concreta
     };
     faq: { pregunta: string; respuesta: string }[];
   };

   export const servicioCiudadCopy: ServicioCiudadCopy[] = [
     // se llena con Cowork en tarea 2.3
   ];

3. Empezar SOLO con Santiago × guardias-de-seguridad.
   Yo voy a llenar el primer objeto manualmente para validar el template.

4. La página debe tener canonical, meta única, OG image.

5. Agregar schema.org @type "Service" con areaServed apuntando a la ciudad
   específica. Ejemplo:
   {
     "@type": "Service",
     "serviceType": "Guardias de Seguridad",
     "areaServed": { "@type": "City", "name": "Santiago" },
     "provider": { "@type": "LocalBusiness", "name": "Gard Security" }
   }

6. Commit: "feat(seo): new city-service page template with unique-content schema"
```

**Contenido manual para Santiago × guardias** (completa vos con ayuda de Claude Code iterando):

Objetivo: 1.200 palabras, 0% overlap con otras ciudades. Métrica: después de escribir, corré el diff que yo corrí en el análisis. Debe mostrar >40% vocabulario único vs Temuco.

**Definition of Done**:
- [ ] Template nuevo desplegado
- [ ] Santiago × guardias tiene 1.200+ palabras únicas
- [ ] Lighthouse mobile en esa URL: LCP < 2.5s, CLS < 0.1
- [ ] Submit manual en Search Console → URL Inspection → Request Indexing
- [ ] Esperar 30 días, medir posición para "guardias de seguridad santiago"

---

### Tarea 2.3 · Automatización Cowork para las 79 restantes

**No generes todas de una**. Rollout por lotes de 10 por noche, con revisión humana al día siguiente.

**Prompt maestro para Cowork (nightly)**:

```
Rol: eres un copywriter SEO senior especializado en seguridad privada en
Chile. Escribís como un periodista de negocios — concreto, con datos, sin
marketing hueco.

Input que recibís: un objeto Ciudad del dataset (/lib/data/ciudades-dataset.ts)
y un Servicio del catálogo (/app/servicios/serviceMetadata.ts).

Tu output: un objeto ServicioCiudadCopy completo en formato JSON.

Reglas INNEGOCIABLES:
1. NO usar frases plantilla tipo "plan de seguridad personalizado",
   "soluciones integrales", "protegemos lo que más importa",
   "capacitado en situaciones de riesgo". Si lo hacés, rechazo el output.
2. Cada párrafo debe referenciar al menos UN dato del objeto Ciudad
   (población, tasa de delito, industria local, geografía, fuente oficial).
3. El introParagraph debe mencionar la ciudad específica al menos 2 veces
   y contener al menos una cifra real del dataset.
4. Las 3 industrias que elijas deben ser las REALMENTE presentes en esa
   ciudad según el dataset, no las 8 genéricas.
5. El caso de estudio debe ser plausible para la industria predominante de
   la ciudad. No copies entre ciudades. Anonimizá el cliente.
6. El FAQ debe tener al menos 2 preguntas que solo tienen sentido en esa
   ciudad (ej: "¿Qué particularidades tiene la seguridad en puerto de Valparaíso?")
7. Longitud objetivo del introParagraph: 150-180 palabras. Demasiado corto
   suena thin, demasiado largo suena relleno.

Validación automática que corré después de tu output:
- Rechazo si el output compartido con otra ciudad ya generada tiene
  >50% de 5-gramas idénticos.
- Rechazo si no incluye al menos 3 datos numéricos (tasas, poblaciones, etc.)
- Rechazo si contiene cualquiera de las frases prohibidas (lista en sección 1).

Input actual:
  ciudad: {{CIUDAD_OBJ}}
  servicio: {{SERVICIO_OBJ}}

Output: JSON ServicioCiudadCopy. Nada más. Sin preámbulo.
```

**Script de validación automática** (que Cowork corre después de cada generación):

**Archivo**: `/scripts/validate-ciudad-content.ts`

**Prompt para Claude Code** (crear el validador):

```
Tarea: crear un script de validación en /scripts/validate-ciudad-content.ts
que chequee la calidad de cada ServicioCiudadCopy antes de mergearlo.

El script recibe: un ServicioCiudadCopy candidato + el array existente de
servicioCiudadCopy ya publicados.

Checks (todos deben pasar):
1. introParagraph tiene entre 150 y 200 palabras.
2. introParagraph menciona el nombre de la ciudad al menos 2 veces.
3. introParagraph contiene al menos 2 números (regex \d+).
4. Comparar con todos los otros servicioCiudadCopy existentes:
   - Calcular overlap de 5-gramas de intro + panorama.
   - Si overlap > 40% con CUALQUIER otro → FAIL.
5. Ninguna de estas frases prohibidas aparece (case-insensitive):
     - "plan de seguridad personalizado"
     - "soluciones integrales"
     - "protegemos lo que más importa"
     - "capacitado en situaciones de riesgo"
     - "control de acceso especializado"
     - "protocolos de emergencia específicos"
6. El objeto industriasRelevantes.length es exactamente 3.
7. El FAQ tiene al menos 4 items y cada respuesta tiene al menos 40 palabras.
8. El casoEstudio.resultado contiene al menos un número con unidad (%, $, horas, etc.)

Output: { pass: boolean; errors: string[]; warnings: string[] }

Integrarlo en un workflow de Cowork que: genera → valida → si falla,
re-prompt con los errores como feedback → si pasa 3 veces, log y me notifica.
```

**Definition of Done por ciudad×servicio**:
- [ ] Generado por Cowork
- [ ] Pasó validador automático
- [ ] Spot-check humano de 1 de cada 10 generadas
- [ ] Sitemap actualizado
- [ ] Submit a GSC Indexing API

---

### Tarea 2.4 · Rollout escalonado y monitoreo

**Cronograma**:

| Semana | Páginas generadas | Acción |
|---|---|---|
| 3 | Santiago × 8 servicios | Revisión humana de las 8 |
| 4 | + Antofagasta, Valparaíso, Concepción × 8 c/u | Lote de 24 |
| 5 | + Viña, Iquique, Puerto Montt × 8 c/u | Lote de 24 |
| 6 | + Rancagua, Chillán, Temuco × 8 c/u | Lote final de 24 |

**No publiques todo de una**. Cada semana, monitoreá en GSC:
- Impresiones de las nuevas URLs
- Keywords que aparecen
- CTR

Si una ciudad baja impresiones vs versión anterior, hay que reescribir. Tener el sistema genera la tentación de escalar rápido — **resistí**.

---

## 5. Fase 3 · Autoridad visual (Semanas 7-10)

**Meta**: pasar de "aesthetic SaaS startup" a "empresa de seguridad de verdad". Esto no es SEO técnico, es E-E-A-T visual, que Google mide a través de quality raters y engagement metrics.

---

### Tarea 3.1 · Sesión fotográfica profesional

**Presupuesto objetivo**: CLP 800.000 - 1.500.000 para un día de fotografía documental.

**Shotlist obligatoria**:

- 3-5 fotos de guardias reales en terreno (con permiso firmado, pueden ser de espalda si prefieren privacidad)
- Central de monitoreo con operadores trabajando
- Sala de briefing / capacitación
- Vehículos/flota
- Primeros planos de equipamiento (radios, uniformes con logo, credencial OS10)
- 3-5 retratos de liderazgo + supervisores (fondo neutro, estilo editorial)
- Exterior de la oficina en Lo Fontecilla 201

**Prompt para el brief del fotógrafo** (texto):

```
Buscamos estética fotoperiodística documental (pensar The Economist,
Bloomberg, Reuters), NO foto corporativa sonriente de stock.
Luz natural o ambiente, no flash. Tonos fríos (azules/grises), alto contraste.
Cero sonrisas forzadas. Queremos transmitir seriedad y profesionalismo, no
alegría de equipo feliz.

Referencias visuales: [adjuntar 3 fotos de reportajes de NYT/Economist sobre
seguridad o logística]
```

**Definition of Done**:
- [ ] Sesión realizada
- [ ] 40+ fotos entregadas en RAW + JPG alta resolución
- [ ] Subidas a Cloudflare Images
- [ ] Mapping en /lib/data/images-catalog.ts

---

### Tarea 3.2 · Página `/equipo`

**Archivos afectados**: crear `/app/equipo/page.tsx`

**Prompt para Claude Code**:

```
Tarea: crear la página /app/equipo/page.tsx con la siguiente estructura.

Datos: leer desde /lib/data/team.ts (archivo que voy a crear manualmente con
los miembros reales del equipo).

Estructura por miembro:
  - Foto retrato (de la sesión fotográfica)
  - Nombre completo
  - Cargo
  - Años en la industria
  - Credenciales (OS10, cursos, ISO, etc.)
  - Bio de 2-3 líneas (humano, no corporativo)
  - LinkedIn (opcional)

Secciones:
1. Hero: H1 "El equipo detrás de Gard Security" + subtítulo sobre por qué
   importa en seguridad tener nombres y rostros.
2. Liderazgo (3-5 personas)
3. Supervisores de operaciones (6-10 personas)
4. "Nuestro compromiso" — sección que explica:
   - Todos los guardias certificados OS10
   - Verificación de antecedentes
   - Capacitación continua (con cifra real de horas/año)

Metadata:
  title: "Equipo | Gard Security - Empresa de Seguridad Privada en Chile"
  description: "Conocé al equipo de Gard Security. Líderes y supervisores con [X] años de experiencia en seguridad privada en Chile. Todos certificados OS10."

Schema.org: agregar @type "Person" para cada miembro de liderazgo con
worksFor apuntando a la Organization principal.

Commit: "feat(eeat): add /equipo page with named team + credentials"
```

**Definition of Done**:
- [ ] Página live con fotos reales
- [ ] Mínimo 5 personas con bio real
- [ ] Schema Person validado
- [ ] Link desde footer y "Sobre Nosotros"

---

### Tarea 3.3 · Tres case studies reales

**Archivos afectados**: `/app/casos/[slug]/page.tsx` (dinámica)

**Estructura obligatoria de cada caso** (1.500-2.000 palabras):

1. **Cliente**: nombre si tenés permiso, sino "Empresa del sector X en región Y"
2. **Contexto**: qué pasaba antes
3. **Problema**: números concretos
4. **Solución**: qué hizo Gard, tecnologías usadas (OPAI, drones, guardias, etc.)
5. **Resultados**: métricas con % y timeframes
6. **Quote del cliente**
7. **Fotos**: ideal, fotos de la operación real

**Prompt para entrevista con cliente** (texto):

```
Entrevista de 30 minutos, grabada con permiso. Preguntas:

1. ¿Cuál era tu situación de seguridad antes de Gard? ¿Qué pasaba que tenías
   que resolver?

2. ¿Qué probaste antes? ¿Por qué no funcionó?

3. ¿Cómo nos encontraste y qué te hizo elegirnos?

4. Primeros 30 días trabajando con nosotros, ¿qué cambió?

5. Hoy, ¿qué número concreto puedes poner al impacto? (incidentes, costos,
   tiempos de respuesta, etc.)

6. ¿Qué le dirías a alguien del sector evaluando contratarnos?

7. ¿Podemos usar tu nombre + empresa + foto en un caso público?
   (Si dicen que no: ok, anonimizamos).
```

**Definition of Done**:
- [ ] 3 casos publicados
- [ ] Cada uno tiene números verificables
- [ ] Link desde homepage + industria correspondiente
- [ ] Schema @type "Article" con autor

---

### Tarea 3.4 · Video de 60 segundos

**Production**: cámara en mano, ritmo documental. Recorrido: oficina → central de monitoreo → guardia en terreno → briefing.

**Voice-over script** (texto, ~150 palabras para 60s):

```
[Escena: operadores en central de monitoreo, screens con múltiples feeds]

"Esto no es marketing. Es la central de operaciones de Gard Security
en Las Condes. [X] operadores, monitoreando [Y] sitios de clientes en tiempo
real, las 24 horas, los 365 días del año.

[Corte: guardia haciendo ronda con tablet]

Nuestros guardias no son solo personas con uniforme. Son operadores certificados
OS10, con respaldo tecnológico de OPAI — el primer ERP con inteligencia
artificial diseñado específicamente para seguridad privada en Chile.

[Corte: cliente firmando contrato o reunión]

Trabajamos con [Z] empresas, desde mineras en Antofagasta hasta retail en
Santiago. Cada contrato es distinto. La confianza se gana todos los días.

[Corte: cierre con logo]

Gard Security. Seguridad que se mide."
```

**Hosting**: Cloudflare Stream (ya está en tu CSP). Embedded en homepage hero.

**Definition of Done**:
- [ ] Video producido y subido a Cloudflare Stream
- [ ] Embed en homepage reemplaza o complementa imagen hero estática
- [ ] Schema @type "VideoObject" con transcripción

---

## 6. Fase 4 · Tuning técnico (Semanas 11-12)

---

### Tarea 4.1 · Migrar Edge Region a GRU1 (São Paulo)

**Problema**: sitio sirviéndose desde `sfo1` (San Francisco). Latencia extra de ~120ms para usuarios chilenos.

**Prompt para Claude Code**:

```
Tarea: cambiar la región primaria de Vercel para servir el sitio desde GRU1
(São Paulo), que es la más cercana a Chile en el catálogo de Vercel.

1. Abrir /vercel.json (crear si no existe).
2. Agregar o modificar:
   {
     "regions": ["gru1"]
   }
3. Si hay funciones serverless, confirmar que pueden correr en gru1:
   export const runtime = 'edge'; // o configurar por función
4. Commit: "perf: move primary edge region to gru1 for latin america users"
5. Después del deploy, hacer `curl -sI https://www.gard.cl | grep x-vercel-id`
   para confirmar que ahora devuelve `gru1::...`

Documentación: https://vercel.com/docs/edge-network/regions
```

**Definition of Done**:
- [ ] `x-vercel-id: gru1::...` en response headers
- [ ] TTFB medido desde Chile bajó (usar webpagetest.org desde Santiago)

---

### Tarea 4.2 · Hreflang es-CL y schema regional

**Prompt para Claude Code**:

```
Tarea: implementar hreflang y reforzar geo-targeting.

1. En /app/layout.tsx agregar en metadata:
   alternates: {
     canonical: 'https://www.gard.cl',
     languages: {
       'es-CL': 'https://www.gard.cl',
     },
   }

2. Reforzar el schema LocalBusiness con:
   "areaServed": [
     { "@type": "Country", "name": "Chile", "sameAs": "https://www.wikidata.org/wiki/Q298" },
     // + una entrada City por cada ciudad cubierta
   ]
   "geo": { "@type": "GeoCoordinates", "latitude": -33.4172, "longitude": -70.5476 }  // Lo Fontecilla 201

3. Verificar en Search Console → International Targeting que Chile está seteado.

4. Commit: "feat(seo): add hreflang es-CL and geo schema reinforcement"
```

**Definition of Done**:
- [ ] Hreflang en HTML fuente
- [ ] Schema LocalBusiness expandido con areaServed por ciudad
- [ ] GSC International Targeting: Chile

---

### Tarea 4.3 · Ataque Lighthouse mobile

**Usar**: Lighthouse CI en GitHub Actions para no regresar.

**Prompt para Claude Code**:

```
Tarea: configurar Lighthouse CI en GitHub Actions para bloquear PRs que
degraden Core Web Vitals.

1. Crear /.github/workflows/lighthouse.yml:

   name: Lighthouse CI
   on: pull_request
   jobs:
     lhci:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
         - uses: treosh/lighthouse-ci-action@v11
           with:
             urls: |
               https://www.gard.cl/
               https://www.gard.cl/santiago/guardias-de-seguridad
               https://www.gard.cl/guardias-de-seguridad-privada-para-empresas
               https://www.gard.cl/blog
             configPath: ./lighthouserc.json

2. Crear /lighthouserc.json con thresholds:
   {
     "ci": {
       "assert": {
         "assertions": {
           "categories:performance": ["error", { "minScore": 0.8 }],
           "categories:seo": ["error", { "minScore": 0.95 }],
           "categories:accessibility": ["warn", { "minScore": 0.9 }],
           "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
           "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
         }
       }
     }
   }

3. Si alguna URL falla, listá qué fallo específicamente (LCP alto, CLS, etc.)
   y mostrame recomendaciones priorizadas.

4. Commit: "ci: add lighthouse gates on CWV and SEO score"
```

**Definition of Done**:
- [ ] Lighthouse CI corriendo en cada PR
- [ ] Las 4 URLs pasan los thresholds
- [ ] PR que degrade Perf < 80 se bloquea automáticamente

---

### Tarea 4.4 · GSC Indexing API (una de tus prioridades Cowork)

**Prompt para Cowork (nightly)**:

```
Rol: job de submit a Google Search Console Indexing API.

Input: /app/sitemap.ts (leer URLs) + /lib/data/recently-updated.json
(URLs modificadas en las últimas 24h).

Tarea:
1. Autenticarte con service account de Google (credenciales en env vars).
2. Para cada URL en recently-updated:
   - POST a https://indexing.googleapis.com/v3/urlNotifications:publish
     con body: { "url": "<url>", "type": "URL_UPDATED" }
3. Logear respuesta, reintentos con backoff si 429/5xx.
4. Output: log en /cowork-logs/gsc-indexing-YYYY-MM-DD.json
5. Notificar por Slack si alguna URL falla 3 veces seguidas.

Límite diario API: 200 URLs (cuota por defecto).
Prioridad de envío: nuevos posts de blog > páginas modificadas > páginas estáticas.
```

**Definition of Done**:
- [ ] Job corriendo cada noche
- [ ] Logs visibles
- [ ] En GSC, "Páginas" → cantidad indexada sube semanalmente

---

## 7. Métricas de éxito a 90 días

Medí **solo estas 6 métricas**. Todo lo demás es ruido.

| Métrica | Baseline (hoy) | Meta 90d | Cómo medir |
|---|---|---|---|
| Top 5 keywords: posición promedio | ___ | mejorar ≥2 posiciones | GSC |
| URLs indexadas | ___ | +30 mínimo | GSC Coverage |
| CTR orgánico promedio | ___ | +15% relativo | GSC |
| Lighthouse mobile homepage | ___ | ≥85 Performance, 100 SEO | Lighthouse |
| Dominios referentes | ___ | +20% | Ahrefs |
| Leads calificados/mes vía web | ___ | +40% | tu CRM |

**Semáforo semanal**: cada viernes, 15 minutos anotando estas 6 cifras en un Google Sheet. Nada más.

---

## 8. Anti-patterns: qué NO hacer

Cosas que parecen buenas ideas pero destruyen:

1. **No generes las 80 páginas de ciudad en una noche.** Rollout de 10 por noche con validación.
2. **No dupliques el blog con el mismo post en 3 categorías.** Cada URL canonical única.
3. **No pongas reviews auto-generadas o con AggregateRating falso.** Manual action garantizada eventualmente.
4. **No hagas keyword stuffing en H1/H2.** Google Helpful Content lo penaliza.
5. **No rediseñes el sitio visualmente antes de Fase 3.** Maquillaje sobre problemas no resuelve.
6. **No cambies URLs de páginas indexadas.** Si algún día lo necesitás, redirects 301 permanentes, nunca 302.
7. **No quites el blog ni le bajes frecuencia.** Es tu motor de long-tail keywords.
8. **No uses "soluciones integrales", "clase mundial", "excelencia" en contenido nuevo.** Palabras vacías.

---

## 9. Orden óptimo de ejecución (resumen ejecutable)

```
Día 0 (hoy)
  [ ] Completar "Decisiones bloqueantes" (sección 1)
  [ ] Fase 0 · Setup (sección 2) — 2h

Semana 1
  [ ] Tarea 1.1 · company-stats.ts          — 4h
  [ ] Tarea 1.2 · AggregateRating audit     — 1h
  [ ] Tarea 1.2.bis · Campaña reviews GMB   — enviar 20 emails
  [ ] Tarea 1.4 · H1 homepage                — 2h

Semana 2
  [ ] Tarea 1.3 · Testimonios                — esperar respuestas cliente
  [ ] Tarea 2.1 · Dataset ciudades (Cowork)  — corre solo 10 noches

Semanas 3-6
  [ ] Tarea 2.2 · Plantilla oro (Santiago)   — semana 3
  [ ] Tarea 2.3 · Validador + Cowork maestro — semana 3
  [ ] Tarea 2.4 · Rollout (ver cronograma)   — semanas 4-6

Semanas 7-10
  [ ] Tarea 3.1 · Sesión fotográfica         — semana 7
  [ ] Tarea 3.2 · /equipo                    — semana 8
  [ ] Tarea 3.3 · 3 casos                    — semanas 8-9
  [ ] Tarea 3.4 · Video                      — semana 10

Semanas 11-12
  [ ] Tarea 4.1 · GRU1                       — 1h
  [ ] Tarea 4.2 · Hreflang + schema          — 2h
  [ ] Tarea 4.3 · Lighthouse CI              — 3h
  [ ] Tarea 4.4 · GSC Indexing Cowork        — 4h setup

Día 90
  [ ] Medición final contra baseline
  [ ] Retro: qué funcionó, qué no
  [ ] Plan Q3 con foco en lo que movió la aguja
```

---

## 10. Recursos y referencias

- **Google Helpful Content System**: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- **Schema.org LocalBusiness**: https://schema.org/LocalBusiness
- **Vercel Edge Regions**: https://vercel.com/docs/edge-network/regions
- **GSC Indexing API**: https://developers.google.com/search/apis/indexing-api/v3/quickstart
- **SPD Chile (datos de delitos)**: http://cead.spd.gov.cl/estadisticas-delictuales/
- **INE Chile**: https://www.ine.gob.cl/
- **Validador Schema**: https://validator.schema.org/

---

## Hallazgos paralelos

Problemas detectados durante la ejecución de tareas que quedan **fuera del scope** de la tarea en curso y deberían abordarse en una tarea futura dedicada. Registrar con `<tarea donde se detectó> · <hallazgo> · <próxima acción sugerida>`.

### Detectados durante Tarea 1.1 (2026-04-23)

- **Tarea 1.1 · `npm run lint` no está configurado**: el proyecto no tiene ESLint inicializado (pide elegir config Strict/Base al correr). Para cumplir con la regla de `.cursorrules` "`npm run lint` — sin errores", hay que configurarlo. Sugerencia: tarea técnica dedicada en FASE 4 (tuning).
- **Tarea 1.1 · Frases prohibidas detectadas en copy existente** (no tocadas en este pase por scope):
  - `"Seguridad Minera de Clase Mundial"` en `app/industrias/industryMetadata.ts:11` (campo `descriptionTitle` de minería).
  - `"soluciones integrales"` en `app/llms.txt/route.ts`, `components/landing/LandingSEOContent.tsx` y otros.
  - Revisar en Tarea 1.4 o como subtarea de Fase 1.
- **Tarea 1.1 · Claims sobre eventos históricos inconsistentes con `foundedYear = 2022`**:
  - `docs/blog_posts/seguridad-eventos-masivos-chile-2025-costos-protocolos.md:614-620` afirma que Gard Security protegió "Lollapalooza Chile (2019-2024)" y "Cumbre APEC 2024". Gard fue fundada en 2022; el equipo fundador puede haberlo hecho desde otras empresas, pero el copy implica que fue Gard como entidad. Reescribir o atribuir al equipo fundador.
- **Tarea 1.1 · AggregateRating hardcoded con ratingValue=4.9 y reviewCount=57**: afirmado en `app/mejor-empresa-seguridad-chile/page.tsx`, `app/empresa-seguridad-privada-chile/page.tsx`, `app/empresa-guardias-seguridad-chile/page.tsx`, `components/seo/LocalBusinessSchema.tsx`. Esto es exactamente lo que Tarea 1.2 va a auditar; dejar hasta que el usuario responda la Opción A/B.
- **Tarea 1.1 · Archivos duplicados "` 2.ts`", "` 2.md`", etc. en varios directorios**: hay duplicados de macOS/Finder en `lib/data/`, `docs/`, raíz. No afectan build pero pueden causar ruido. Sugerencia: limpieza de repo dedicada.
- **Tarea 1.1 · Archivos de auditoría y resúmenes históricos en la raíz con claims obsoletos**: `AUDITORIA_DISEÑO_2026.md`, `AUDITORIA_GARD_CL_2025.md`, `RESUMEN_IMPLEMENTACION_COMPLETA_HOY.md`, `IMPLEMENTACION_SEO_FASE1_COMPLETA.md` contienen números desactualizados (`8+`, `15+`, `50+ Clientes`). No se tocaron en 1.1 porque son documentación histórica que no se sirve al frontend. Considerar moverlos a `docs/archive/` o eliminarlos.

### Detectados durante Tarea 1.3 (2026-04-23)

- **Tarea 1.3 · Testimonios inventados fuera del homepage** (no tocados por estar fuera del scope inmediato):
  - `app/data/servicios-por-industria.ts` tiene **7 campos `testimonio`** hardcoded con quotes genéricas atribuidas implícitamente a clientes (se renderizan en páginas `/servicios-por-industria/[servicio]/[industria]`).
  - `app/(landing-cotizador-inteligente)/cotizador-inteligente/page.tsx` tiene **3 testimonios inline hardcoded** (líneas 638, 644, 650).
  - Acción sugerida: vaciar esos campos y refactorizar el render igual que en `ClientCarousel.tsx` (fallback a grilla de logos) cuando se aborde Tarea 1.3.bis o similar.
- **Tarea 1.3 · Heading "Brindamos soluciones de seguridad"**: el copy viejo del carrusel usaba esa frase. Fue reemplazado por algo más específico, pero "soluciones" está cerca de la frase prohibida "soluciones integrales". Revisar en copy review general.

---

**Última actualización**: 2026-04-23
**Owner**: Carlos
**Co-piloto**: Claude (iteración continua)
