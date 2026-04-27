// Constantes compartidas entre el reader server-side (lib/ab-testing.ts) y
// el reader client-side (lib/ab-testing-client.ts). Este módulo no importa
// nada de next/* para que pueda ser bundleado en cualquier entorno.

export const AB_COOKIE_NAME = 'gard_ab_cotizar_form';
export const AB_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90; // 90 días

export type CotizarVariant = 'control' | 'multistep';
