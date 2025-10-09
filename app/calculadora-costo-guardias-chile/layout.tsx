import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora: Cuánto Cuesta un Guardia de Seguridad en Chile 2025',
  description: 'Calcule el costo estimado de guardias de seguridad para su empresa en Chile. Precios actualizados 2025 por industria, ciudad y turno. Incluye tabla comparativa y descuentos por volumen.',
  keywords: ['cuánto cuesta guardia seguridad chile', 'precio guardias seguridad', 'costo seguridad privada chile', 'tarifas guardias 2025', 'calculadora costo guardias'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/calculadora-costo-guardias-chile' },
  openGraph: {
    title: 'Calculadora de Costo: Guardias de Seguridad Chile 2025',
    description: 'Estime el costo mensual de guardias para su empresa. Precios actualizados por industria y ciudad.',
    url: 'https://www.gard.cl/calculadora-costo-guardias-chile',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website'
  }
};

export default function CalculadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

