import { Inter, Poppins, Space_Grotesk } from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'block',
  fallback: ['system-ui', 'sans-serif'],
  preload: false,
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'block',
  fallback: ['system-ui', 'sans-serif'],
  preload: false,
}); 