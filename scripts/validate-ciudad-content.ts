/**
 * Validador de contenido para ServicioCiudadCopy.
 *
 * Rechaza objetos que no cumplan las reglas del plan SEO
 * (`docs/SEO_OVERHAUL_PLAN.md` § Tarea 2.3). Cowork nightly lo corre
 * después de cada generación: si falla, re-prompt con los errores como
 * feedback; si pasa, se mergea al array.
 *
 * Uso manual:
 *   npx tsx scripts/validate-ciudad-content.ts
 *
 * Uso programático:
 *   import { validateCandidate } from '@/scripts/validate-ciudad-content';
 *   const result = validateCandidate(candidate, existing);
 *   if (!result.pass) { ... }
 */

import {
  servicioCiudadCopy,
  type ServicioCiudadCopy,
} from '../lib/data/servicio-ciudad-copy';

/**
 * Frases penalizadas por el algoritmo Helpful Content de Google y por
 * `.cursorrules`. Se chequean case-insensitive. No agregar sinónimos sin
 * discutir: el validador falla duro si aparece cualquiera de estas.
 */
export const BANNED_PHRASES = [
  'soluciones integrales',
  'clase mundial',
  'excelencia en servicio',
  'plan de seguridad personalizado',
  'protocolos de emergencia específicos',
  'control de acceso especializado',
  'capacitado en situaciones de riesgo',
  'protegemos lo que más importa',
] as const;

export type ValidationResult = {
  pass: boolean;
  errors: string[];
  warnings: string[];
};

/** Cuenta palabras contando secuencias de caracteres no-whitespace. */
function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

/** Normaliza: minúsculas, sin tildes, sin puntuación, espacios colapsados. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Genera la lista de 5-gramas de un texto normalizado. */
function fiveGrams(text: string): string[] {
  const tokens = normalize(text).split(' ').filter(Boolean);
  if (tokens.length < 5) return [];
  const grams: string[] = [];
  for (let i = 0; i <= tokens.length - 5; i++) {
    grams.push(tokens.slice(i, i + 5).join(' '));
  }
  return grams;
}

/**
 * Overlap en [0,1] entre dos conjuntos de 5-gramas. 1.0 = idéntico.
 * Calculamos Jaccard (intersección / unión) para penalizar tanto plantilla
 * como relleno de texto.
 */
