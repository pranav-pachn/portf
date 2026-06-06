import { SocialLink } from '../types/nav';
import { site } from './site';

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: site.socials.github },
  { label: 'LinkedIn', href: site.socials.linkedin },
  { label: 'Email', href: `mailto:${site.socials.email}` },
];
