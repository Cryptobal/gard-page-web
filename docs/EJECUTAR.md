# EJECUTAR.md · Instrucciones de ejecución autónoma para Cursor

> **Para Cursor Agent**: este documento contiene todas las tareas a ejecutar, en orden.
> Avanzá tarea por tarea, pidiendo al usuario los datos que necesites cuando aparezca un bloque `PEDIR DATOS`.
> Al terminar cada tarea, marcá la casilla `[x]` en este archivo y hacé commit.
> Si una tarea falla, detenete y preguntá al usuario cómo continuar. NO saltes tareas.

---

## Cómo Cursor debe interpretar este archivo

1. Leé `docs/SEO_OVERHAUL_PLAN.md` y `.cursorrules` como contexto obligatorio.
2. Ejecutá las tareas de abajo **en orden estricto**.
3. Antes de cada tarea:
   - Releé la tarea correspondiente en `SEO_OVERHAUL_PLAN.md` para ver la spec completa.
   - Listame qué archivos vas a crear/modificar.
   - Si la tarea tiene un bloque `PEDIR DATOS`, pedilos al usuario y esperá respuesta.
   - Esperá el "ok proceder" antes de escribir código.
4. Después de cada tarea:
   - Corré `npm run build` y `npm run lint`. Si fallan, arreglá.
   - Mostrame el `git diff` resumido.
   - Proponé el mensaje de commit.
   - Esperá "ok commit" y hacé commit local (no push).
   - Marcá `[x]` en la checkbox correspondiente de ESTE archivo.
   - Pasá a la siguiente tarea automáticamente.
5. Al terminar un bloque (FASE 1, FASE 2, etc.), parar y hacer resumen.

---

## Estado de ejecución

- [ ] FASE 0 — Setup
- [ ] FASE 1 — Parar la hemorragia (Semanas 1-2)
- [ ] FASE 2 — Rescatar páginas de ciudad (Semanas 3-6)
- [ ] FASE 3 — Autoridad visual (Semanas 7-10)
- [ ] FASE 4 — Tuning técnico (Semanas 11-12)

---

# FASE 0 · Setup

## Tarea 0.1 · Crear branch de trabajo

- [x] Hacer `git checkout main && git pull`
- [x] Crear branch: `git checkout -b seo-overhaul-2026`
- [x] Push: `git push -u origin seo-overhaul-2026`

**Al terminar**: confirmar al usuario que está en el branch correcto y pasar a Tarea 1.1.

---

# FASE 1 · Parar la hemorragia

## Tarea 1.1 · Fuente única de verdad para stats de empresa

**Spec completa**: ver sección "Tarea 1.1" en `docs/SEO_OVERHAUL_PLAN.md`.

### PEDIR DATOS al usuario (antes de escribir código)

Preguntá exactamente esto y esperá respuesta:

```
Necesito los siguientes datos REALES de Gard Security. Si no estás seguro de un
número, dame el valor menor que sea verdad. No inventes.

1. Años de experiencia (número entero): ___
2. Guardias activos en la dotación actual: ___
3. Clientes con contrato vigente hoy: ___
4. % del plantel con OS10 vigente: ___
5. Año de fundación de la empresa: ___

Esperá respuesta antes de continuar.
```

### Pasos de ejecución

1. Crear `/lib/data/company-stats.ts`:
   ```typescript
   export const companyStats = {
     yearsExperience: <valor del usuario>,
     activeGuards: <valor>,
     activeClients: <valor>,
     citiesCovered: 10,
     os10CertifiedPct: <valor>,
     foundedYear: <valor>,
     monitoringCenter247: true,
   } as const;

   export type CompanyStats = typeof companyStats;
   ```

2. Buscar en todo el repo (con ripgrep o grep recursivo) las ocurrencias hardcodeadas. Patrones:
   - `más de 10 años`, `más de 8 años`, `más de 15 años`
   - `8+`, `10+`, `15+` seguidos de "años" o "Años"
   - `50+ Clientes`, `50 Clientes satisfechos`
   - `200+ guardias`, `200 guardias`
   - Cualquier número de años de experiencia hardcoded

3. **Listarle al usuario** las ocurrencias encontradas en formato:
   ```
   Encontré N ocurrencias hardcoded:
   - /app/page.tsx:45 → "Más de 10 años"
   - /components/Footer.tsx:12 → "más de 10 años de experiencia"
   - ...
   Voy a refactorizar todas importando desde /lib/data/company-stats.ts.
   ¿Procedo?
   ```

