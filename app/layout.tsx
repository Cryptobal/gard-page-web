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
            <script
              dangerouslySetInnerHTML={{
                __html: `window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`
              }}
            />
            <script 
              id="zsiqscript" 
              src="https://salesiq.zohopublic.com/widget?wc=siqcf67a87e344d1bd7848815110805fd06cf8b491c5114559d2ca4e7c9b86dce4c" 
              defer
            />
            <iframe title="Zoho SalesIQ" style={{display:'none'}} />
          </CookieConsent>
        </ClientWrapper>
      </body>
    </html>
  );
} 