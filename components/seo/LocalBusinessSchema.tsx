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
    "description": "Empresa de seguridad privada B2B en Chile con más de 200 guardias certificados OS10 y cobertura en 10 ciudades. Especializada en minería, logística, edificios corporativos, retail, construcción y sector industrial. Monitoreo 24/7, seguridad electrónica, drones y auditoría de seguridad.",
    
    // Dirección principal (Santiago)
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lo Fontecilla 201, Oficina 525",
      "addressLocality": "Las Condes",
      "addressRegion": "Región Metropolitana",
      "postalCode": "7710427",
      "addressCountry": "CL"
    },
    
    // Coordenadas de oficina principal
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.3937,
      "longitude": -70.5369
    },
    
    // Contacto
    "telephone": "+56941137976",
    "email": "comercial@gard.cl",
    
    // Rango de precios
    "priceRange": "$$$",
    
    // Horarios de oficina comercial (según Google Business Profile)
    // Nota: el SERVICIO de guardias opera 24/7, pero la oficina comercial es L-V
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "17:30"
      }
    ],

    // Rating agregado — verificable vía sameAs con Google Business Profile
    // ratingValue 4.9 y reviewCount 57 coinciden con GBP real (verificado 2026-04)
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "bestRating": 5,
      "worstRating": 1,
      "reviewCount": 57
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
      },
      {
        "@type": "Country",
        "name": "Chile"
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

    // Servicio 24/7 — el servicio operacional opera 24/7 aunque la oficina comercial tenga horario
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "description": "Servicio de guardias y central de monitoreo 24/7",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },

    // Misma organización que (para vincular con Organization Schema)
    // GBP URL primero — permite a Google verificar aggregateRating contra reviews reales
    "sameAs": [
      "https://maps.app.goo.gl/q7FTpFhkccqKdHMG8",
      "https://www.linkedin.com/company/gard-security",
      "https://www.facebook.com/gardsecuritycl",
      "https://www.instagram.com/gardsecurity"
    ],
    
    // Fundación
    "foundingDate": "2016",

    // Número de empleados (aproximado)
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "200",
      "unitText": "guardias activos certificados OS10"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
