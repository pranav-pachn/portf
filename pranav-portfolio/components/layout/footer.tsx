import { socialLinks } from '@/data/social-links';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Pranav Pachunoori. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-500)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
