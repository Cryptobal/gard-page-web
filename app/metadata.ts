import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://gard.cl'),
  title: {
    template: '%s',
    default: 'Gard Security Chile', // Este valor solo se usa si la página hija no define título
  },
  // Eliminamos description por defecto para no sobrescribir los valores específicos
  // Eliminamos keywords por defecto para no sobrescribir los valores específicos
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
  // Eliminamos openGraph por defecto para no sobrescribir los valores específicos
  // Eliminamos twitter por defecto para no sobrescribir los valores específicos
  robots: {
    index: true,
    follow: true,
  },
}; 