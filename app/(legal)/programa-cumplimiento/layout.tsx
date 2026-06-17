import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programa de Cumplimiento | Gard Security',
  description:
    'Programa de cumplimiento normativo de Gard Security: ética, prevención de delitos y buenas prácticas en seguridad privada en Chile.',
  alternates: {
    canonical: 'https://www.gard.cl/programa-cumplimiento',
    languages: {
      'es-CL': 'https://www.gard.cl/programa-cumplimiento',
      'x-default': 'https://www.gard.cl/programa-cumplimiento',
    },
  },
};

export default function ProgramaCumplimientoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
