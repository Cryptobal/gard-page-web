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
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: itemReviewed.name,
    url: itemReviewed.url,
    ...(itemReviewed.image ? { image: itemReviewed.image } : {}),
    ...(itemReviewed.description ? { description: itemReviewed.description } : {}),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue.toFixed(1),
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating ?? 5,
      worstRating: aggregateRating.worstRating ?? 1,
      ...(verificationUrl ? { url: verificationUrl } : {}),
    },
    ...(verificationUrl ? { sameAs: [verificationUrl] } : {}),
  };

  if (hasVerifiedReviews) {
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
