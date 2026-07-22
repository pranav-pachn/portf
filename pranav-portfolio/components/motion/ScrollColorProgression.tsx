'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const chapterColors: { selector: string; color: string }[] = [
  { selector: '#hero', color: '#0a0a0a' },
  { selector: '#work', color: '#0c0c0c' },
  { selector: '#architecture', color: '#090e17' },
  { selector: '#about', color: '#0b0a09' },
  { selector: '#contact', color: '#0a0a0a' },
];

export function ScrollColorProgression() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (shouldReduceMotion) return;

    chapterColors.forEach(({ selector, color }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          gsap.to(document.documentElement, {
            '--color-bg': color,
            duration: 0.9,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
        onEnterBack: () => {
          gsap.to(document.documentElement, {
            '--color-bg': color,
            duration: 0.9,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (chapterColors.some((c) => t.trigger === document.querySelector(c.selector))) {
          t.kill();
        }
      });
    };
  }, { dependencies: [shouldReduceMotion] });

  return <div ref={containerRef} className="hidden pointer-events-none" aria-hidden="true" />;
}
