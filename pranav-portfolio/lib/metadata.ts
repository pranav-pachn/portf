import { Metadata } from 'next';
import { site } from '../data/site';

export function constructMetadata({
  title = site.title,
  description = site.description,
  image = '/og-image.jpg',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: site.socials.github,
    },
    icons,
    metadataBase: new URL(site.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
