/**
 * Helper centralizado para seguimiento de eventos de formularios
 * Implementa un estándar para todos los formularios de Gard Security
 */

interface FormSubmissionData {
  formType: string;               // Tipo de formulario (contacto, cotizacion, etc.)
  formLocation?: string;          // Ubicación del formulario si es relevante
  industria?: string;             // Para forms específicos por industria
  servicio?: string;              // Para forms específicos por servicio
  additionalData?: Record<string, any>; // Datos opcionales específicos
}

/**
 * Envía un evento de conversión de formulario estandarizado
 */
export function trackFormSubmission(data: FormSubmissionData): void {
  if (typeof window === 'undefined') return;
  
  // Obtener parámetros UTM de sessionStorage
  const utmSource = sessionStorage.getItem('utm_source') || '';
  const utmMedium = sessionStorage.getItem('utm_medium') || '';
  const utmCampaign = sessionStorage.getItem('utm_campaign') || '';
  const utmTerm = sessionStorage.getItem('utm_term') || '';
  const utmContent = sessionStorage.getItem('utm_content') || '';
  const gclid = sessionStorage.getItem('gclid') || '';
  
  // Crear payload estandarizado
  const eventPayload = {
    event: "form_submission",
    form_type: data.formType,
    form_location: data.formLocation || window.location.pathname,
    page_path: window.location.pathname,
    industry: data.industria || '',
    service: data.servicio || '',
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_term: utmTerm,
    utm_content: utmContent,
    gclid: gclid,
    ...data.additionalData
  };
  
  // Enviar a dataLayer (método principal)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
  
  // Log de depuración en desarrollo
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