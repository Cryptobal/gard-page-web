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
      "streetAddress": "Lo Fontecilla 201, Of. 525",
      "addressLocality": "Las Condes",
      "addressRegion": "Región Metropolitana",
      "postalCode": "7591018",
      "addressCountry": "CL"
    },
    
    // Coordenadas de oficina principal
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.3937,
      "longitude": -70.5369
    },
    
    // Contacto
    "telephone": "+56229872380",
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
    
    // NOTA: aggregateRating removed — Google no muestra stars para reviews self-serving
    // en LocalBusiness schema (política desde 2019). Las reseñas reales se muestran desde
    // Google Business Profile directamente. Si en el futuro se quiere recuperar star ratings,
    // hay que marcar up Product/Service schemas con reviews de terceros verificables.

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
    
    // Misma organización que (para vincular con Organization Schema)
    "sameAs": [
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
