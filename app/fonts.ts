import { Inter, Poppins, Chivo, JetBrains_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
  adjustFontFallback: false, // Optimización para mobile
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
  adjustFontFallback: false, // Optimización para mobile
});

// Display font del shell móvil de consola. Se deja `adjustFontFallback` en su
// valor por defecto (true) para que Next genere una cara de respaldo ajustada
// en métricas y minimice el CLS al hacer swap. `preload: false` evita competir
// con los recursos críticos del LCP; con `display: 'swap'` el texto se pinta de
// inmediato en la fuente de respaldo.
export const chivo = Chivo({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-chivo',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: false,
});

// Fuente mono para etiquetas de datos del shell (ops strip, tab bar).
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  preload: false,
});
