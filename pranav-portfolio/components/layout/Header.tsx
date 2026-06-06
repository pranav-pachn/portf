'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/nav-links';
import { ThemeToggle } from './ThemeToggle';
import { useActiveSection } from '@/hooks/use-active-section';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const sectionIds = navLinks.map((link) => link.href.substring(1));
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]',
        isScrolled
          ? 'bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)] py-3 shadow-[var(--shadow-sm)]'
          : 'bg-transparent py-5'
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-[var(--text-xl)] tracking-tight text-[var(--color-text-primary)] transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Pranav<span className="text-[var(--color-accent-500)]">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-[var(--text-sm)] font-medium transition-colors py-1 hover:text-[var(--color-accent-500)]',
                  isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent-500)] rounded-[var(--radius-full)] shadow-[var(--shadow-glow)]"
                  />
                )}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[var(--color-text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] rounded-md"
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
            className="md:hidden bg-[var(--color-surface)] border-b border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-md)] rounded-b-[var(--radius-xl)]"
          >
            <div className="flex flex-col px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-[var(--radius-md)] text-[var(--text-base)] font-medium transition-colors",
                      isActive 
                        ? "bg-[var(--color-accent-500)]/10 text-[var(--color-accent-500)]" 
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
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
