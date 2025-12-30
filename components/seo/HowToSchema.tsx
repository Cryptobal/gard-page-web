import React from 'react';

interface HowToStepInput {
  name: string;
  text: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStepInput[];
  totalTime?: string; // ISO 8601 duration e.g. PT30M
  estimatedCost?: {
    currency: string;
    value: number;
  };
}

/**
 * HowToSchema - JSON-LD para guías paso a paso.
 * Facilita respuestas directas de IAs para procesos (ej: obtener OS10, contratar guardias).
 */
export default function HowToSchema({ name, description, steps, totalTime, estimatedCost }: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    ...(estimatedCost
      ? {
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: estimatedCost.currency,
            value: estimatedCost.value,
          },
        }
      : {}),
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
