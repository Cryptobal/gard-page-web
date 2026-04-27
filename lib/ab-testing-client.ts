// Helper client-side para leer la variante asignada por la cookie A/B.
// Server-side usa lib/ab-testing.ts (next/headers cookies()).

import { AB_COOKIE_NAME, type CotizarVariant } from './ab-testing-shared';

export type ABVariantClient = CotizarVariant | 'unknown';

export function getABVariantClient(): ABVariantClient {
  if (typeof document === 'undefined') return 'unknown';
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${AB_COOKIE_NAME}=([^;]+)`));
  if (!match) return 'unknown';
  const value = match[1];
  return value === 'control' || value === 'multistep' ? value : 'unknown';
}
