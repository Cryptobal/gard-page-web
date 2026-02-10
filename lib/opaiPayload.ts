/**
 * Helpers para construir el payload de OPAI /api/public/leads
 */

const DOMINIOS_EMAIL_GENERICOS = new Set([
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.es',
  'outlook.com',
  'outlook.es',
  'live.com',
  'yahoo.com',
  'yahoo.es',
  'icloud.com',
  'me.com',
  'mac.com',
  'protonmail.com',
  'proton.me',
  'mail.com',
  'yandex.com',
  'zoho.com',
]);

/**
 * Obtiene página web desde el dominio del email cuando no es genérico.
 * Ej: cristian@xpeconsult.cl → https://xpeconsult.cl
 *     cristian@gmail.com → ''
 */
export function getPaginaWebFromEmail(email: string): string {
  if (!email || typeof email !== 'string') return '';
  const parts = email.trim().split('@');
  if (parts.length !== 2) return '';
  const domain = parts[1].toLowerCase();
  if (!domain || DOMINIOS_EMAIL_GENERICOS.has(domain)) return '';
  return `https://${domain}`;
}

/** Días en minúsculas (formulario) → capitalizados para OPAI */
const DIAS_CAPITALIZADOS: Record<string, string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
  domingo: 'Domingo',
};

/**
 * Convierte array de días del formulario (minúsculas) al formato OPAI (capitalizado).
 */
export function diasParaOpai(dias: string[]): string[] {
  return dias.map((d) => DIAS_CAPITALIZADOS[d.toLowerCase()] ?? d);
}
