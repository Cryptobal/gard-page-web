import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ley Karin — Canal de Denuncias | Gard Security',
  description:
    'Canal de denuncias de Gard Security bajo la Ley Karin (Ley 21.643): prevención del acoso laboral y sexual. Procedimiento confidencial y seguro.',
  alternates: {
    canonical: 'https://www.gard.cl/ley-karin',
    languages: {
      'es-CL': 'https://www.gard.cl/ley-karin',
      'x-default': 'https://www.gard.cl/ley-karin',
    },
  },
};

export default function LeyKarinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
