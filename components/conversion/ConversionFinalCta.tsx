import Link from 'next/link';
import { ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { buildCommercialWhatsAppUrl } from '@/lib/conversion/commercialWhatsApp';
import { companyStats } from '@/lib/data/company-stats';

type ConversionFinalCtaProps = {
  title: string;
  description: string;
  whatsAppPrefill: string;
};

/** Banda CTA final con Cotizar, WhatsApp comercial y SLA verificable. */
export default function ConversionFinalCta({
  title,
  description,
  whatsAppPrefill,
}: ConversionFinalCtaProps) {
  const whatsAppUrl = buildCommercialWhatsAppUrl(whatsAppPrefill);

  return (
    <section className="gard-section py-16 bg-primary text-white">
      <div className="gard-container max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium mb-6">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>Cotización en {companyStats.commercialResponseSla}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-title">{title}</h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#cotizar"
            className="gard-btn bg-white text-primary hover:bg-white/90 gard-btn-lg inline-flex items-center"
          >
            Solicitar cotización
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gard-btn bg-white/10 text-white border border-white/30 hover:bg-white/20 gard-btn-lg inline-flex items-center"
          >
            <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
            WhatsApp comercial
          </a>
        </div>
      </div>
    </section>
  );
}
