'use client';

import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Palette Tokens
const PALETTES = {
  ivory: {
    bg: '#F2F0EA',
    text: '#171715',
    border: '#D8D4CA',
    muted: '#77736B',
  },
  warmGrey: {
    bg: '#E9E6DE',
    text: '#171715',
    border: '#D8D4CA',
    muted: '#77736B',
  },
  charcoal: {
    bg: '#191919',
    text: '#F2F0EA',
    border: '#2D2D2D',
    muted: '#A09A91',
  },
};

export function ScrollColorProgression() {
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (shouldReduceMotion) return;

    const root = document.documentElement;

    // Helper to build a linear, reversible, scroll-progress-driven transition
    const createBoundary = (
      triggerSelector: string,
      from: typeof PALETTES.ivory,
      to: typeof PALETTES.ivory,
      start: string,
      end: string
    ) => {
      const el = document.querySelector(triggerSelector);
      if (!el) return null;

      const lerpBg = gsap.utils.interpolate(from.bg, to.bg);
      const lerpText = gsap.utils.interpolate(from.text, to.text);
      const lerpBorder = gsap.utils.interpolate(from.border, to.border);
      const lerpMuted = gsap.utils.interpolate(from.muted, to.muted);

      const apply = (p: number) => {
        root.style.setProperty('--surface-bg', lerpBg(p));
        root.style.setProperty('--surface-text', lerpText(p));
        root.style.setProperty('--surface-border', lerpBorder(p));
        root.style.setProperty('--surface-muted', lerpMuted(p));
      };

      return ScrollTrigger.create({
        trigger: el,
        start,
        end,
        scrub: true,
        onUpdate: (self) => apply(self.progress),
        onEnter: () => apply(0),
        onLeave: () => apply(1),
        onEnterBack: () => apply(1),
        onLeaveBack: () => apply(0),
        onRefresh: (self) => {
          if (self.isActive) {
            apply(self.progress);
          }
        },
      });
    };

    // 1. Services → Selected Work: Ivory → Warm Grey
    // Begins as Selected Work enters viewport, completes before pinning
    const t1 = createBoundary(
      '#work',
      PALETTES.ivory,
      PALETTES.warmGrey,
      'top 95%',
      'top 55%'
    );

    // 2. Selected Work → About: Warm Grey → Charcoal
    // Smooth scroll-connected darkening as About enters viewport
    const t2 = createBoundary(
      '#about',
      PALETTES.warmGrey,
      PALETTES.charcoal,
      'top 95%',
      'top 35%'
    );

    // 3. About → Experience: Charcoal → Ivory
    // Returns to ivory for readable experience timeline
    const t3 = createBoundary(
      '#experience',
      PALETTES.charcoal,
      PALETTES.ivory,
      'top 95%',
      'top 35%'
    );

    // 4. Experience → Contact: Ivory → Charcoal
    // Returns to charcoal for strong closing chapter
    const t4 = createBoundary(
      '#contact',
      PALETTES.ivory,
      PALETTES.charcoal,
      'top 95%',
      'top 40%'
    );

    const syncCurrentColors = () => {
      const triggers = [t1, t2, t3, t4].filter(Boolean) as ScrollTrigger[];
      for (let i = triggers.length - 1; i >= 0; i--) {
        const st = triggers[i];
        if (st.progress > 0) {
          if (st.progress >= 1) {
            st.vars.onLeave?.(st);
          } else {
            st.vars.onUpdate?.(st);
          }
          return;
        }
      }
      root.style.setProperty('--surface-bg', PALETTES.ivory.bg);
      root.style.setProperty('--surface-text', PALETTES.ivory.text);
      root.style.setProperty('--surface-border', PALETTES.ivory.border);
      root.style.setProperty('--surface-muted', PALETTES.ivory.muted);
    };

    ScrollTrigger.addEventListener('refresh', syncCurrentColors);
    syncCurrentColors();

    return () => {
      ScrollTrigger.removeEventListener('refresh', syncCurrentColors);
      [t1, t2, t3, t4].forEach((t) => t?.kill());
    };
  }, { dependencies: [shouldReduceMotion] });

  return null;
}
