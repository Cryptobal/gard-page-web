import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotiza Servicios de Seguridad | Gard Security',
  description: 'Calcula y solicita una cotización en línea para servicios de seguridad privada, guardias, monitoreo y soluciones adaptadas a tu empresa.',
  keywords: ['cotizar seguridad privada', 'presupuesto guardias', 'cotización servicios de seguridad', 'cotizar empresa de guardias'],
  authors: [{ name: 'Gard Security', url: 'https://www.gard.cl' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Cotiza Seguridad Privada | Gard Security',
    description: 'Completa nuestro cotizador online y recibe una propuesta personalizada para proteger tu empresa.',
    url: 'https://www.gard.cl/cotizar',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/4824f8b9-abb0-4e77-c654-efe920697b00/public',
        width: 1200,
        height: 630,
        alt: 'Cotiza Servicios de Seguridad | Gard Security',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cotiza Seguridad Privada | Gard Security',
    description: 'Cotización personalizada en menos de 12 horas hábiles.',
  },
}; 