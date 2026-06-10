import { socialLinks } from '@/data/social-links';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t border-border bg-surface">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-text-primary">
              Pranav<span className="text-accent-500">.</span>
            </span>
            <span className="text-xs text-text-muted ml-2">
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-text-secondary hover:text-accent-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
