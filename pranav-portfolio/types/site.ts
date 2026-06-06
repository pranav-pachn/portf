import { SocialLink } from './nav';

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  url: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}
