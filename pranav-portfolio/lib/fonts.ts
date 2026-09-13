import { Geist, IBM_Plex_Mono, Manrope } from 'next/font/google';

export const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const fontDisplay = Manrope({
  subsets: ['latin'],
  variable: '--font-geist-display', // Keeping variable name same so we don't have to change Tailwind config
  display: 'swap',
});


export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-ibm-mono',
  display: 'swap',
});
