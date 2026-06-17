import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Código de Ética | Gard Security',
  description:
    'Código de ética de Gard Security: valores, conducta profesional y compromisos de nuestros guardias y equipo en todo Chile.',
  alternates: {
    canonical: 'https://www.gard.cl/codigo-etica',
    languages: {
      'es-CL': 'https://www.gard.cl/codigo-etica',
      'x-default': 'https://www.gard.cl/codigo-etica',
    },
  },
};

export default function CodigoEticaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
