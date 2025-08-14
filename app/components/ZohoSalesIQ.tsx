'use client';

import React from 'react';
import Script from 'next/script';
import ConsentAwareScript from '@/app/components/cookie/ConsentAwareScript';
import { useConsent } from '@/app/hooks/useConsent';

export default function ZohoSalesIQ() {
  const { consent, hasInteracted } = useConsent();
  const canLoad = hasInteracted && consent.marketing;

  if (!canLoad) return null;

  return (
    <>
      <Script
        id="zsiq-init"
        strategy="afterInteractive"
      >{`
        window.$zoho=window.$zoho || {}; $zoho.salesiq=$zoho.salesiq||{ready:function(){}};
      `}</Script>
      <ConsentAwareScript
        src="https://salesiq.zohopublic.com/widget?wc=siqcf67a87e344d1bd7848815110805fd06cf8b491c5114559d2ca4e7c9b86dce4c"
        id="zsiqscript"
        type="marketing"
      />
    </>
  );
}


