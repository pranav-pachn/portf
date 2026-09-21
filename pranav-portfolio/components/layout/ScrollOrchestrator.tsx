'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function ScrollOrchestrator({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // If user prefers reduced motion, preserve native scrolling without Lenis inertia
    if (shouldReduceMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.15,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);
    window.__lenis = lenis;

    // Direct bridge: when Lenis updates scroll position, inform ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP owns the single animation clock and drives Lenis
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once layout and fonts are stable
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenisInstance(null);
      delete window.__lenis;
    };
  }, [shouldReduceMotion]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
