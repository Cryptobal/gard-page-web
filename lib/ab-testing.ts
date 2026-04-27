import { cookies } from 'next/headers';
import { AB_COOKIE_NAME, type CotizarVariant } from './ab-testing-shared';

export { AB_COOKIE_NAME, AB_COOKIE_MAX_AGE_SECONDS, type CotizarVariant } from './ab-testing-shared';

function isVariant(value: string | undefined): value is CotizarVariant {
  return value === 'control' || value === 'multistep';
}

/**
 * Devuelve la variante asignada al usuario para el experimento de cotizar.
 * Server-only. Si la cookie no existe (caso borde — e.g. visita directa sin
 * pasar por middleware) asigna una variante aleatoria como fallback, pero
 * NO la persiste — eso es responsabilidad del middleware en la siguiente
 * navegación.
 */
export async function getCotizarVariant(): Promise<CotizarVariant> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(AB_COOKIE_NAME)?.value;
  if (isVariant(existing)) return existing;
  return Math.random() < 0.5 ? 'control' : 'multistep';
}
