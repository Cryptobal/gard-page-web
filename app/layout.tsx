import React from 'react';
import { inter, spaceGrotesk } from './fonts';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import GoogleTagManager from './components/GoogleTagManager';
import CookieConsent from './components/cookie/CookieConsent';
import { GoogleAnalytics } from './components/cookie/ConsentAwareScript';
import ZohoSalesIQ from './components/ZohoSalesIQ';
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