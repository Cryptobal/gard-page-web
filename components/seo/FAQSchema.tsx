import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

/**
 * Componente para generar Schema.org FAQPage
 * Genera rich snippets de preguntas frecuentes en Google
 * Aumenta significativamente el CTR desde resultados de búsqueda
 * 
 * @example
 * <FAQSchema faqs={[
 *   {
 *     question: "¿Cuánto cuesta un guardia de seguridad en Chile?",
 *     answer: "El costo promedio de un guardia de seguridad en Chile..."
 *   }
 * ]} />
 */
export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Componente visual de FAQ que acompaña al schema
 * Usa Accordion de shadcn/ui
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
}

export function FAQSection({ 
  title = "Preguntas Frecuentes",
  description,
  faqs,
  className = ""
}: FAQSectionProps) {
  return (
    <>
      {/* Schema JSON-LD */}
      <FAQSchema faqs={faqs} />
      
      {/* Contenido visual */}
      <section className={`gard-section py-16 md:py-24 ${className}`}>
        <div className="gard-container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">{title}</h2>
            {description && (
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-xl px-6 bg-card hover:shadow-sm transition-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

