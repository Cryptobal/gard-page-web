/**
 * Constantes y utilidades para el formulario de postulación.
 * Espejo de opai/src/lib/personas.ts — solo lo necesario para el form público.
 */

export const BANK_ACCOUNT_TYPES = [
  "cuenta_corriente",
  "cuenta_vista",
  "cuenta_rut",
] as const;

export const CHILE_BANKS = [
  { code: "BCH", name: "Banco de Chile" },
  { code: "BSC", name: "Banco Santander Chile" },
  { code: "BCE", name: "BancoEstado" },
  { code: "BCI", name: "Banco de Crédito e Inversiones (BCI)" },
  { code: "ITAU", name: "Banco Itaú Chile" },
  { code: "SEC", name: "Banco Security" },
  { code: "FAL", name: "Banco Falabella" },
  { code: "RIP", name: "Banco Ripley" },
  { code: "CON", name: "Banco Consorcio" },
  { code: "INT", name: "Banco Internacional" },
  { code: "CHI", name: "Banco BICE" },
  { code: "EDW", name: "Banco Edwards-Citi" },
  { code: "SCO", name: "Scotiabank Chile" },
  { code: "HSBC", name: "HSBC Bank Chile" },
  { code: "TENPO", name: "Tenpo Prepago / Cuenta" },
  { code: "MACH", name: "MACH (Bci)" },
  { code: "MP", name: "Mercado Pago" },
].sort((a, b) => a.name.localeCompare(b.name, "es"));

export const AFP_CHILE = [
  "Capital",
  "Cuprum",
  "Habitat",
  "PlanVital",
  "ProVida",
  "UNO",
  "Modelo",
] as const;

export const HEALTH_SYSTEMS = ["fonasa", "isapre"] as const;
export const ISAPRES_CHILE = [
  "Banmédica",
  "Colmena",
  "Consalud",
  "CruzBlanca",
  "Esencial",
  "Nueva Masvida",
  "Vida Tres",
] as const;

export const PERSON_SEX = ["masculino", "femenino"] as const;

export const SHOE_SIZES = Array.from({ length: 13 }, (_, i) => String(35 + i));
export const PANTS_SIZES = Array.from({ length: 13 }, (_, i) => String(34 + i * 2));
export const TOP_GARMENT_SIZES = ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const;

export const PAISES_AMERICA = [
  "Chile", "Argentina", "Bolivia", "Brasil", "Canadá", "Colombia",
  "Costa Rica", "Cuba", "Ecuador", "El Salvador", "Estados Unidos",
  "Guatemala", "Haití", "Honduras", "México", "Nicaragua", "Panamá",
  "Paraguay", "Perú", "República Dominicana", "Uruguay", "Venezuela",
] as const;

export const DEFAULT_POSTULACION_DOCUMENTS = [
  { code: "certificado_antecedentes", label: "Certificado de antecedentes", required: false },
  { code: "certificado_os10", label: "Certificado OS-10", required: false },
  { code: "cedula_identidad", label: "Cédula de identidad", required: false },
  { code: "curriculum", label: "Currículum", required: false },
];

// --- Utilidades de RUT ---

export function normalizeRut(input: string): string {
  return input.trim().replace(/\./g, "").toUpperCase();
}

function computeRutDv(bodyDigits: string): string {
  let sum = 0;
  let multiplier = 2;
  for (let i = bodyDigits.length - 1; i >= 0; i -= 1) {
    sum += Number(bodyDigits[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = 11 - (sum % 11);
  return remainder === 11 ? "0" : remainder === 10 ? "K" : String(remainder);
}

export function completeRutWithDv(input: string): string {
  const normalized = normalizeRut(input).replace(/[^0-9K-]/g, "");
  if (normalized.includes("-")) {
    const [rawBody, ...rawDvParts] = normalized.split("-");
    const body = rawBody.replace(/\D/g, "").slice(0, 8);
    const dv = rawDvParts.join("").replace(/[^0-9K]/g, "").slice(0, 1);
    if (body.length < 7 || body.length > 8) return normalized;
    return dv ? `${body}-${dv}` : `${body}-${computeRutDv(body)}`;
  }
  const compact = normalized.replace(/[^0-9K]/g, "").slice(0, 9);
  if (/^\d{7,8}$/.test(compact)) return `${compact}-${computeRutDv(compact)}`;
  if (/^\d{8}[0-9K]$/.test(compact)) return `${compact.slice(0, 8)}-${compact.slice(8)}`;
  if (/^\d{7}K$/.test(compact)) return `${compact.slice(0, 7)}-${compact.slice(7)}`;
  return compact;
}

export function formatRutForInput(input: string): string {
  const normalized = normalizeRut(input).replace(/[^0-9K-]/g, "");
  if (normalized.includes("-")) {
    const [rawBody, ...rawDvParts] = normalized.split("-");
    const body = rawBody.replace(/\D/g, "").slice(0, 8);
    if (!body) return "";
    const dv = rawDvParts.join("").replace(/[^0-9K]/g, "").slice(0, 1);
    if (dv) return `${body}-${dv}`;
    return normalized.endsWith("-") ? `${body}-` : body;
  }
  return normalized.replace(/[^0-9K]/g, "").slice(0, 9);
}

export function isChileanRutFormat(input: string): boolean {
  return /^\d{7,8}-[\dK]$/.test(normalizeRut(input));
}

export function isValidChileanRut(input: string): boolean {
  const rut = normalizeRut(input);
  if (!isChileanRutFormat(rut)) return false;
  const [body, dvInput] = rut.split("-");
  return dvInput === computeRutDv(body);
}

export function normalizeMobileNineDigits(value: string): string {
  const onlyDigits = value.replace(/\D/g, "");
  if (onlyDigits.startsWith("56") && onlyDigits.length === 11) return onlyDigits.slice(2);
  return onlyDigits;
}
