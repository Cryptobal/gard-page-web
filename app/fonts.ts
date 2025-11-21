import { Inter, Poppins } from 'next/font/google';

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
