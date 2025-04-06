'use client';

import React from 'react';
import { FAQItem } from '@/lib/data/faq';

interface SEOFAQProps {
  faqs: FAQItem[];
  industria: string;
  servicio: string;
}

export default function SEOFAQ({ faqs, industria, servicio }: SEOFAQProps) {
  // Si no hay FAQs, no renderizar nada
  if (!faqs || faqs.length === 0) return null;
  
  // Formatear los nombres para mostrarlos correctamente
  const industriaFormatted = industria.replace(/-/g, ' ');
  const servicioFormatted = servicio.replace(/-/g, ' ');
  
  // Crear el objeto JSON-LD para FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  // Crear el objeto JSON-LD para Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${servicioFormatted} para ${industriaFormatted}`,
    "description": `Servicios profesionales de ${servicioFormatted} especializados para el sector ${industriaFormatted}. Gard Security ofrece soluciones de seguridad personalizadas.`,
    "provider": {
      "@type": "Organization",
      "name": "Gard Security",
      "url": "https://gard.cl"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Chile"
    },
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": industriaFormatted
    }
  };
  
  // Combinamos los esquemas en un array
  const schemas = [faqSchema, serviceSchema];
  
  return (
    <>
      {schemas.map((schema, index) => (
        <script 
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
} 