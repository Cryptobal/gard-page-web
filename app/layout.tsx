import React from 'react';
import { inter, spaceGrotesk } from './fonts';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import CookieConsent from './components/cookie/CookieConsent';
import ClientScripts from './components/ClientScripts';
import ClientWrapper from './ClientWrapper';
import { metadata } from './metadata';
import CanonicalUrl from '@/components/seo/CanonicalUrl';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';

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

        {/* LocalBusiness Schema - Optimizado para SEO Local */}
        <LocalBusinessSchema />
        
        {/* Organization Schema - Información corporativa */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
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
          "description": "Empresa líder en servicios de seguridad privada B2B en Chile, especializada en guardias certificados OS10, sistemas electrónicos y monitoreo 24/7 para minería, logística y edificios corporativos.",
          "foundingDate": "2010",
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "500"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+56229872380",
            "contactType": "customer service",
            "availableLanguage": ["Spanish", "es"],
            "email": "comercial@gard.cl",
            "areaServed": "CL"
          },
          "sameAs": [
            "https://www.facebook.com/gardsecuritycl",
            "https://www.linkedin.com/company/gard-security"
          ],
          "knowsAbout": [
            "Seguridad Privada",
            "Guardias de Seguridad",
            "Seguridad Minera",
            "Certificación OS10",
            "Seguridad Industrial",
            "Monitoreo 24/7"
          ]
        }) }} />

        {/* WebSite Schema - Para búsqueda interna */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Gard Security",
          "url": "https://www.gard.cl",
          "description": "Empresa líder en servicios de seguridad privada B2B en Chile",
          "publisher": {
            "@id": "https://www.gard.cl/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.gard.cl/blog?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        }) }} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClientWrapper>
          <CookieConsent>
            <ClientScripts gtmId={GTM_ID} gaId={GA_ID} />
            
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <SpeedInsights />
            <Analytics />
          </CookieConsent>
        </ClientWrapper>
      </body>
    </html>
  );
} 