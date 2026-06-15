import React from 'react';

interface ReviewAuthor {
  name: string;
  type?: 'Person' | 'Organization';
}

interface ReviewItem {
  author: ReviewAuthor;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
  name?: string;
  url?: string;
}

interface AggregateRatingInput {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

interface ReviewSchemaProps {
  itemReviewed: {
    name: string;
    url: string;
    type?: 'Service' | 'Organization' | 'LocalBusiness';
    image?: string;
    description?: string;
  };
  aggregateRating: AggregateRatingInput;
  /**
   * Opcional. Solo incluir si hay testimonios VERIFICADOS (consentimiento
   * escrito del cliente). Si se pasan reviews inventados, Google puede
   * clasificar el schema como "self-serving review" y aplicar manual
   * action. En su ausencia, el schema emite solo aggregateRating y sameAs.
   */
  reviews?: ReviewItem[];
  /**
   * URL externa de verificación del rating (ej: Google Business Profile).
   * CRÍTICO pasar esto cuando se use aggregateRating — evita clasificación
   * como "self-serving review" por parte de Google (política 2019+).
   */
  verificationUrl?: string;
}

/**
 * ReviewSchema - JSON-LD para reseñas y rating agregado
 * Optimiza rich snippets y ayuda a las IAs a citar evidencias verificables.
 */
export default function ReviewSchema({ itemReviewed, aggregateRating, reviews, verificationUrl }: ReviewSchemaProps) {
  const hasVerifiedReviews = Array.isArray(reviews) && reviews.length > 0;
  // Usar el tipo real de la entidad. Antes se forzaba @type "Product" para
  // obtener estrellas en SERP, pero marcar a la empresa como Product es
  // markup engañoso (riesgo de manual action). Para LocalBusiness/Organization
  // se enlaza con @id a la entidad global de LocalBusinessSchema para que los
  // validadores las fusionen en vez de crear una entidad duplicada.
  // Sin reviews verificados no hay nada que emitir: el aggregateRating de la
  // propia empresa es "self-serving review" (política Google 2019+) y Search
  // Console lo marca como inválido. Las estrellas en SERP vienen del Google
  // Business Profile. Solo emitimos schema cuando hay testimonios con
  // consentimiento explícito en lib/data/testimonials.ts.
  if (!hasVerifiedReviews) {
    return null;
  }

  const entityType = itemReviewed.type ?? 'LocalBusiness';
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': entityType,
    ...(entityType === 'LocalBusiness' || entityType === 'Organization'
      ? { '@id': 'https://www.gard.cl/#organization' }
      : {}),
    name: itemReviewed.name,
    url: itemReviewed.url,
    ...(itemReviewed.image ? { image: itemReviewed.image } : {}),
    ...(itemReviewed.description ? { description: itemReviewed.description } : {}),
    ...(verificationUrl ? { sameAs: [verificationUrl] } : {}),
  };

  schema.review = reviews!.map((review) => ({
    '@type': 'Review',
    name: review.name ?? `${itemReviewed.name} - Reseña`,
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
      bestRating: aggregateRating.bestRating ?? 5,
      worstRating: aggregateRating.worstRating ?? 1,
    },
    author: {
      '@type': review.author.type ?? 'Person',
      name: review.author.name,
    },
    ...(review.url ? { url: review.url } : {}),
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
