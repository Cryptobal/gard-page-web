import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gard.cl'),
  title: {
    template: '%s',
    default: 'Gard Security Chile', // Este valor solo se usa si la página hija no define título
  },
  // Agregamos una descripción por defecto para resolver el problema de páginas sin metadescripción
  description: 'Empresa líder en seguridad privada para empresas e industrias. Ofrecemos guardias de seguridad, monitoreo 24/7, sistemas de vigilancia y soluciones integrales para proteger tu negocio.',
  // Agregamos keywords por defecto
  keywords: 'seguridad privada, guardias de seguridad, empresa de seguridad, vigilancia, protección, Gard Security, Chile',
  authors: [{ name: 'Gard Security' }],
  creator: 'Gard Security',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
    ],
    apple: { url: '/icons/icon-192x192.png', sizes: '192x192' },
    other: [
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  // OpenGraph por defecto: og-default.png self-hosted como primario, Cloudflare como fallback
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://www.gard.cl',
    siteName: 'Gard Security',
    title: 'Gard Security Chile',
    description: 'Empresa líder en seguridad privada para empresas e industrias. Ofrecemos guardias de seguridad, monitoreo 24/7, sistemas de vigilancia y soluciones integrales para proteger tu negocio.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Gard Security — Empresa de Seguridad Privada en Chile',
        type: 'image/png',
      },
      {
        url: 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/4824f8b9-abb0-4e77-c654-efe920697b00/public',
        width: 1200,
        height: 630,
        alt: 'Gard Security — Empresa de Seguridad Privada en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gard Security Chile',
    description: 'Empresa líder en seguridad privada para empresas e industrias en Chile.',
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: 'https://www.gard.cl',
    languages: {
      'es-CL': 'https://www.gard.cl',
      'x-default': 'https://www.gard.cl',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}; 