/**
 * Configuración de endpoints de API según el entorno
 */

// Determinar URL base según el entorno
const getApiBaseUrl = (): string => {
  // En producción
  if (typeof window !== 'undefined' && window.location.hostname === 'gard.cl') {
    return 'https://api.gard.cl'; // URL del backend en producción
  }

  // En staging/preview
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'https://api.gard.cl'; // También usamos la API de producción para previews
  }

  // En desarrollo local, ya no necesitamos el backend
  return '';
};

// Función auxiliar para determinar si estamos en producción/staging
const esProduccion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'gard.cl' || window.location.hostname.includes('vercel.app');
};

// OPAI API URL (for direct lead integration)
const OPAI_URL = process.env.NEXT_PUBLIC_OPAI_API_URL || 'https://opai.gard.cl';

// URLs de API
export const API_URLS = {
  // Contacto general y denuncias legales → OPAI (persiste en BD + envía email)
  CONTACTO: `${OPAI_URL}/api/public/gard/messages`,
  LEGAL_DENUNCIAS: `${OPAI_URL}/api/public/gard/messages`,
  LEGAL_UPLOAD: `${OPAI_URL}/api/public/gard/messages/upload`,

  // Cotización y Cotizador Inteligente → OPAI (crea lead + emails con links WhatsApp)
  COTIZACION: `${OPAI_URL}/api/public/gard/leads`,
  COTIZACION_INTELIGENTE: `${OPAI_URL}/api/public/gard/leads`,

  // Reclutamiento → OPAI postulación (espejo del form de opai.gard.cl)
  POSTULACION: `${OPAI_URL}/api/public/gard/postulacion`,
  POSTULACION_UPLOAD: `${OPAI_URL}/api/public/gard/postulacion/upload`,
  POSTULACION_DOC_TYPES: `${OPAI_URL}/api/public/gard/postulacion/document-types`,
};

export default API_URLS;
