/**
 * Helper centralizado para seguimiento de eventos de formularios
 * Implementa un estándar para todos los formularios de Gard Security
 *
 * Google Ads conversion action "Gard (web) submit_form_submission" (GA4 property
 * Gard) listens for the dataLayer/GA4 event `submit_form_submission`. The previous
 * name `form_submission` was retired in GA4, so conversions stopped arriving.
 */

/** Canonical GA4/Ads conversion event for commercial forms (contacto, cotizar). */
export const FORM_CONVERSION_EVENT = 'submit_form_submission' as const;

/** RRHH postulaciones — must not share the Ads conversion event. */
export const FORM_RECRUITMENT_EVENT = 'submit_form_reclutamiento' as const;

const NON_COMMERCIAL_FORM_TYPES = new Set(['reclutamiento']);

export interface FormSubmissionData {
  formType: string;               // Tipo de formulario (contacto, cotizacion, etc.)
  formLocation?: string;          // Ubicación del formulario si es relevante
  industria?: string;             // Para forms específicos por industria
  servicio?: string;              // Para forms específicos por servicio
  additionalData?: Record<string, string | number | boolean | undefined>;
}

export interface FormSubmissionUtm {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
}

export function getFormDataLayerEventName(formType: string): string {
  return NON_COMMERCIAL_FORM_TYPES.has(formType)
    ? FORM_RECRUITMENT_EVENT
    : FORM_CONVERSION_EVENT;
}

/**
 * Payload de dataLayer sin side effects (testeable).
 * `event`, `form_id` y `page_path` se fijan al final para que additionalData no los pise.
 */
export function buildFormSubmissionPayload(
  data: FormSubmissionData,
  pathname: string,
  utm: FormSubmissionUtm,
): Record<string, unknown> {
  return {
    form_type: data.formType,
    form_location: data.formLocation || pathname,
    industry: data.industria || '',
    service: data.servicio || '',
    ...utm,
    ...data.additionalData,
    event: getFormDataLayerEventName(data.formType),
    form_id: data.formType,
    page_path: pathname,
  };
}

/**
 * Envía el evento de conversión de formulario al dataLayer (GTM → GA4).
 * Solo debe llamarse tras un submit exitoso (HTTP OK), nunca en fallo de validación.
 */
export function trackFormSubmission(data: FormSubmissionData): void {
  if (typeof window === 'undefined') return;

  const utm: FormSubmissionUtm = {
    utm_source: sessionStorage.getItem('utm_source') || '',
    utm_medium: sessionStorage.getItem('utm_medium') || '',
    utm_campaign: sessionStorage.getItem('utm_campaign') || '',
    utm_term: sessionStorage.getItem('utm_term') || '',
    utm_content: sessionStorage.getItem('utm_content') || '',
    gclid: sessionStorage.getItem('gclid') || '',
  };

  const eventPayload = buildFormSubmissionPayload(data, window.location.pathname, utm);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);

  if (process.env.NODE_ENV === 'development') {
    console.log('Form submission tracked:', eventPayload);
  }
}

/**
 * Función para capturar parámetros UTM de la URL y guardarlos en sessionStorage
 * Esta función debe llamarse en componentes de alto nivel o layout
 */
export function captureUtmParameters(): void {
  if (typeof window === 'undefined') return;
  
  const urlParams = new URLSearchParams(window.location.search);
  
  // Capturar UTMs
  const utmParams = {
    'utm_source': urlParams.get('utm_source') || '',
    'utm_medium': urlParams.get('utm_medium') || '',
    'utm_campaign': urlParams.get('utm_campaign') || '',
    'utm_term': urlParams.get('utm_term') || '',
    'utm_content': urlParams.get('utm_content') || '',
    'gclid': urlParams.get('gclid') || ''
  };
  
  // Guardar en sessionStorage solo si tienen valor
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      sessionStorage.setItem(key, value);
      // También guardar en localStorage para persistencia entre sesiones
      localStorage.setItem(key, value);
    }
  });
  
  // Guardar siempre landing_page (página actual)
  const landingPage = window.location.pathname;
  sessionStorage.setItem('landing_page', landingPage);
  localStorage.setItem('landing_page', landingPage);
}

/**
 * Obtiene todos los parámetros UTM y landing_page desde sessionStorage y localStorage
 * @returns Objeto con todos los parámetros UTM y landing_page
 */
export function getUtmParameters(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  // Lista de parámetros a obtener
  const paramNames = [
    'utm_source', 'utm_medium', 'utm_campaign', 
    'utm_term', 'utm_content', 'gclid', 'landing_page'
  ];
  
  // Obtener valores
  const params: Record<string, string> = {};
  
  paramNames.forEach(param => {
    // Priorizar sessionStorage, luego localStorage
    const value = sessionStorage.getItem(param) || localStorage.getItem(param) || '';
    params[param] = value;
  });
  
  // Si landing_page no está definido, usar la página actual
  if (!params.landing_page && typeof window !== 'undefined') {
    params.landing_page = window.location.pathname;
  }
  
  return params;
} 