import { companyStats } from '@/lib/data/company-stats';

/** URL de WhatsApp comercial con mensaje prellenado (NAP B2B únicamente). */
export function buildCommercialWhatsAppUrl(prefillMessage: string): string {
  return `https://wa.me/${companyStats.commercialWhatsAppWaMe}?text=${encodeURIComponent(prefillMessage)}`;
}
