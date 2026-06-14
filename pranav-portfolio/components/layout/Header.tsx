'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLink } from '@/components/ui/AnimatedLink';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/nav-links';
import { useActiveSection } from '@/hooks/use-active-section';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const sectionIds = navLinks.map((link) => link.href.replace('/#', ''));
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  if (pathname !== '/') return null;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]',
        isScrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-border py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl tracking-tight text-text-primary transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Pranav<span className="text-accent-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('/#', '');
            return (
              <AnimatedLink
                key={link.href}
                href={link.href}
                active={isActive}
              >
                {link.label}
              </AnimatedLink>
            );
          })}
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden shadow-md rounded-b-[var(--radius-xl)]"
          >
            <div className="flex flex-col px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('/#', '');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-md text-base font-medium transition-colors",
                      isActive 
                        ? "bg-accent-500/10 text-accent-500" 
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
