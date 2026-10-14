'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatedLink } from '@/components/ui/AnimatedLink';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/data/nav-links';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { useLenis } from '@/components/layout/ScrollOrchestrator';

export function Header() {
  const sectionIds = ['hero', ...navLinks.map((link) => link.href.replace('/#', ''))];
  const activeSection = useActiveSection(sectionIds);
  const [isScrolled, setIsScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = lenis ? lenis.scroll : window.scrollY;
      setIsScrolled(scrollY > 20);
    };
    handleScroll();
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lenis]);

  const pathname = usePathname();
  if (pathname !== '/') return null;

  const isDark = activeSection === 'about' || activeSection === 'contact';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isScrolled
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 bg-transparent border-b border-transparent'
      )}
    >
      <div
        className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between h-[80px] lg:h-[84px]"
      >
        {/* Left Aligned: Logo flush with Hero container left edge */}
        <Link
          href="/"
          className={cn(
            'font-display font-[600] text-[20px] tracking-[-0.03em] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer',
            isDark ? 'text-[#F2F0EA]' : 'text-text-primary'
          )}
        >
          Pranav<span className="text-accent-500">.</span>
        </Link>

        {/* Desktop Navigation: Permanent horizontal navbar flush with right edge */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 xl:gap-12 md:pr-14 lg:pr-16">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('/#', '');
            return (
              <AnimatedLink
                key={link.href}
                href={link.href}
                active={isActive}
                theme={isDark ? 'dark' : 'light'}
              >
                {link.label}
              </AnimatedLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
