'use client';

import dynamic from 'next/dynamic';

// Lazy load de scripts de terceros para optimizar performance
const GoogleTagManager = dynamic(() => import('../components/GoogleTagManager'), {
  ssr: false
});

const GoogleAnalytics = dynamic(() => import('../components/cookie/ConsentAwareScript').then(mod => ({ default: mod.GoogleAnalytics })), {
  ssr: false
});

const ZohoSalesIQ = dynamic(() => import('../components/ZohoSalesIQ'), {
  ssr: false
});

interface ClientScriptsProps {
  gtmId?: string;
  gaId: string;
}

export default function ClientScripts({ gtmId, gaId }: ClientScriptsProps) {
  return (
    <>
      {/* Google Tag Manager (solo se carga con consentimiento de analytics) */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      
      {/* Google Analytics 4 (solo se carga con consentimiento de analytics) */}
      <GoogleAnalytics measurementId={gaId} />
      
      {/* Zoho SalesIQ */}
      <ZohoSalesIQ />
    </>
  );
}

