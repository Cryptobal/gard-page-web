export const metadata = {
  title: 'Trabaja con Nosotros | Gard Security',
  description: 'Postula para ser guardia de seguridad en Gard Security. Estabilidad, pagos puntuales y formación continua. Súmate a una empresa de excelencia.',
  // Segregación de intención: www.gard.cl se indexa como dominio 100% comercial B2B.
  // La intención de empleo/postulante se concentra en trabajo.gard.cl. Esta página
  // sigue accesible y funcional para postular (200), pero se desindexa (noindex) para
  // no competir por keywords de empleo desde el dominio comercial ni diluir la
  // intención de compra. `follow` se mantiene para no bloquear el flujo de enlaces.
  // IMPORTANTE: no bloquear /reclutamiento en robots.txt — Google necesita rastrear
  // la página para leer y procesar esta directiva noindex.
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://www.gard.cl/reclutamiento',
    languages: {
      'es-CL': 'https://www.gard.cl/reclutamiento',
      'x-default': 'https://www.gard.cl/reclutamiento',
    },
  },
};

export default function ReclutamientoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
