# Evaluación A/B — Cotizar Form

**Fecha de evaluación:** 2026-05-18
**Experimento iniciado:** 2026-04-27 (PR #29 mergeado)
**Duración al momento de evaluación:** ~3 semanas
**Protocolo de referencia:** [docs/ab-testing.md](./ab-testing.md)

---

## Datos a completar manualmente desde GA4

Rango de fechas en GA4: **2026-04-27 → 2026-05-18**

### Tabla de conversión primaria

| Métrica | Control | Multistep |
| --- | --- | --- |
| count(cotizar_exposure) | _____ | _____ |
| count(cotizacion_submit) | _____ | _____ |
| Conversion rate (submit/exposure) | _____ % | _____ % |

### Análisis estadístico

| Métrica | Valor |
| --- | --- |
| Diferencia absoluta (multistep − control) | ___ pp |
| Diferencia relativa (lift) | ___ % |
| p-value (test de proporciones de dos colas) | ___ |
| Intervalo de confianza 95% para la diferencia | [___, ___] |
| Tamaño de muestra suficiente (≥ 1000 por variante) | ☐ Sí ☐ No |
| Significancia estadística (p < 0.05) | ☐ Sí ☐ No |

---

## Decisión

> Marcar **una sola** opción luego de completar los datos de GA4.

- ☐ **Gana MULTISTEP** — proceder a forzar multistep como default.
- ☐ **Gana CONTROL** — proceder a forzar control como default.
- ☐ **Sin ganador claro** — extender experimento ___ semanas más (especificar).

---

## Próximos pasos según decisión

### Si gana MULTISTEP

1. **`app/cotizar/page.tsx`** — ignorar cookie y forzar `variant = 'multistep'` directamente (eliminar lectura de `getCotizarVariant()`).
2. **`middleware.ts`** — remover lógica de cookie A/B: las constantes `AB_COOKIE_NAME`, `AB_COOKIE_MAX_AGE`, `AB_PATHS`, la función `isAbTestPath` y el bloque que setea la cookie.
3. Eliminar los archivos:
   - `lib/ab-testing.ts`
   - `lib/ab-testing-client.ts`
   - `lib/ab-testing-shared.ts`
4. **Próximo sprint:** eliminar `app/cotizar/components/CotizacionForm.tsx` (variante perdedora); refactorizar `CotizacionFormMultiStep` para extraer schema/onSubmit a un módulo compartido (ver TODO marcado en el archivo).
5. Mantener `gard_ab_cotizar_form` en blacklist de cookies legales hasta que expire (90 días desde la última asignación, ~2026-07-25).
6. **Plantilla de commit:**
   ```
   feat(cotizar): cerrar A/B — multistep gana, eliminar variante control
   ```

### Si gana CONTROL

1. **`app/cotizar/page.tsx`** — forzar `variant = 'control'` ignorando cookie.
2. **`middleware.ts`** — remover lógica de cookie A/B (igual que en caso multistep).
3. Eliminar los archivos:
   - `lib/ab-testing.ts`
   - `lib/ab-testing-client.ts`
   - `lib/ab-testing-shared.ts`
4. **Próximo sprint:** eliminar `app/cotizar/components/CotizacionFormMultiStep.tsx`, `components/ExitIntentPopup.tsx` (apunta a `?v=multistep`) y la lógica de captura progresiva.
5. Mantener `gard_ab_cotizar_form` en blacklist de cookies legales hasta que expire.
6. **Plantilla de commit:**
   ```
   feat(cotizar): cerrar A/B — control gana, eliminar variante multistep
   ```

### Si sin ganador claro

1. Documentar tamaño de muestra actual y proyectar cuándo se alcanzarían las ≥ 1000 exposures por variante (ritmo actual: ___ exposures/semana por variante → faltan ___ semanas).
2. Considerar ajustar tráfico o segmentar:
   - Aumentar cobertura SEO canónica hacia `/cotizar`.
   - Segmentar análisis por canal/UTM source (orgánico vs. paid vs. directo).
   - Segmentar por dispositivo (mobile vs. desktop).
3. Programar nueva evaluación en ___ semanas.

---

## Métricas secundarias (sólo multistep)

Rango de fechas en GA4: **2026-04-27 → 2026-05-18**

| Métrica | Valor |
| --- | --- |
| Tasa de avance paso 1 → 2 | ___ % |
| Tasa de avance paso 2 → 3 | ___ % |
| Tasa de avance paso 3 → 4 | ___ % |
| Tasa submit en paso 4 (vs llegadas a paso 4) | ___ % |
| count(cotiz_partial_lead_detected) | ___ |
| count(cotiz_partial_lead_resumed) | ___ |
| Tasa de retorno (resumed / detected) | ___ % |
| count(exit_intent_shown) | ___ |
| count(exit_intent_converted) | ___ |
| Tasa de conversión exit intent | ___ % |

---

## Hallazgos

### Sanity check — archivos clave (2026-05-18)

Todos los archivos clave del experimento fueron verificados y están presentes en `main`:

| Archivo | Estado |
| --- | --- |
| `app/cotizar/page.tsx` | ✅ Presente — server component (sin `'use client'`) |
| `app/cotizar/CotizarPageClient.tsx` | ✅ Presente |
| `lib/ab-testing.ts` | ✅ Presente |
| `lib/ab-testing-shared.ts` | ✅ Presente |
| `lib/ab-testing-client.ts` | ✅ Presente |
| `middleware.ts` → `gard_ab_cotizar_form` | ✅ Presente |

Sin regresiones detectadas. No hay hallazgos adicionales.

---

## Cómo obtener los datos de GA4

### Exploración libre (Funnel de conversión)

1. GA4 → **Explorar** → **Exploración libre**.
2. **Dimensiones:** `Event name`, `ab_variant` (parámetro de evento personalizado).
3. **Métricas:** Recuento de eventos.
4. **Filtro 1:** Nombre de evento = `cotizar_exposure` → obtener exposures por variante (`control` / `multistep`).
5. **Filtro 2:** Nombre de evento = `cotizacion_submit` → obtener submits por variante.
6. **Conversion rate** = `count(cotizacion_submit)` / `count(cotizar_exposure)` por variante.

### Métricas secundarias multistep

- Evento `cotiz_step_completed` con parámetro `step_number` (1, 2, 3, 4) → tasa de avance paso a paso.
- Eventos `cotiz_partial_lead_detected` y `cotiz_partial_lead_resumed` → tasa de retorno.
- Eventos `exit_intent_shown` y `exit_intent_converted` → tasa de conversión del popup.

### Significancia estadística

Opciones para calcular el test de proporciones de dos colas:

- **Online:** [Evan Miller A/B Testing Calculator](https://www.evanmiller.org/ab-testing/proportion.html)
- **Python (scipy):**
  ```python
  from scipy.stats import proportions_ztest
  count = [submits_multistep, submits_control]
  nobs = [exposures_multistep, exposures_control]
  stat, p_value = proportions_ztest(count, nobs)
  print(f"p-value: {p_value:.4f}")
  ```
- Umbral de decisión: **p < 0.05** con muestra ≥ 1000 exposures por variante.
