import React from 'react';
import { inter, spaceGrotesk } from './fonts';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import dynamic from 'next/dynamic';
import CookieConsent from './components/cookie/CookieConsent';

// Lazy load de scripts de terceros para optimizar performance
const GoogleTagManager = dynamic(() => import('./components/GoogleTagManager'), {
  ssr: false
});

const GoogleAnalytics = dynamic(() => import('./components/cookie/ConsentAwareScript').then(mod => ({ default: mod.GoogleAnalytics })), {
  ssr: false
});

const ZohoSalesIQ = dynamic(() => import('./components/ZohoSalesIQ'), {
  ssr: false
});
import ClientWrapper from './ClientWrapper';
import { metadata } from './metadata';
import CanonicalUrl from '@/components/seo/CanonicalUrl';

// Obtener GTM ID desde variables de entorno
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-4XJ2YKYYDH';

// Exportar los metadatos desde el archivo separado
export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* MODIFICACIÓN SEO: Añadir componente para asegurar etiquetas canónicas */}
        <CanonicalUrl />
        {/* Perf: preconnect/dns-prefetch para dominios críticos de imágenes/video */}
        <link rel="preconnect" href="https://imagedelivery.net" />
        <link rel="dns-prefetch" href="https://imagedelivery.net" />
        <link rel="preconnect" href="https://iframe.cloudflarestream.com" />
        <link rel="dns-prefetch" href="https://iframe.cloudflarestream.com" />

        {/* JSON-LD base: Organization + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'Gard Security',
                  url: 'https://www.gard.cl',
                  logo: 'https://www.gard.cl/logos/gard.svg',
                  sameAs: [
                    'https://www.linkedin.com/company/gard-security'
                  ]
                },
                {
                  '@type': ['LocalBusiness', 'SecurityService'],
                  name: 'Gard Security Chile',
                  image: 'https://www.gard.cl/logos/gard.svg',
                  address: { '@type': 'PostalAddress', addressCountry: 'CL' },
                  areaServed: 'CL',
                  telephone: '+56 2 2987 2380',
                  openingHours: ['Mo-Fr 09:00-18:00'],
                  url: 'https://www.gard.cl'
                }
              ]
            })
          }}
        />

        {/* Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Gard Security",
          "url": "https://gard.cl",
          "logo": "https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/195f82cb-9a5e-4964-6fb5-ea43da47b000/public",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+56229872380",
            "contactType": "customer service",
            "availableLanguage": "Spanish"
          },
          "sameAs": [
            "https://www.facebook.com/gardsecuritycl",
            "https://www.linkedin.com/company/gard-security"
          ],
          "foundingDate": "2010",
          "description": "Empresa líder en servicios de seguridad privada en Chile, especializada en guardias de seguridad, sistemas electrónicos y monitoreo 24/7."
        }) }} />

        {/* LocalBusiness Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Gard Security",
          "image": "https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/195f82cb-9a5e-4964-6fb5-ea43da47b000/public",
          "url": "https://gard.cl",
          "telephone": "+56229872380",
          "email": "contacto@gard.cl",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Apoquindo 6410, Oficina 701",
            "addressLocality": "Las Condes",
            "addressRegion": "RM",
            "postalCode": "7550000",
            "addressCountry": "CL"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-33.400000",
            "longitude": "-70.566666"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "priceRange": "$$$",
          "areaServed": "Chile",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios de Seguridad",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Guardias de Seguridad",
                  "description": "Servicio de guardias de seguridad privada para empresas"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Sistemas de Seguridad Electrónica",
                  "description": "Instalación y monitoreo de sistemas de seguridad electrónica"
                }
              }
            ]
          }
        }) }} />

        {/* WebSite Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Gard Security",
          "url": "https://gard.cl",
          "description": "Empresa líder en servicios de seguridad privada en Chile",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://gard.cl/buscar?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }) }} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClientWrapper>
          <CookieConsent>
            {/* Google Tag Manager (solo se carga con consentimiento de analytics) */}
            {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
            
            {/* Google Analytics 4 (solo se carga con consentimiento de analytics) */}
            <GoogleAnalytics measurementId={GA_ID} />
            
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <SpeedInsights />
            <Analytics />
            <ZohoSalesIQ />
          </CookieConsent>
        </ClientWrapper>
      </body>
    </html>
  );
} 