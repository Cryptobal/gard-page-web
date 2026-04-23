/**
 * IDs de Cloudflare Images para capturas reales del ERP OPAI de Gard Security.
 *
 * Todas las capturas están anonimizadas: nombres de clientes, guardias y
 * visitantes reales fueron reemplazados por valores ficticios para proteger la
 * privacidad operativa y cumplir con la Ley Nº 19.628 (protección de datos
 * personales en Chile).
 *
 * Alt text optimizado para SEO con keywords relevantes (OPAI, rondas GPS,
 * guardias, cumplimiento, ERP seguridad privada, supervisión, pauta mensual).
 *
 * Para regenerar estos IDs tras actualizar las capturas, ejecuta:
 *   CLOUDFLARE_API_TOKEN=xxx ./scripts/upload-opai-showcase-to-cloudflare.sh
 *
 * El script sube cada imagen, recibe el UUID que retorna Cloudflare y parcha
 * los campos `id` de este archivo automáticamente.
 */
export const OPAI_IMAGES = {
  portalCliente: {
    id: "bb2de891-f22d-4b5d-dc93-b24390133700",
    alt: "Dashboard del Portal Cliente de OPAI con visibilidad 24/7 de cumplimiento de rondas, KPIs operativos y actividad del equipo de guardias en terreno",
    width: 1024,
    height: 672,
  },
  mapaRondas: {
    id: "871efea4-5dc8-4986-4c16-9bb682c24d00",
    alt: "Operación en vivo de OPAI con mapa de rondas GPS, checkpoints verificados y timeline de marcaciones por guardia",
    width: 1024,
    height: 678,
  },
  portalSupervisor: {
    id: "857e0b75-b1dc-4ced-c3bf-da5fe5d0a900",
    alt: "Portal Supervisor de OPAI con calendario de pauta mensual, acciones rápidas operativas y control de turnos por guardia",
    width: 1024,
    height: 903,
  },
  portalControlAcceso: {
    id: "94b1ba54-02c3-44f2-4a2b-12c380934e00",
    alt: "Portal Control de Acceso de OPAI con registro digital de visitantes, KPIs de flujo y actividad reciente en tiempo real",
    width: 1024,
    height: 901,
  },
  portalGuardia: {
    id: "26cb4489-8933-4fac-2bbc-a0e997933200",
    alt: "Portal Guardia de OPAI con autoservicio del trabajador: marcación de asistencia, protocolo operativo, pauta y documentos laborales",
    width: 1024,
    height: 905,
  },
  pautaMensualErp: {
    id: "8f4cb54b-bd17-42fc-38cf-cddf6848ba00",
    alt: "Vista completa del ERP OPAI de Gard Security con planificación de pauta mensual, módulos de operaciones, personas, payroll, finanzas y cumplimiento",
    width: 1024,
    height: 681,
  },
} as const;

export type OpaiImageKey = keyof typeof OPAI_IMAGES;