function fiveGramOverlap(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  let intersection = 0;
  Array.from(setA).forEach((g) => {
    if (setB.has(g)) intersection++;
  });
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function findBannedPhrases(text: string): string[] {
  const normalized = normalize(text);
  return BANNED_PHRASES.filter((phrase) =>
    normalized.includes(normalize(phrase)),
  );
}

function countMatches(text: string, pattern: RegExp): number {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

/** Chequea si un string menciona una ciudad, tolerante a acentos. */
function mentionsCity(text: string, citySlug: string): number {
  const cityName = citySlug.replace(/-/g, ' ');
  const pattern = new RegExp(`\\b${cityName}\\b`, 'gi');
  return countMatches(normalize(text), pattern);
}

/**
 * Valida un ServicioCiudadCopy candidato contra las reglas del plan y
 * contra los objetos ya publicados (para evitar contenido duplicado).
 */
export function validateCandidate(
  candidate: ServicioCiudadCopy,
  existing: ServicioCiudadCopy[] = servicioCiudadCopy,
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const { introParagraph, panoramaSeguridad, industriasRelevantes, faq, casoEstudio, kpisOperativos, ciudad } = candidate;

  const introWords = countWords(introParagraph);
  if (introWords < 150 || introWords > 200) {
    errors.push(
      `introParagraph tiene ${introWords} palabras; debe estar entre 150 y 200.`,
    );
  }

  const cityMentions = mentionsCity(introParagraph, ciudad);
  if (cityMentions < 2) {
    errors.push(
      `introParagraph menciona la ciudad "${ciudad}" ${cityMentions} vez/veces; mínimo 2.`,
    );
  }

  const introNumbers = countMatches(introParagraph, /\d+/g);
  if (introNumbers < 2) {
    errors.push(
      `introParagraph contiene ${introNumbers} números; mínimo 2 (datos concretos).`,
    );
  }

  const candidateIntroPlusPanorama = `${introParagraph}\n\n${panoramaSeguridad}`;
  const candidateGrams = fiveGrams(candidateIntroPlusPanorama);
  const overlaps: Array<{ city: string; service: string; overlap: number }> = [];
  for (const other of existing) {
    if (other.ciudad === candidate.ciudad && other.servicio === candidate.servicio) continue;
    const otherGrams = fiveGrams(`${other.introParagraph}\n\n${other.panoramaSeguridad}`);
    const overlap = fiveGramOverlap(candidateGrams, otherGrams);
    overlaps.push({ city: other.ciudad, service: other.servicio, overlap });
    if (overlap >= 0.4) {
      errors.push(
        `Overlap de 5-gramas con ${other.ciudad}/${other.servicio} es ${(overlap * 100).toFixed(1)}% (máximo 40%).`,
      );
    } else if (overlap >= 0.3) {
      warnings.push(
        `Overlap moderado con ${other.ciudad}/${other.servicio}: ${(overlap * 100).toFixed(1)}%.`,
      );
    }
  }

  const fullText = [
    candidate.heroH1,
    introParagraph,
    panoramaSeguridad,
    ...industriasRelevantes.flatMap((i) => [i.nombre, i.porQueImporta]),
    ...candidate.zonasCobertura.flatMap((z) => [z.nombre, z.descripcion]),
    ...kpisOperativos.flatMap((k) => [k.label, k.value, k.detail]),
    ...(casoEstudio
      ? [casoEstudio.cliente, casoEstudio.problema, casoEstudio.solucion, casoEstudio.resultado]
      : []),
    ...faq.flatMap((f) => [f.pregunta, f.respuesta]),
  ].join('\n');

  const bannedFound = findBannedPhrases(fullText);
  for (const phrase of bannedFound) {
    errors.push(`Frase prohibida encontrada: "${phrase}".`);
  }

  if (industriasRelevantes.length !== 3) {
    errors.push(
      `industriasRelevantes.length es ${industriasRelevantes.length}; debe ser exactamente 3.`,
    );
  }

  if (faq.length < 4) {
    errors.push(`faq tiene ${faq.length} items; mínimo 4.`);
  }
  faq.forEach((item, idx) => {
    const words = countWords(item.respuesta);
    if (words < 40) {
      errors.push(
        `faq[${idx}] respuesta tiene ${words} palabras; mínimo 40.`,
      );
    }
  });

  const specificQuestions = faq.filter((f) =>
    mentionsCity(f.pregunta + ' ' + f.respuesta, candidate.ciudad) > 0,
  ).length;
  if (specificQuestions < 2) {
    warnings.push(
      `Solo ${specificQuestions} FAQ mencionan "${candidate.ciudad}" explícitamente. El plan sugiere ≥2 específicas a la ciudad.`,
    );
  }

  const unitRegex = /\d[\d.,]*\s*(%|clp|usd|\$|min|minutos|horas|hrs|h|dias|d[ií]as|pts|puntos|guardias|incidentes|rondas)/i;
  if (casoEstudio && !unitRegex.test(casoEstudio.resultado)) {
    errors.push(
      'casoEstudio.resultado no contiene un número con unidad (%, $, min, horas, etc).',
    );
  }

  if (!Array.isArray(kpisOperativos) || kpisOperativos.length < 4) {
    errors.push(
      `kpisOperativos tiene ${kpisOperativos?.length ?? 0} items; mínimo 4.`,
    );
  } else {
    kpisOperativos.forEach((kpi, idx) => {
      if (!unitRegex.test(kpi.value)) {
        errors.push(
          `kpisOperativos[${idx}].value "${kpi.value}" no contiene número con unidad (%, min, días, guardias, etc).`,
        );
      }
      if (countWords(kpi.detail) < 4) {
        warnings.push(
          `kpisOperativos[${idx}].detail es muy corto (${countWords(kpi.detail)} palabras); se recomiendan 5-15 para contexto.`,
        );
      }
    });
  }

  return {
    pass: errors.length === 0,
    errors,
    warnings,
  };
}

/** Imprime un reporte legible de un resultado de validación. */
export function printReport(
  label: string,
  result: ValidationResult,
): void {
  const status = result.pass ? 'PASS' : 'FAIL';
  const prefix = result.pass ? '✓' : '✗';
  // eslint-disable-next-line no-console
  console.log(`\n${prefix} [${status}] ${label}`);
  if (result.errors.length > 0) {
    // eslint-disable-next-line no-console
    console.log('  Errors:');
    for (const e of result.errors) {
      // eslint-disable-next-line no-console
      console.log(`    - ${e}`);
    }
  }
  if (result.warnings.length > 0) {
    // eslint-disable-next-line no-console
    console.log('  Warnings:');
    for (const w of result.warnings) {
      // eslint-disable-next-line no-console
      console.log(`    - ${w}`);
    }
  }
}

/**
 * Entry point manual: valida todos los objetos publicados en
 * `servicio-ciudad-copy.ts`. Útil para detectar regresiones después de
 * editar a mano el array.
 */
function runAll(): void {
  if (servicioCiudadCopy.length === 0) {
    // eslint-disable-next-line no-console
    console.log(
      '\n(empty) servicioCiudadCopy está vacío. Agregá objetos para validar.\n',
    );
    return;
  }

  let failures = 0;
  for (const candidate of servicioCiudadCopy) {
    const rest = servicioCiudadCopy.filter(
      (c) => !(c.ciudad === candidate.ciudad && c.servicio === candidate.servicio),
    );
    const result = validateCandidate(candidate, rest);
    printReport(`${candidate.ciudad}/${candidate.servicio}`, result);
    if (!result.pass) failures++;
  }

  // eslint-disable-next-line no-console
  console.log(
    `\n${failures === 0 ? '✓' : '✗'} ${servicioCiudadCopy.length - failures}/${servicioCiudadCopy.length} pass, ${failures} fail.\n`,
  );

  if (failures > 0) {
    process.exit(1);
  }
}

const entrypointUrl = `file://${process.argv[1] ?? ''}`;
if (import.meta.url === entrypointUrl) {
  runAll();
}
