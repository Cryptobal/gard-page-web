// Fuente de verdad de combinaciones servicio×industria PÚBLICAS.
// Regla: solo entra aquí lo que tiene entrada con contenido único en
// servicioIndustriaDataMap (app/data/servicios-por-industria.ts).
// El gate de la Fase 6 verifica esa sincronía.
export const COMBOS_INDEXABLES: readonly string[] = [
  'guardias-de-seguridad__mineria',
  'guardias-de-seguridad__retail',
  'guardias-de-seguridad__sector-financiero',
  'guardias-de-seguridad__centros-comerciales',
  'guardias-de-seguridad__eventos-y-espectaculos',
  'seguridad-electronica__centros-de-datos',
  'drones-seguridad__sector-energetico',
  // Página estática dedicada ya existente (no tocar):
  'prevencion-intrusiones__parques-industriales',
] as const;

export const esComboIndexable = (servicio: string, industria: string) =>
  COMBOS_INDEXABLES.includes(`${servicio}__${industria}`);
