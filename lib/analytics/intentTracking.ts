/**
 * Segmentación de intención de EMPLEO / postulante.
 *
 * Objetivo (segregación de intención B2B vs empleo): permitir medir en GA4 el
 * tráfico con intención de empleo y construir una audiencia "Postulantes" para
 * EXCLUIRLA en Google Ads, bajando el CPL comercial.
 *
 * Se dispara en:
 *   - el pageview de /reclutamiento
 *   - el clic hacia el portal de empleo externo (trabajo.gard.cl)
 *
 * Privacidad (§15): NO se envía PII. `origen_pagina` es solo una ruta interna
 * (pathname sin query ni datos personales).
 */
export type IntencionEmpleoTipo = 'pageview_reclutamiento' | 'click_trabajo_externo';

export function trackIntencionEmpleo(
  tipo: IntencionEmpleoTipo,
  origenPagina: string,
): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'intencion_empleo',
    tipo,
    origen_pagina: origenPagina,
  });
}

/**
 * Deriva un `origen_pagina` seguro (sin PII) a partir del referrer del mismo
 * dominio. Si no hay referrer interno, devuelve 'directo_o_externo'.
 */
export function getOrigenPaginaFromReferrer(): string {
  if (typeof window === 'undefined') return 'directo_o_externo';
  try {
    if (!document.referrer) return 'directo_o_externo';
    const ref = new URL(document.referrer);
    if (ref.hostname === window.location.hostname) {
      return ref.pathname;
    }
  } catch {
    // URL inválida — ignorar
  }
  return 'directo_o_externo';
}