4. Al recibir "ok proceder":
   - Refactorizar cada ocurrencia para usar `${companyStats.yearsExperience}` (o el campo que corresponda).
   - Revisar también `llms.txt` si existe en la raíz.
   - Revisar metadata de páginas (`title`, `description`) que mencionen números.

5. Correr `npm run build`. Si falla, arreglar tipos.
6. Correr `npm run lint`. Fix.
7. Mostrar `git diff --stat` y proponer commit: `refactor(seo): single source of truth for company stats`
8. Esperar "ok commit" y commitear.
9. Marcar checkbox de esta tarea y pasar a 1.2.

### Definition of Done
- [x] `/lib/data/company-stats.ts` existe y está tipado strict
- [x] `grep -rE "más de (8|10|15) años"` en el repo devuelve 0 resultados fuera del file de stats
- [x] Build verde
- [x] Commit hecho

---

## Tarea 1.2 · Auditar AggregateRating schema

**Spec completa**: ver sección "Tarea 1.2" en `docs/SEO_OVERHAUL_PLAN.md`.

### PEDIR DATOS al usuario

```
El homepage tiene schema.org AggregateRating declarado. Si las estrellas no
están respaldadas por reviews reales verificables, Google puede aplicar
manual action.

Respondeme:
1. ¿Cuántas reviews reales tenés en Google My Business HOY? ___
2. ¿Cuál es el rating promedio actual? ___
3. URL de tu ficha GMB: ___

Según tu respuesta:
- Si tenés ≥5 reviews y rating ≥4.0 → Opción A (mantener con números reales)
- Si tenés <5 reviews o no estás seguro → Opción B (remover y iniciar campaña)

¿Qué opción elegís? (A/B)
```

### Pasos de ejecución

1. Buscar en el repo todas las referencias a `AggregateRating`:
   - Probablemente en `/app/layout.tsx`, `/app/page.tsx`, o un componente JSON-LD en `/components/seo/`.
2. Mostrarle al usuario el código actual del schema.

**Si Opción A**:
3a. Reemplazar `ratingValue`, `reviewCount` con los valores reales del usuario.
4a. Agregar link a la ficha GMB desde `/app/sobre-nosotros/page.tsx` (o equivalente). Crear esa página si no existe.
5a. Commit: `fix(seo): align aggregateRating schema with real GMB reviews`.

**Si Opción B**:
3b. Remover completamente el bloque `AggregateRating` del JSON-LD, conservando el resto del schema.
4b. Commit: `fix(seo): remove unverified AggregateRating schema to avoid spam risk`.
5b. Crear nota en `docs/TODO-REVIEWS.md` recordando lanzar campaña de reviews.

6. **Indicar al usuario** las URLs a pegar en https://validator.schema.org/ para verificar después del deploy.

### Definition of Done
- [ ] Schema válido según validator.schema.org (pendiente de validación post-deploy por el usuario)
- [x] Opción ejecutada (Opción A: mantener con números reales — 4.9 / 57 reviews verificadas en GMB)
- [x] Commit hecho
- [x] Si Opción B: archivo `docs/TODO-REVIEWS.md` creado (N/A — no aplica, fue Opción A)

**URLs a validar en validator.schema.org post-deploy** (Carlos):
- https://www.gard.cl/ (LocalBusinessSchema con AggregateRating + url)
- https://www.gard.cl/sobre-nosotros (ReviewSchema con verificationUrl)
- https://www.gard.cl/mejor-empresa-seguridad-chile (ServiceSchema + ReviewSchema)
- https://www.gard.cl/empresa-seguridad-privada-chile (ServiceSchema + ReviewSchema)
- https://www.gard.cl/empresa-guardias-seguridad-chile (ServiceSchema + ReviewSchema)

---

## Tarea 1.3 · Preparar estructura de testimonios reales

**Spec completa**: ver sección "Tarea 1.3" en `docs/SEO_OVERHAUL_PLAN.md`.

### PEDIR DATOS al usuario

