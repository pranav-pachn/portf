'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { featuredProjects } from '@/data/featured-projects';
import { scrollToSection } from '@/lib/scroll';
import { useActiveSection } from '@/hooks/use-active-section';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const chapters = [
  { num: '01', label: 'Services',   href: '/#services',   id: 'services' },
  { num: '02', label: 'Work',       href: '/#work',       id: 'work' },
  { num: '03', label: 'About',      href: '/#about',      id: 'about' },
  { num: '04', label: 'Experience', href: '/#experience', id: 'experience' },
  { num: '05', label: 'Contact',    href: '/#contact',    id: 'contact' },
];

// Pronounced circular arc offsets (curves visibly inward into the page across all screen sizes)
const ARC_CLASSES = [
  '-translate-x-6 sm:-translate-x-10 md:-translate-x-14 lg:-translate-x-18 xl:-translate-x-24 -rotate-1 sm:-rotate-2', // 01 Services
  '-translate-x-20 sm:-translate-x-32 md:-translate-x-48 lg:-translate-x-64 xl:-translate-x-72 -rotate-[0.5deg] sm:-rotate-1', // 02 Work
  '-translate-x-28 sm:-translate-x-44 md:-translate-x-64 lg:-translate-x-80 xl:-translate-x-96 rotate-0', // 03 About (apex)
  '-translate-x-8 sm:-translate-x-16 md:-translate-x-24 lg:-translate-x-32 xl:-translate-x-40 rotate-[0.5deg] sm:rotate-1',  // 04 Experience
  '-translate-x-1 sm:-translate-x-2 md:-translate-x-4 lg:-translate-x-6 xl:-translate-x-8 rotate-1 sm:rotate-2',     // 05 Contact
];

const SECTION_IDS = ['hero', 'services', 'work', 'about', 'experience', 'contact'];

export function FloatingMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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

  // Focus management: Focus first navigation link on menu open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
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

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const currentProject = isWorkRoute && slug
    ? featuredProjects.find((p) => p.id === slug)
    : null;

  return (
    <>
      {/* ── Circular Morphing Menu Button (Available across all screen sizes) ───── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'fixed top-3.5 right-4 sm:top-4 sm:right-6 md:top-3.5 md:right-8 lg:top-4 lg:right-10 z-50 group flex items-center justify-center rounded-full select-none outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 cursor-pointer',
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

      {/* ── Right-Aligned Orbital Navigation Overlay ─────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="orbital-navigation-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-40 bg-[#F2F0EA]/70 sm:bg-gradient-to-r sm:from-[#F2F0EA]/30 sm:via-[#F2F0EA]/75 sm:to-[#F2F0EA]/95 backdrop-blur-md text-[#171715] flex flex-col justify-between overflow-y-auto overflow-x-hidden selection:bg-accent-500 selection:text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Top Bar: PRANAV. on left, Year on right */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-5 pb-4 flex items-center justify-between select-none shrink-0 border-b border-[#D8D4CA]/50">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="font-display font-[600] text-[20px] tracking-[-0.03em] text-[#171715] transition-opacity hover:opacity-80 cursor-pointer"
              >
                Pranav<span className="text-accent-500">.</span>
              </Link>

              <div className="font-mono text-xs text-[#77736B] tracking-wider pr-14 sm:pr-16">
                2026
              </div>
            </div>

            {/* Main Stage: Right-Aligned Orbital Navigation */}
            <div
              className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 my-auto flex-1 flex items-center justify-end"
            >
              <nav
                ref={navRef}
                aria-label="Portfolio sections"
                className="flex flex-col items-end space-y-6 sm:space-y-8 md:space-y-9 lg:space-y-11 w-full max-w-xl pr-2 sm:pr-4 md:pr-8 lg:pr-12"
              >
                {chapters.map((chapter, idx) => (
                  <motion.div
                    key={chapter.id}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.15 : 0.38,
                      delay: shouldReduceMotion ? 0 : idx * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full flex justify-end"
                  >
                    <div
                      className={cn(
                        'w-fit flex justify-end',
                        ARC_CLASSES[idx]
                      )}
                    >
                      <Link
                        ref={idx === 0 ? firstLinkRef : undefined}
                        href={chapter.href}
                        onClick={(e) => handleLinkClick(e, chapter.href)}
                        className="group inline-flex items-baseline gap-3.5 sm:gap-4 md:gap-5 py-1.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-3.5 focus-visible:-translate-x-3.5 outline-none cursor-pointer select-none rounded-lg focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F0EA]"
                      >
                        {/* Monospaced Numeric Index */}
                        <span className="font-mono text-xs sm:text-[13px] md:text-sm tracking-[0.2em] text-[#77736B] transition-colors duration-200 group-hover:text-accent-500 group-focus-visible:text-accent-500 tabular-nums shrink-0">
                          {chapter.num}
                        </span>

                        {/* Large Editorial Label */}
                        <span className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-medium tracking-[-0.03em] leading-none text-[#171715] transition-colors duration-200 group-hover:text-accent-500 group-focus-visible:text-accent-500">
                          {chapter.label}
                        </span>

                        {/* Subtle Arrow reveal on hover/focus */}
                        <span
                          aria-hidden="true"
                          className="text-accent-500 font-editorial text-2xl sm:text-3xl md:text-4xl leading-none opacity-0 -translate-x-2 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 shrink-0 pointer-events-none select-none inline-block"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                ))}

                {/* Case Study sub-link if applicable */}
                {currentProject && (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.25 }}
                    className="pt-5 mt-2 border-t border-[#D8D4CA]/70 flex items-center gap-2.5 text-xs font-mono self-end text-right"
                  >
                    <span className="text-[#77736B]">Case Study:</span>
                    <span className="text-[#171715] font-medium">{currentProject.title}</span>
                    <Link
                      href="/#work"
                      onClick={(e) => handleLinkClick(e, '/#work')}
                      className="text-accent-500 hover:underline ml-2 cursor-pointer font-medium"
                    >
                      All Work →
                    </Link>
                  </motion.div>
                )}
              </nav>
            </div>

            {/* Bottom Bar Signature */}
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-4 pb-8 flex items-center justify-between select-none shrink-0 border-t border-[#D8D4CA]/50">
              <span className="font-mono text-[10.5px] text-[#77736B] tracking-[0.16em] uppercase">
                FULL-STACK · AI · PRODUCT
              </span>
              <span className="font-mono text-[10px] text-[#77736B] tracking-[0.14em] uppercase">
                ESC TO CLOSE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
