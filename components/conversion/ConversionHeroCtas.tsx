import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { buildCommercialWhatsAppUrl } from '@/lib/conversion/commercialWhatsApp';
import { companyStats } from '@/lib/data/company-stats';

type ConversionHeroCtasProps = {
  whatsAppPrefill: string;
  secondaryAnchor?: { href: string; label: string };
};

/** CTAs de hero: Cotizar + WhatsApp comercial + SLA (patrón plantilla de oro). */
export default function ConversionHeroCtas({
  whatsAppPrefill,
  secondaryAnchor,
}: ConversionHeroCtasProps) {
  const whatsAppUrl = buildCommercialWhatsAppUrl(whatsAppPrefill);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="#cotizar"
          className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center"
        >
          Cotizar ahora
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gard-btn bg-white/10 text-white backdrop-blur-sm border border-white/30 hover:bg-white/20 gard-btn-lg inline-flex items-center"
        >
          <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
          WhatsApp comercial
        </a>
      </div>
      <p className="text-sm text-white/80 mt-5 max-w-xl mx-auto">
        Respuesta comercial en {companyStats.commercialResponseSla}. Sin compromiso.
      </p>
      {secondaryAnchor && (
        <p className="text-sm text-white/60 mt-3">
          <a href={secondaryAnchor.href} className="underline hover:text-white/90">
            {secondaryAnchor.label}
          </a>
        </p>
      )}
    </>
  );
}