```
Los testimonios actuales del homepage parecen generados por IA ("Confían en
nuestra seguridad operacional", etc.). Son más daño que beneficio.

Voy a:
1. Remover los testimonios falsos del homepage ahora.
2. Dejar solo la grilla de logos de clientes.
3. Crear la estructura TypeScript para testimonios reales (que lleguen luego).

Si tenés consentimiento explícito de clientes para citarlos con nombre real,
pasame los datos con este formato:

[
  {
    nombre: "Juan Pérez",
    empresa: "Minera X",
    cargo: "Gerente de Operaciones",
    quote: "...",
    industry: "mineria"
  },
  ...
]

Si no tenés ninguno listo hoy, respondé "ninguno" y dejamos el array vacío.
```

### Pasos de ejecución

1. Crear `/lib/data/testimonials.ts`:
   ```typescript
   export type Testimonial = {
     id: string;
     clientName: string;
     clientRole: string;
     companyName: string;
     companyLogo: string;
     quote: string;
     photoUrl?: string;
     industry: string;
     verified: true;
   };

   export const testimonials: Testimonial[] = [
     // llenar con datos del usuario si los dio, sino vacío
   ];
   ```

2. Encontrar el componente actual de testimonios (probablemente `/components/testimonials/` o dentro de `/app/page.tsx`).

3. Modificar el componente para que:
   - Si `testimonials.length === 0`: renderizar solo grilla de logos con heading "Empresas que ya confían en nosotros". Sin quotes.
   - Si `testimonials.length >= 3`: renderizar testimonios con foto + quote + cargo + logo empresa.

4. Crear `/docs/EMAIL-PEDIR-TESTIMONIO.md` con el template de email para pedir testimonios a clientes (texto está en el plan maestro, Tarea 1.3).

5. Commit: `fix(seo): remove fabricated testimonials, prepare real-testimonial schema`.

### Definition of Done
- [x] Testimonios falsos no aparecen en el live (removidos del homepage carousel y del ClientesCarrusel usado en ciudad/servicio)
- [x] Estructura técnica lista para recibir reales (`lib/data/testimonials.ts` con tipo `Testimonial` + array vacío)
- [x] Template de email disponible en docs (`docs/EMAIL-PEDIR-TESTIMONIO.md`)

**Pendiente fuera de scope** (registrado como hallazgo paralelo en `SEO_OVERHAUL_PLAN.md`):
- 7 testimonios inventados en `app/data/servicios-por-industria.ts`
- 3 testimonios inline en `app/(landing-cotizador-inteligente)/cotizador-inteligente/page.tsx`

---

## Tarea 1.4 · H1 y metadata del homepage

**Spec completa**: ver sección "Tarea 1.4" en `docs/SEO_OVERHAUL_PLAN.md`.

### PEDIR DATOS al usuario

```
Necesito que elijas el H1 definitivo del homepage. Opciones:

A) "Empresa de Seguridad Privada en Chile · Guardias OS10 con Cobertura Nacional 24/7"
   (Más completo, más keywords)

B) "Guardias de Seguridad Privada para Empresas en Chile"
   (Más corto, keyword exacta)

C) "Empresa de Seguridad Privada en Chile · Guardias Certificados OS10"
   (Intermedio)

¿Cuál elegís? (A/B/C)
```

### Pasos de ejecución

1. Abrir `/app/page.tsx` (o donde esté el H1 del home).
2. Mostrarle al usuario el H1 actual + metadata actual.
3. Aplicar:
   - Nuevo H1 según elección.
   - Subtítulo debajo: `Protegemos más de ${companyStats.activeClients} empresas en ${companyStats.citiesCovered} ciudades con guardias certificados OS10, monitoreo 24/7 y tecnología propia.`
   - Metadata export:
     - `title`: "Empresa de Seguridad Privada en Chile | Gard Security"
     - `description`: construir con companyStats, formato: "Guardias de seguridad certificados OS10, monitoreo 24/7, drones y seguridad electrónica. ${companyStats.yearsExperience}+ años protegiendo empresas en ${companyStats.citiesCovered} ciudades de Chile. Cotización en menos de 12 horas."
   - Actualizar `og:title` y `og:description` para que coincidan.
4. La frase "Seguridad de Clase Mundial" puede quedar como tagline secundario en el hero, NUNCA como H1.
5. Build + lint.
6. Commit: `feat(seo): keyword-optimized H1 and metadata on homepage`.

### Definition of Done
- [ ] Nuevo H1 live
- [ ] Metadata coincide entre page metadata y OG tags
- [ ] Commit hecho

---

## CHECKPOINT · Fin de Fase 1

Al terminar 1.1 + 1.2 + 1.3 + 1.4:

