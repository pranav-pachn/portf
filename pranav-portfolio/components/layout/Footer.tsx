import { socialLinks } from '@/data/social-links';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 md:py-16 border-t border-[var(--surface-border)] bg-transparent text-[var(--surface-text)]">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Left Side */}
          <div className="flex flex-col gap-1.5">
            <span className="font-display font-semibold tracking-[-0.03em] text-xl text-[var(--surface-text)]">
              Pranav<span className="text-accent-500">.</span>
            </span>
            <span className="text-sm text-[var(--surface-muted)] font-normal">
              Full-Stack & AI Product Engineer
            </span>
          </div>
          
          {/* Right Side */}
          <div className="flex flex-wrap items-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--surface-muted)] hover:text-[var(--surface-text)] transition-colors font-mono text-xs uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[var(--surface-border)] font-mono text-[11px] text-[var(--surface-muted)] tracking-wider">
          <span>
            &copy; {new Date().getFullYear()} PRANAV PACHUNOORI · CRAFTED WITH PURPOSE
          </span>
          <span className="text-[var(--surface-muted)]">
            NEXT.JS 16 · TAILWIND CSS · GSAP & MOTION
          </span>
        </div>
      </div>
    </footer>
  );
}
