import React from 'react';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  areaServed?: string; // Ej: "Chile", "Santiago", etc.
  provider?: {
    name: string;
    url: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
  offers?: {
    priceRange?: string;
    availability?: string;
  };
}

/**
 * Componente para generar Schema.org Service
 * Ayuda a Google a entender mejor los servicios ofrecidos
 * Puede generar rich snippets con ratings y pricing
 * 
 * @example
 * <ServiceSchema
 *   name="Guardias de Seguridad para Minería"
 *   description="Servicio profesional de guardias..."
 *   url="https://gard.cl/servicios/guardias-de-seguridad"
 *   areaServed="Chile"
 *   aggregateRating={{ ratingValue: 4.9, reviewCount: 127 }}
 *   offers={{ priceRange: "$$$" }}
 * />
 */
export default function ServiceSchema({
  name,
  description,
  url,
  areaServed = 'Chile',
  provider = {
    name: 'Gard Security',
    url: 'https://www.gard.cl'
  },
  aggregateRating,
  offers
}: ServiceSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': name,
    'description': description,
    'url': url,
    'provider': {
      '@type': 'Organization',
      'name': provider.name,
      'url': provider.url
    }
  };

  // Agregar área servida
  if (areaServed) {
    schema.areaServed = {
      '@type': areaServed.includes(',') ? 'City' : 'Country',
      'name': areaServed
    };
  }

  // Agregar rating si existe
  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      'ratingValue': aggregateRating.ratingValue,
      'reviewCount': aggregateRating.reviewCount,
      'bestRating': aggregateRating.bestRating || 5
    };
  }

  // Agregar offers si existe
  if (offers) {
    schema.offers = {
      '@type': 'Offer',
      'availability': offers.availability || 'https://schema.org/InStock'
    };

    if (offers.priceRange) {
      schema.offers.priceRange = offers.priceRange;
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