1. Mostrar resumen:
   - Tareas completadas: ___
   - Archivos modificados: ___
   - Commits hechos: ___
2. Proponer al usuario:
   ```
   Fase 1 completada. Próximos pasos antes de Fase 2:

   a) Hacer push del branch a GitHub y abrir PR para review
   b) Esperar merge a main y deploy a Vercel
   c) Verificar en GSC que los cambios se indexaron (3-7 días)
   d) Una vez indexado, arrancar Fase 2

   ¿Hago push ahora? (sí/no)
   ```

---

# FASE 2 · Rescatar páginas de ciudad

⚠️ **NO INICIAR FASE 2 HASTA QUE EL USUARIO CONFIRME EXPLÍCITAMENTE**. Requiere:
- Fase 1 mergeada a main
- Datos de ciudades recopilados (ver Tarea 2.1)

## Tarea 2.1 · Dataset oficial por ciudad

**Spec completa**: ver sección "Tarea 2.1" en `docs/SEO_OVERHAUL_PLAN.md`.

### Preparación (no tocar código)

Esta tarea es principalmente investigación de datos externos. El usuario debería correrla con Cowork en modo nightly (10 noches, una ciudad por noche).

**Al llegar a este punto, preguntar al usuario**:

```
La Tarea 2.1 requiere recopilar datos oficiales de 10 ciudades (INE, SPD, CChC,
SONAMI, etc.). Esto se ejecuta mejor con Cowork en modo nightly.

¿Cómo prefieres proceder?

A) Cowork nightly: te paso el prompt maestro y vos lo configurás en Cowork.
   Vuelvo acá cuando el dataset esté listo en /lib/data/ciudades-dataset.ts.

B) Ejecución ahora: busco las 10 ciudades una por una en esta sesión
   (tarda 2-3 horas, consume contexto).

C) Ejecución parcial: solo Santiago ahora, para desbloquear Tarea 2.2
   (plantilla de oro). El resto lo deja para Cowork.

¿Qué elegís? (A/B/C)
```

### Si Opción C (recomendada)

1. Crear `/lib/data/ciudades-dataset.ts` con estructura tipada:
   ```typescript
   export type CiudadDataset = {
     ciudad: string;
     region: string;
     poblacion: number | null;
     poblacionAnio: number | null;
     poblacionFuenteUrl: string | null;
     delitos2024: {
       roboLugarHabitadoTasa100k: number | null;
       roboConViolenciaTasa100k: number | null;
       hurtoTasa100k: number | null;
       comunaMasAfectada: string | null;
       fuenteUrl: string | null;
     };
     industriasPredominantes: string[];
     empresasGrandesEnLaZona: Array<{ nombre: string; industria: string }>;
     proyectosConstruccionActivos: number | null;
     proyectosConstruccionFuente: string | null;
     puntosInteresSeguridad: string[];
     particularidadesGeograficas: string;
     regulacionesLocalesRelevantes: string | null;
   };

   export const ciudadesDataset: Record<string, CiudadDataset> = {
     santiago: {
       // usar @web para buscar en fuentes oficiales: cead.spd.gov.cl, ine.gob.cl,
       // cchc.cl, sonami.cl
       // NO inventar. Si no hay dato, null.
     }
   };
   ```

2. Usar `@web` para buscar datos de Santiago:
   - Tasa de delitos 2024 (subsecretaría de prevención del delito)
   - Población según INE
   - Industrias predominantes y empresas grandes
   - Proyectos de construcción activos

3. Llenar solo el objeto `santiago` con datos reales + URLs de fuente.

4. Commit: `feat(data): add Santiago dataset with verified official sources`.

5. Marcar tarea como parcialmente completa. Esperar decisión del usuario para resto de ciudades.

### Definition of Done (versión Opción C)
- [ ] Estructura tipada creada
- [ ] Santiago lleno con datos verificables
- [ ] Todas las fuentes citadas con URL
- [ ] Commit hecho

---

## Tarea 2.2 · Plantilla de oro · Santiago × guardias-de-seguridad

**Spec completa**: ver sección "Tarea 2.2" en `docs/SEO_OVERHAUL_PLAN.md`.

⚠️ **Tarea crítica**: esta página es la plantilla que se replicará a las otras 79. No avances hasta que esté perfecta.

### PEDIR DATOS al usuario

