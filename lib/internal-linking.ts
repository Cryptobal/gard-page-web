import { industries } from '@/app/data/industries';
import { services } from '@/app/data/services';
import { industriesMetadata } from '@/app/industrias/industryMetadata';

/**
 * Mapa de keywords a URLs para auto-enlazado
 * Se construye dinámicamente desde las fuentes de datos
 */
function buildKeywordMap(): Map<string, { url: string; text: string; priority: number }> {
  const keywordMap = new Map<string, { url: string; text: string; priority: number }>();

  // Agregar industrias
  industriesMetadata.forEach((industry) => {
    const slug = industry.slug;
    const name = industry.name;

    // Keyword principal: nombre de la industria
    keywordMap.set(name.toLowerCase(), {
      url: `/industrias/${slug}`,
      text: name,
      priority: 10
    });

    // Variaciones comunes
    const variations = [
      `seguridad para ${name.toLowerCase()}`,
      `guardias para ${name.toLowerCase()}`,
      `seguridad en ${name.toLowerCase()}`,
      `vigilancia en ${name.toLowerCase()}`,
      `protección para ${name.toLowerCase()}`
    ];

    variations.forEach(variation => {
      if (!keywordMap.has(variation)) {
        keywordMap.set(variation, {
          url: `/industrias/${slug}`,
          text: variation,
          priority: 8
        });
      }
    });
  });

  // Agregar servicios
  services.forEach((service) => {
    const slug = service.href.split('/').pop() || '';
    const name = service.name;

    // Keyword principal
    keywordMap.set(name.toLowerCase(), {
      url: service.href,
      text: name,
      priority: 10
    });

    // Variaciones comunes
    const variations = [
      `servicio de ${name.toLowerCase()}`,
      `servicios de ${name.toLowerCase()}`
    ];

    variations.forEach(variation => {
      if (!keywordMap.has(variation)) {
        keywordMap.set(variation, {
          url: service.href,
          text: variation,
          priority: 8
        });
      }
    });
  });

  // Keywords genéricas adicionales
  const genericKeywords = [
    { keyword: 'seguridad privada', url: '/servicios', priority: 5 },
    { keyword: 'guardias de seguridad', url: '/servicios/guardias-de-seguridad', priority: 9 },
    { keyword: 'empresa de seguridad', url: '/sobre-nosotros', priority: 5 },
    { keyword: 'seguridad empresarial', url: '/servicios', priority: 5 },
    { keyword: 'vigilancia privada', url: '/servicios', priority: 5 },
    { keyword: 'monitoreo 24/7', url: '/servicios/monitoreo', priority: 7 },
    { keyword: 'drones de seguridad', url: '/servicios/drones-seguridad', priority: 9 },
    { keyword: 'cámaras de seguridad', url: '/servicios/seguridad-electronica', priority: 7 },
    { keyword: 'control de acceso', url: '/servicios/seguridad-perimetral', priority: 7 }
  ];

  genericKeywords.forEach(({ keyword, url, priority }) => {
    if (!keywordMap.has(keyword)) {
      keywordMap.set(keyword, { url, text: keyword, priority });
    }
  });

  return keywordMap;
}

/**
 * Escapar caracteres especiales de regex
 */
function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Función principal de auto-enlazado
 * Agrega enlaces automáticos a keywords detectadas en el contenido HTML
 * 
 * @param html - Contenido HTML a procesar
 * @param maxLinksPerKeyword - Máximo de enlaces por keyword (default: 1)
 * @returns HTML con enlaces agregados
 */
export function addInternalLinks(html: string, maxLinksPerKeyword: number = 1): string {
  if (!html || html.trim() === '') {
    return html;
  }

  const keywordMap = buildKeywordMap();
  
  // Ordenar keywords por longitud (más largas primero) y por prioridad
  const sortedKeywords = Array.from(keywordMap.entries())
    .sort((a, b) => {
      // Primero por longitud (más largo primero para evitar sub-matches)
      const lengthDiff = b[0].length - a[0].length;
      if (lengthDiff !== 0) return lengthDiff;
      
      // Luego por prioridad
      return b[1].priority - a[1].priority;
    });

  // Contador de enlaces agregados por keyword
  const linkCount = new Map<string, number>();

  let processedHtml = html;

  sortedKeywords.forEach(([keyword, linkData]) => {
    // Si ya se alcanzó el límite para esta keyword, skip
    if ((linkCount.get(keyword) || 0) >= maxLinksPerKeyword) {
      return;
    }

    // Crear regex para encontrar la keyword
    // Debe estar fuera de tags HTML y fuera de enlaces existentes
    const keywordRegex = new RegExp(
      `(?<!<[^>]*)(\\b${escapeRegex(keyword)}\\b)(?![^<]*>)(?![^<]*<\\/a>)`,
      'gi'
    );

    // Reemplazar solo la primera ocurrencia (o hasta el límite)
    let replacementCount = 0;
    processedHtml = processedHtml.replace(keywordRegex, (match) => {
      // Si ya se alcanzó el límite, no reemplazar
      if (replacementCount >= maxLinksPerKeyword) {
        return match;
      }

      replacementCount++;
      linkCount.set(keyword, (linkCount.get(keyword) || 0) + 1);

      // Crear el enlace
      return `<a href="${linkData.url}" class="text-primary dark:text-accent hover:underline font-medium" rel="noopener">${match}</a>`;
    });
  });

  return processedHtml;
}

/**
 * Detectar industrias mencionadas en el contenido
 * Útil para sugerir industrias relacionadas en posts de blog
 * 
 * @param content - Contenido de texto o HTML
 * @returns Array de slugs de industrias detectadas
 */
export function detectIndustriesInContent(content: string): string[] {
  if (!content) return [];

  const detectedIndustries: string[] = [];
  const contentLower = content.toLowerCase();

  industriesMetadata.forEach((industry) => {
    const name = industry.name.toLowerCase();
    
    // Buscar el nombre de la industria en el contenido
    if (contentLower.includes(name)) {
      detectedIndustries.push(industry.slug);
    }

    // Buscar variaciones
    const variations = [
      `seguridad para ${name}`,
      `guardias para ${name}`,
      `seguridad en ${name}`
    ];

    variations.forEach(variation => {
      if (contentLower.includes(variation)) {
        if (!detectedIndustries.includes(industry.slug)) {
          detectedIndustries.push(industry.slug);
        }
      }
    });
  });

  return detectedIndustries;
}

/**
 * Detectar servicios mencionados en el contenido
 * Útil para sugerir servicios relacionados en posts de blog
 * 
 * @param content - Contenido de texto o HTML
 * @returns Array de slugs de servicios detectados
 */
export function detectServicesInContent(content: string): string[] {
  if (!content) return [];

  const detectedServices: string[] = [];
  const contentLower = content.toLowerCase();

  services.forEach((service) => {
    const name = service.name.toLowerCase();
    const slug = service.href.split('/').pop() || '';
    
    // Buscar el nombre del servicio en el contenido
    if (contentLower.includes(name)) {
      detectedServices.push(slug);
    }
  });

  return detectedServices;
}

/**
 * Limpiar y normalizar texto para búsqueda
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .trim();
}

