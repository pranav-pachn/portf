'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { featuredProjects } from '@/data/featured-projects';
import { scrollToSection } from '@/lib/scroll';
import { useActiveSection } from '@/hooks/use-active-section';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const chapters = [
  { num: '01', label: 'Work',       href: '/#work',       id: 'work' },
  { num: '02', label: 'Services',   href: '/#services',   id: 'services' },
  { num: '03', label: 'About',      href: '/#about',      id: 'about' },
  { num: '04', label: 'Experience', href: '/#experience', id: 'experience' },
  { num: '05', label: 'Contact',    href: '/#contact',    id: 'contact' },
];

const SECTION_IDS = ['hero', 'work', 'services', 'about', 'experience', 'contact'];

export function FloatingMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const activeSection = useActiveSection(SECTION_IDS);

  const isWorkRoute = pathname.startsWith('/work/');
  const slug = isWorkRoute ? pathname.split('/')[2] : null;

  // Close menu and restore scroll on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock background scroll, halt Lenis, and trigger underlying page receding effect
  useEffect(() => {
    if (isOpen) {
      document.documentElement.setAttribute('data-menu-open', 'true');
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop();
    } else {
      document.documentElement.removeAttribute('data-menu-open');
      document.body.style.overflow = '';
      window.__lenis?.start();
    }

    return () => {
      document.documentElement.removeAttribute('data-menu-open');
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [isOpen]);

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (pathname === '/') {
      setTimeout(() => {
        const id = href.replace('/#', '').replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { duration: 1.0 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          window.history.pushState(null, '', href);
        }
      }, 80);
    } else {
      window.location.href = href;
    }
  }, [pathname]);

  const currentProject = isWorkRoute && slug
    ? featuredProjects.find((p) => p.id === slug)
    : null;

  const isDarkSection = !isOpen && (activeSection === 'about' || activeSection === 'contact');

  return (
    <>
      {/* ── Circular Morphing Menu Button (Available across all screen sizes) ───── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'fixed top-3.5 right-4 sm:top-4 sm:right-6 md:top-3.5 md:right-8 lg:top-4 lg:right-10 z-50 group flex items-center justify-center rounded-full select-none outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2',
          'w-11 h-11 sm:w-12 sm:h-12 border transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] active:scale-[0.97]',
          isOpen
            ? 'bg-white text-[#171715] border-[#D8D4CA] shadow-[0_2px_12px_rgba(23,23,21,0.06)]'
            : 'bg-[var(--surface-bg)] text-[var(--surface-text)] border-[var(--surface-border)] shadow-[0_2px_14px_rgba(0,0,0,0.12)] hover:border-accent-500/50'
        )}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>

        {/* Three fine lines morphing into X */}
        <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
          {/* Top Line */}
          <span
            className={cn(
              'absolute h-[1.5px] w-4 rounded-full origin-center transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              isOpen ? 'bg-[#171715] translate-y-0 rotate-45' : 'bg-[var(--surface-text)] -translate-y-[4.5px] group-hover:-translate-y-[3.5px]'
            )}
          />

          {/* Middle Line */}
          <span
            className={cn(
              'absolute h-[1.5px] w-4 rounded-full origin-center transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              isOpen ? 'opacity-0 scale-x-0' : 'bg-[var(--surface-text)] translate-y-0 opacity-100 scale-x-100'
            )}
          />

          {/* Bottom Line */}
          <span
            className={cn(
              'absolute h-[1.5px] w-4 rounded-full origin-center transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              isOpen ? 'bg-[#171715] translate-y-0 -rotate-45' : 'bg-[var(--surface-text)] translate-y-[4.5px] group-hover:translate-y-[3.5px]'
            )}
          />
        </div>
      </button>

      {/* ── Refined Mobile Full-Screen Navigation Overlay ─────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-editorial-fullscreen-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-40 bg-bg text-text-primary flex flex-col justify-between overflow-y-auto overflow-x-hidden selection:bg-accent-500 selection:text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Top Bar: PRANAV. on left, close space on right */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 pt-5 pb-4 flex items-center justify-between select-none shrink-0 border-b border-border/50">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="font-editorial font-medium text-[19px] tracking-[-0.03em] text-text-primary transition-opacity hover:opacity-80"
              >
                Pranav<span className="text-accent-500">.</span>
              </Link>

              <div className="font-mono text-xs text-text-muted tracking-wider pr-14">
                2026
              </div>
            </div>

            {/* Main Stage: Compact, Tighter Mobile Navigation Links */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 py-8 my-auto flex-1 flex items-center">
              <nav className="w-full flex flex-col space-y-3">
                {chapters.map((chapter, idx) => {
                  const isActive = pathname === '/' && activeSection === chapter.id;

                  return (
                    <motion.div
                      key={chapter.id}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      transition={{
                        duration: shouldReduceMotion ? 0.1 : 0.3,
                        delay: shouldReduceMotion ? 0 : idx * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={chapter.href}
                        onClick={(e) => handleLinkClick(e, chapter.href)}
                        className="group flex items-baseline gap-4 py-2 transition-transform duration-200 hover:translate-x-1 outline-none"
                      >
                        {/* Number */}
                        <span
                          className={cn(
                            'font-mono text-xs tracking-widest tabular-nums shrink-0 w-6',
                            isActive
                              ? 'text-accent-500 font-semibold'
                              : 'text-text-muted group-hover:text-accent-500'
                          )}
                        >
                          {chapter.num}
                        </span>

                        {/* Title: editorial typography */}
                        <div className="flex flex-col">
                          <span
                            className={cn(
                              'font-editorial text-2xl sm:text-3xl font-medium tracking-tight leading-tight transition-colors duration-200',
                              isActive
                                ? 'text-accent-500'
                                : 'text-text-primary group-hover:text-accent-500'
                            )}
                          >
                            {chapter.label}
                          </span>

                          {isActive && (
                            <span className="block h-[1.5px] w-6 bg-accent-500 mt-1.5 rounded-full" />
                          )}
                        </div>

                        {/* Subtle arrow reveal on hover */}
                        <span className="text-accent-500 text-lg opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 ml-auto">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Case Study sub-link if applicable */}
                {currentProject && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                    className="pt-4 mt-2 border-t border-border/50 flex items-center gap-2 text-xs font-mono"
                  >
                    <span className="text-text-muted">Case Study:</span>
                    <span className="text-text-primary font-medium">{currentProject.title}</span>
                    <Link
                      href="/#work"
                      onClick={(e) => handleLinkClick(e, '/#work')}
                      className="text-accent-500 hover:underline ml-auto"
                    >
                      All Work →
                    </Link>
                  </motion.div>
                )}
              </nav>
            </div>

            {/* Bottom Bar */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 pt-4 pb-8 flex items-center justify-between select-none shrink-0 border-t border-border/50">
              <span className="font-mono text-[10.5px] text-text-muted tracking-[0.16em] uppercase">
                FULL-STACK · AI · PRODUCT
              </span>
              <span className="font-mono text-[10px] text-text-muted tracking-[0.14em] uppercase">
                ESC TO CLOSE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