```
Necesito datos concretos tuyos de operaciones en Santiago para crear contenido
único y real. Respondeme:

1. ¿Cuántos guardias tenés operando en Santiago?
2. ¿3-5 comunas donde tenés operaciones reales hoy?
3. ¿1 caso de éxito en Santiago que puedas contar anonimizado?
   - Industria del cliente:
   - Problema que tenían:
   - Qué hiciste vos:
   - Resultado medible:
4. ¿Rango de precio de mercado de un guardia OS10 en Santiago? (para FAQ)
5. ¿Algún dato único de tus operaciones en Santiago que te diferencie de
   Prosegur/G4S? (tecnología, tiempo de respuesta, etc.)
```

### Pasos de ejecución

1. Refactorizar `/app/[ciudad]/[servicio]/page.tsx` para consumir desde:
   - `/lib/data/ciudades-dataset.ts`
   - `/lib/data/ciudad-data.ts` (existente)
   - `/lib/data/servicio-ciudad-copy.ts` (NUEVO)

2. Crear `/lib/data/servicio-ciudad-copy.ts`:
   ```typescript
   export type ServicioCiudadCopy = {
     ciudad: string;
     servicio: string;
     heroH1: string;
     introParagraph: string; // 150-180 palabras únicas
     panoramaSeguridad: string; // usa datos reales del dataset
     industriasRelevantes: Array<{
       nombre: string;
       porQueImporta: string;
     }>;
     zonasCobertura: Array<{
       nombre: string;
       descripcion: string;
     }>;
     casoEstudio: {
       cliente: string;
       problema: string;
       solucion: string;
       resultado: string;
     };
     faq: Array<{ pregunta: string; respuesta: string }>;
   };

   export const servicioCiudadCopy: ServicioCiudadCopy[] = [
     {
       ciudad: 'santiago',
       servicio: 'guardias-de-seguridad',
       // llenar con los datos que dio el usuario + ciudadesDataset.santiago
     },
   ];
   ```

3. **Generar contenido para el primer objeto** (Santiago × guardias) siguiendo las reglas del plan:
   - H1 único con keyword + ciudad
   - introParagraph de 150-180 palabras CON datos reales del dataset (población, tasa de delitos, industrias)
   - panoramaSeguridad referenciando las cifras del SPD
   - 3 industrias relevantes (no 8)
   - Zonas de cobertura con las comunas que dio el usuario
   - Caso de estudio con los datos reales del usuario
   - FAQ con al menos 4 preguntas, 2 de ellas específicas a Santiago (precio local, zonas de mayor demanda)
   - **Nunca usar frases prohibidas** (ver `.cursorrules`)

4. Reescribir el componente de la página para mostrar todas estas secciones con layout profesional.

5. Agregar schema `@type Service`:
   ```json
   {
     "@type": "Service",
     "serviceType": "Guardias de Seguridad",
     "areaServed": { "@type": "City", "name": "Santiago" },
     "provider": { "@type": "LocalBusiness", "name": "Gard Security" }
   }
   ```

6. Build, lint, y verificar visualmente en `npm run dev`:
   - La página renderiza bien
   - No hay errores en consola
   - El H1 es el nuevo
   - Todas las secciones cargan

7. Correr un script simple de validación antes de commit:
   ```bash
   # Contar palabras del introParagraph de Santiago
   # Confirmar que no contiene frases prohibidas
   # Confirmar que menciona "Santiago" al menos 2 veces en intro
   ```

8. Commit: `feat(seo): gold-standard city-service template (Santiago × guardias)`.

### Definition of Done
- [ ] Nueva plantilla desplegada
- [ ] Santiago × guardias tiene 1200+ palabras únicas
- [ ] 0 frases prohibidas en el contenido
- [ ] Schema Service validado en validator.schema.org
- [ ] Commit hecho

---

## CHECKPOINT · Después de Tarea 2.2

**Detenerse y avisar al usuario**:

```
Tarea 2.2 completada. La plantilla de oro está lista.

ANTES de escalar a las otras 79 combinaciones ciudad×servicio, necesito que:

1. Hagas push y merge a main
2. Deploy a producción
3. Submit manual en Google Search Console → URL Inspection → Request Indexing
   URL: https://www.gard.cl/santiago/guardias-de-seguridad
4. Esperes 14-30 días
5. Mides en GSC:
   - Posición para "guardias de seguridad santiago"
   - CTR
   - Impresiones

Si la página sube posiciones → luz verde para Fase 2.3 (escalar).
Si no se mueve o baja → reescribir antes de escalar.

¿Hago push ahora? (sí/no)
```

