import { socialLinks } from '@/data/social-links';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="py-12 md:py-16 border-t border-border bg-surface">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Left Side */}
          <div className="flex flex-col gap-2">
            <span className="font-display font-bold text-xl text-text-primary">
              Pranav.
            </span>
            <span className="text-sm text-text-secondary font-medium">
              Software Engineer - Full-Stack Developer
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
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/50">
          <span className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Pranav Pachunoori
          </span>
        </div>
      </Container>
    </footer>
  );
}
