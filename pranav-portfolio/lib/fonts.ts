import { Geist, IBM_Plex_Mono } from 'next/font/google';

export const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const fontDisplay = Geist({
  subsets: ['latin'],
  variable: '--font-geist-display',
  display: 'swap',
});

export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-ibm-mono',
  display: 'swap',
});
