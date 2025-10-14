import React from 'react';

/**
 * LocalBusiness Schema para SEO Local
 * Ayuda a aparecer en búsquedas "cerca de mí", Google Maps y Knowledge Panel
 * 
 * @see https://schema.org/LocalBusiness
 */
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.gard.cl/#organization",
    "name": "Gard Security",
    "alternateName": "Gard Security SpA",
    "legalName": "Gard Security SpA",
    "url": "https://www.gard.cl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.gard.cl/logos/gard.svg",
      "width": "250",
      "height": "60"
    },
    "image": "https://www.gard.cl/logos/gard.svg",
    "description": "Empresa líder en seguridad privada B2B en Chile. Especializada en guardias certificados OS10, monitoreo 24/7, seguridad electrónica y soluciones integrales para minería, logística y edificios corporativos.",
    
    // Dirección principal (Santiago)
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Apoquindo 6410, Of. 701",
      "addressLocality": "Las Condes",
      "addressRegion": "Región Metropolitana",
      "postalCode": "7560969",
      "addressCountry": "CL"
    },
    
    // Coordenadas de oficina principal
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.4124,
      "longitude": -70.5767
    },
    
    // Contacto
    "telephone": "+56-2-XXXX-XXXX", // TODO: Actualizar con teléfono real
    "email": "comercial@gard.cl",
    
    // Rango de precios
    "priceRange": "$$$",
    
    // Horarios (servicio 24/7)
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    
    // Rating agregado
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "127"
    },
    
    // Áreas de servicio
    "areaServed": [
      {
        "@type": "City",
        "name": "Santiago",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región Metropolitana"
        }
      },
      {
        "@type": "City",
        "name": "Antofagasta",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región de Antofagasta"
        }
      },
      {
        "@type": "City",
        "name": "Valparaíso",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región de Valparaíso"
        }
      },
      {
        "@type": "City",
        "name": "Concepción",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región del Biobío"
        }
      },
      {
        "@type": "City",
        "name": "Iquique",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región de Tarapacá"
        }
      },
      {
        "@type": "City",
        "name": "Puerto Montt",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región de Los Lagos"
        }
      },
      {
        "@type": "City",
        "name": "Rancagua",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región de O'Higgins"
        }
      },
      {
        "@type": "City",
        "name": "Chillán",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región de Ñuble"
        }
      },
      {
        "@type": "City",
        "name": "Temuco",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región de La Araucanía"
        }
      },
      {
        "@type": "City",
        "name": "Viña del Mar",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Región de Valparaíso"
        }
      }
    ],
    
    // Industrias/servicios que ofrece
    "knowsAbout": [
      "Seguridad Privada",
      "Guardias de Seguridad",
      "Seguridad Minera",
      "Certificación OS10",
      "Seguridad Industrial",
      "Seguridad para Bodegas",
      "Seguridad Electrónica",
      "Monitoreo 24/7",
      "Central de Monitoreo",
      "Seguridad Perimetral",
      "Control de Accesos",
      "CCTV",
      "Vigilancia Corporativa"
    ],
    
    // Misma organización que (para vincular con Organization Schema)
    "sameAs": [
      "https://www.linkedin.com/company/gard-security",
      "https://www.facebook.com/gardsecurity",
      "https://www.instagram.com/gardsecurity",
      // TODO: Agregar redes sociales reales
    ],
    
    // Fundación
    "foundingDate": "2010",
    
    // Número de empleados (aproximado)
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "500"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

