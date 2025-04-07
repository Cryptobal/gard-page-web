import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://gard.cl'),
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
  // Agregamos openGraph por defecto
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://gard.cl',
    siteName: 'Gard Security',
    title: 'Gard Security Chile',
    description: 'Empresa líder en seguridad privada para empresas e industrias. Ofrecemos guardias de seguridad, monitoreo 24/7, sistemas de vigilancia y soluciones integrales para proteger tu negocio.',
  },
  robots: {
    index: true,
    follow: true,
  },
}; 