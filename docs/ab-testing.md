# A/B Testing — Cotizar form

Guía de operación del experimento A/B activo en el flujo de cotización.

## Experimento activo

**Nombre interno:** `cotizar_form`
**Variantes:**
- `control` — formulario single-step (`CotizacionForm`)
- `multistep` — formulario multi-step gamificado (`CotizacionFormMultiStep`, Sprint 1B)

**Hipótesis:** dividir el formulario en 4 pasos donde los primeros 3 son zero-typing reduce la fricción inicial y mejora la conversión vs el single-step.

## Asignación de variante

- **Cookie:** `gard_ab_cotizar_form` (90 días, `SameSite=Lax`, `Secure` en producción).
- **Asignación:** 50/50 aleatoria server-side por `middleware.ts` en la primera visita a paths del experimento.
- **Persistencia:** una vez asignada, la cookie se mantiene 90 días — el mismo usuario siempre ve la misma variante.
- **Lectura:**
  - Server-side: `getCotizarVariant()` en [`lib/ab-testing.ts`](../lib/ab-testing.ts) (usa `next/headers` cookies).
  - Client-side: `getABVariantClient()` en [`lib/ab-testing-client.ts`](../lib/ab-testing-client.ts) (lee `document.cookie`).

### Paths donde se setea la cookie

Configurado en [`middleware.ts`](../middleware.ts) — la cookie se asigna al visitar:
- `/cotizar`
- `/ciudades/*`
- `/industrias/*`
- `/servicios/*`
- `/empresa-seguridad-privada-chile`
- `/guardias-de-seguridad-privada-para-empresas`

## Override manual

Para QA, links de email y debugging:

- `/cotizar?v=multistep` → fuerza la variante multistep para esa visita (ignora la cookie).
- `/cotizar?v=control` → fuerza la variante control.

El override **no modifica la cookie** — solo afecta el render de esa request.

## Tracking en GA4 (vía dataLayer)

| Evento | Cuándo | Payload clave |
|---|---|---|
| `cotizar_exposure` | Al montar cualquiera de los dos forms | `ab_variant`, `variant_rendered` |
| `cotizacion_submit` | Al envío exitoso del formulario | `ab_variant`, `form_variant` |
| `form_submission` (existente) | Al envío exitoso (vía `trackFormSubmission`) | `ab_variant` agregado al payload |
| `cotiz_step_completed` | (multistep only) Al avanzar de paso | `step_number`, `variant: 'multistep'` |

**Métrica primaria del experimento:**
```
Conversion rate por variante = count(cotizacion_submit) / count(cotizar_exposure)
```

agrupado por `ab_variant` (`control` vs `multistep`).

**Métricas secundarias (multistep only):**
- Tasa de avance paso a paso (`cotiz_step_completed`).
- Tasa de retorno desde partial lead (`cotiz_partial_lead_resumed` / `cotiz_partial_lead_detected`).

## Criterios para declarar ganador

- **Significancia estadística:** 95% de confianza (p < 0.05).
- **Tamaño mínimo de muestra:** 1,000 exposures por variante (≈2,000 totales).
- **Duración mínima recomendada:** 2 ciclos completos de tráfico semanal para evitar sesgos por día de la semana.

Antes de declarar ganador, validar también:
- Conversión por canal/UTM source (no solo agregada).
- Performance en mobile vs desktop.
- Que la variante perdedora no tenga un caso de uso particular donde gane (e.g. retorno orgánico vs paid).

## Cómo terminar el experimento

Cuando hay un ganador claro:

1. **Si gana `multistep`:**
   - En [`app/cotizar/page.tsx`](../app/cotizar/page.tsx), cambiar el render por defecto a `<CotizacionFormMultiStep />` ignorando cookie.
   - Eliminar `CotizacionForm.tsx` (control) en sprint posterior.
   - Considerar refactor para extraer el schema y `onSubmit` a un módulo compartido (hoy están duplicados intencionalmente — ver TODO en `CotizacionFormMultiStep.tsx`).
2. **Si gana `control`:**
   - Cambiar el render por defecto a `<CotizacionForm />`.
   - Eliminar `CotizacionFormMultiStep.tsx` y `components/ExitIntentPopup.tsx` (este último apunta a `?v=multistep`).
3. **En ambos casos:**
   - Remover la lógica de cookie de [`middleware.ts`](../middleware.ts).
   - Mantener `gard_ab_cotizar_form` en blacklist de cookies legales hasta que expire (90 días).
   - Archivar este documento o actualizarlo para el próximo experimento.

## Cambios futuros al experimento

Si se necesita ajustar la asignación (e.g. 80/20 hacia el ganador para acelerar la migración) o agregar una tercera variante:

- Modificar la lógica en `middleware.ts` (la asignación es `Math.random() < 0.5`).
- Agregar la nueva variante al type `CotizarVariant` en `lib/ab-testing-shared.ts`.
- Actualizar el switch en `app/cotizar/page.tsx`.
- Documentar el cambio aquí.

## Referencias de implementación

- Asignación + cookie: [`middleware.ts`](../middleware.ts)
- Reader server: [`lib/ab-testing.ts`](../lib/ab-testing.ts)
- Reader client + tipos compartidos: [`lib/ab-testing-client.ts`](../lib/ab-testing-client.ts), [`lib/ab-testing-shared.ts`](../lib/ab-testing-shared.ts)
- Switch render: [`app/cotizar/page.tsx`](../app/cotizar/page.tsx)
- Tracking exposure/submit: [`app/cotizar/components/CotizacionForm.tsx`](../app/cotizar/components/CotizacionForm.tsx), [`app/cotizar/components/CotizacionFormMultiStep.tsx`](../app/cotizar/components/CotizacionFormMultiStep.tsx)
