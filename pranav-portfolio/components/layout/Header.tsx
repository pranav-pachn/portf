'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLink } from '@/components/ui/AnimatedLink';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/nav-links';
import { useActiveSection } from '@/hooks/use-active-section';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { cn } from '@/lib/utils';
import { scrollToSection } from '@/lib/scroll';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const sectionIds = navLinks.map((link) => link.href.replace('/#', ''));
  const activeSection = useActiveSection(sectionIds);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Hide if scrolling down and past 80px, show if scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  if (pathname !== '/') return null;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]',
        isHidden 
          ? 'opacity-0 -translate-y-full pointer-events-none'
          : isScrolled
            ? 'bg-surface/80 backdrop-blur-md border-b border-border py-3 shadow-sm translate-y-0 opacity-100'
            : 'bg-transparent py-5 translate-y-0 opacity-100'
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
          <div className="pl-6 border-l border-border/50">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] rounded-md p-2"
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
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      scrollToSection(e, link.href);
                    }}
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
