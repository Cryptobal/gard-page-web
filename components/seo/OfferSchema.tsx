import React from 'react';

type UnitText =
  | 'MONTH'
  | 'DAY'
  | 'HOUR'
  | 'WEEK'
  | 'YEAR'
  | 'SERVICE';

interface PriceItem {
  name: string;
  description: string;
  price: number;
  priceCurrency?: string;
  unitText?: UnitText;
  referenceUrl?: string;
  category?: string;
}

interface OfferSchemaProps {
  serviceName: string;
  serviceDescription: string;
  url: string;
  prices: PriceItem[];
}

/**
 * OfferSchema - JSON-LD con UnitPriceSpecification para precios por industria/servicio.
 * Ayuda a responder queries de costo en IAs y a habilitar rich results de ofertas.
 */
export default function OfferSchema({ serviceName, serviceDescription, url, prices }: OfferSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    url,
    offers: prices.map((price) => ({
      '@type': 'Offer',
      url,
      name: price.name,
      description: price.description,
      priceCurrency: price.priceCurrency ?? 'CLP',
      price: price.price,
      category: price.category,
      unitPriceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: price.price,
        priceCurrency: price.priceCurrency ?? 'CLP',
        unitText: price.unitText ?? 'MONTH',
      },
      availability: 'https://schema.org/InStock',
      ...(price.referenceUrl ? { url: price.referenceUrl } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
