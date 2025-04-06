import React from 'react';
import { inter, poppins } from './fonts';
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
      <body className={`${inter.variable} ${poppins.variable}`}>
        {/* Sistema de gestión de consentimiento de cookies */}
        <CookieConsent>
          {/* Google Tag Manager (solo se carga con consentimiento de analytics) */}
          {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
          
          {/* Google Analytics 4 (solo se carga con consentimiento de analytics) */}
          <GoogleAnalytics measurementId={GA_ID} />
          
          <ClientWrapper>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ClientWrapper>
          
          {/* Estos scripts siempre se cargan porque están exentos del consentimiento */}
          <SpeedInsights />
          <Analytics />
        </CookieConsent>
      </body>
    </html>
  );
} 