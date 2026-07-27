import { ciudades } from '@/lib/data/ciudad-data';

/**
 * Fuente única de la taxonomía de navegación de gard.cl.
 *
 * Este módulo es plano (sin `'use client'`) para poder consumirse tanto desde
 * el header de escritorio (`components/Header.tsx`) como desde el shell móvil
 * (`components/shell/*`) y, a futuro, desde componentes servidor (footer, mapa
 * del sitio). Los datos de `serviciosNav`, `industriasNav` y `tecnologiasNav`
 * se extrajeron literalmente del antiguo `megaMenuData` acoplado al header.
 */
export interface NavItem {
  title: string;
  href: string;
  desc: string;
}

export const serviciosNav: NavItem[] = [
  { title: 'Seguridad para Empresas', href: '/guardias-de-seguridad-privada-para-empresas', desc: 'Casos reales, comparativa de servicios y cotización rápida.' },
  { title: 'Guardias de Seguridad', href: '/servicios/guardias-de-seguridad', desc: 'Personal certificado OS10 para protección física.' },
  { title: 'Seguridad Electrónica', href: '/servicios/seguridad-electronica', desc: 'CCTV, alarmas y control de acceso avanzado.' },
  { title: 'Central de Monitoreo', href: '/servicios/central-monitoreo', desc: 'Vigilancia remota 24/7 con respuesta inmediata.' },
  { title: 'Drones de Seguridad', href: '/servicios/drones-seguridad', desc: 'Vigilancia aérea para grandes extensiones.' },
  { title: 'Auditoría de Seguridad', href: '/servicios/auditoria-seguridad', desc: 'Evaluación de riesgos y vulnerabilidades.' },
  { title: 'Consultoría', href: '/servicios/consultoria', desc: 'Asesoría estratégica en seguridad corporativa.' },
];

export const industriasNav: NavItem[] = [
  { title: 'Minería', href: '/industrias/mineria', desc: 'Seguridad especializada para faenas mineras.' },
  { title: 'Retail', href: '/industrias/retail', desc: 'Protección de activos y control de pérdidas.' },
  { title: 'Logística', href: '/industrias/bodegas', desc: 'Seguridad para centros de distribución.' },
  { title: 'Corporativo', href: '/industrias/edificios-corporativos', desc: 'Vigilancia para oficinas y edificios.' },
  { title: 'Construcción', href: '/industrias/construccion', desc: 'Protección de obras y maquinaria.' },
  { title: 'Educación', href: '/industrias/educacion', desc: 'Seguridad para colegios y universidades.' },
];

export const tecnologiasNav: NavItem[] = [
  { title: 'OPAI · Plataforma completa', href: '/tecnologia-seguridad', desc: 'ERP propio de Gard Security: pauta, rondas, payroll, cumplimiento e IA.' },
  { title: 'Portal Cliente', href: '/portal-cliente', desc: 'Dashboard 24/7 con KPIs, Trust Score y actividad del equipo en sitio.' },
  { title: 'Control de Rondas GPS', href: '/control-rondas-gps', desc: 'Verificación GPS de checkpoints, timeline de marcaciones y Trust Score auditable.' },
];

/**
 * Servicio ancla para los enlaces de cobertura: cada ciudad enlaza a su página
 * ciudad×servicio real y canónica `/[ciudad]/[servicio]`. `guardias-de-seguridad`
 * es el servicio insignia y existe como página SSG para las 10 ciudades
 * (`app/[ciudad]/[servicio]/generateStaticParams`).
 */
export const COVERAGE_SERVICE = 'guardias-de-seguridad';

/**
 * Cobertura: derivada de la fuente única de ciudades (`lib/data/ciudad-data.ts`).
 * No se inventa el listado; son las 10 ciudades con cobertura operativa.
 */
export const ciudadesNav: NavItem[] = ciudades.map((ciudad) => ({
  title: ciudad.nombre,
  href: `/${ciudad.slug}/${COVERAGE_SERVICE}`,
  desc: ciudad.region,
}));

/**
 * Estructura del mega menú de escritorio. Se reconstruye desde los arrays
 * anteriores para que `components/Header.tsx` deje de definir la taxonomía
 * localmente sin cambiar su render.
 */
export const megaMenuData = {
  Servicios: serviciosNav,
  Industrias: industriasNav,
  Tecnologías: tecnologiasNav,
} as const;
