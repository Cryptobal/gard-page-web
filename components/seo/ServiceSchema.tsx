import React from 'react';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  category?: string;
  areaServed?: string | Array<{ type: 'City' | 'Country'; name: string }>;
  provider?: {
    name: string;
    url: string;
  };
  audience?: {
    audienceType: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
  offers?: {
    priceRange?: string;
    availability?: string;
    priceCurrency?: string;
    priceDescription?: string;
    url?: string;
  };
  hasOfferCatalog?: {
    name: string;
    items: Array<{ name: string; url: string }>;
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
 *   url="https://www.gard.cl/servicios/guardias-de-seguridad"
 *   areaServed="Chile"
 *   aggregateRating={{ ratingValue: 4.9, reviewCount: 57 }} // verificable vía provider.@id
 *   offers={{ priceRange: "$$$" }}
 * />
 */
export default function ServiceSchema({
  name,
  description,
  url,
  serviceType,
  category,
  areaServed = 'Chile',
  provider = {
    name: 'Gard Security',
    url: 'https://www.gard.cl'
  },
  audience,
  aggregateRating,
  offers,
  hasOfferCatalog
}: ServiceSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': name,
    'description': description,
    'url': url,
    'provider': {
      '@type': 'Organization',
      '@id': 'https://www.gard.cl/#organization',
      'name': provider.name,
      'url': provider.url
    }
  };

  if (serviceType) schema.serviceType = serviceType;
  if (category) schema.category = category;

  // Agregar área servida (string simple o array de ciudades/países)
  if (Array.isArray(areaServed)) {
    schema.areaServed = areaServed.map((a) => ({ '@type': a.type, 'name': a.name }));
  } else if (areaServed) {
    schema.areaServed = {
      '@type': areaServed.includes(',') ? 'City' : 'Country',
      'name': areaServed
    };
  }

  if (audience) {
    schema.audience = {
      '@type': 'BusinessAudience',
      'audienceType': audience.audienceType
    };
  }

  // Agregar rating si existe
  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      'ratingValue': aggregateRating.ratingValue,
      'reviewCount': aggregateRating.reviewCount,
      'bestRating': aggregateRating.bestRating || 5,
      'worstRating': 1
    };
  }

  // Agregar offers si existe
  if (offers) {
    schema.offers = {
      '@type': 'Offer',
      'availability': offers.availability || 'https://schema.org/InStock'
    };

    if (offers.priceRange) schema.offers.priceRange = offers.priceRange;
    if (offers.priceCurrency) schema.offers.priceCurrency = offers.priceCurrency;
    if (offers.url) schema.offers.url = offers.url;
    if (offers.priceDescription) {
      schema.offers.priceSpecification = {
        '@type': 'PriceSpecification',
        'priceCurrency': offers.priceCurrency || 'CLP',
        'description': offers.priceDescription
      };
    }
  }

  if (hasOfferCatalog) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      'name': hasOfferCatalog.name,
      'itemListElement': hasOfferCatalog.items.map((item) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': item.name,
          'url': item.url
        }
      }))
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