⚠️ **No continuar con Tarea 2.3 hasta tener datos de GSC post-deploy**.

---

## Tarea 2.3 · Validador automático de contenido

**Spec completa**: ver sección "Tarea 2.3" en `docs/SEO_OVERHAUL_PLAN.md`.

Esta tarea crea el script que valida el contenido generado por Cowork.

### Pasos de ejecución

1. Crear `/scripts/validate-ciudad-content.ts`:
   - Input: `candidate: ServicioCiudadCopy, existing: ServicioCiudadCopy[]`
   - Checks:
     - introParagraph: 150-200 palabras
     - introParagraph menciona ciudad ≥2 veces
     - introParagraph contiene ≥2 números
     - Overlap de 5-gramas vs otros existentes < 40%
     - 0 frases prohibidas (lista en `.cursorrules`)
     - industriasRelevantes.length === 3
     - faq.length ≥ 4, cada respuesta ≥40 palabras
     - casoEstudio.resultado contiene número con unidad

2. Output: `{ pass: boolean; errors: string[]; warnings: string[] }`

3. Agregar script a `package.json`:
   ```json
   "scripts": {
     "validate-ciudad": "tsx scripts/validate-ciudad-content.ts"
   }
   ```

4. Correr sobre Santiago (debería pasar). Si no pasa, ajustar Santiago hasta que pase.

5. Commit: `feat(tooling): content validator for city-service pages`.

### Definition of Done
- [ ] Script funcional
- [ ] Santiago pasa todos los checks
- [ ] Script documentado con ejemplo de uso en README

---

## Tarea 2.4 · Rollout a ciudades restantes

⚠️ **Solo ejecutar si Santiago mostró mejora de posiciones en GSC después de 14-30 días**.

Esta tarea se ejecuta principalmente con Cowork. Pasos:

1. Configurar workflow Cowork nightly que:
   - Lee una ciudad+servicio de la lista pendiente
   - Genera ServicioCiudadCopy con el prompt maestro (ver plan)
   - Corre `/scripts/validate-ciudad-content.ts`
   - Si pasa: commit automático + PR
   - Si falla: re-prompt con errores, max 3 reintentos

2. Rollout escalonado (NO todas en una noche):
   - Semana 4: Santiago completo (8 servicios) + Antofagasta, Valparaíso, Concepción × 8
   - Semana 5: +Viña, Iquique, Puerto Montt × 8
   - Semana 6: +Rancagua, Chillán, Temuco × 8

3. Monitoreo semanal en GSC. Si alguna ciudad baja impresiones, parar y reescribir.

---

# FASE 3 · Autoridad visual

⚠️ **No iniciar hasta que Fase 2 esté completa y estabilizada (≥60 días)**.

Tareas (resumen, spec completa en plan maestro):
- [ ] 3.1 Sesión fotográfica profesional (externa a Cursor)
- [ ] 3.2 Página `/equipo`
- [ ] 3.3 Tres case studies reales
- [ ] 3.4 Video de 60 segundos en homepage

Cuando el usuario diga "arrancamos Fase 3", pedir foto-shotlist confirmado y proceder con Tarea 3.2 (única que es código puro).

---

# FASE 4 · Tuning técnico

Tareas (resumen, spec completa en plan maestro):
- [ ] 4.1 Migrar edge region a GRU1 (São Paulo)
- [ ] 4.2 Hreflang es-CL + schema regional expandido
- [ ] 4.3 Lighthouse CI en GitHub Actions
- [ ] 4.4 GSC Indexing API via Cowork

Cuando el usuario diga "arrancamos Fase 4", ejecutar en este orden. Todas son código puro, sin bloqueos externos.

---

# Recordatorios permanentes

- **No hacer push** sin confirmación explícita del usuario.
- **No mergear a main** — siempre PR.
- **Verificar** `npm run build` antes de cada commit.
- **Marcar** `[x]` en este archivo al completar cada tarea.
- **Preguntar** si hay ambigüedad. Nunca asumir.
- **Consultar** `docs/SEO_OVERHAUL_PLAN.md` para la spec detallada de cada tarea.
- **No tocar** archivos fuera del scope de la tarea actual.

---

**Última actualización manual**: completar al cerrar cada tarea.
**Progreso total**: 0/18 tareas principales.
