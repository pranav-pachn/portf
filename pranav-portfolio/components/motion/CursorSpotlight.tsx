'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;

    // Do not run on touch devices where cursor movement is not continuous
    if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const el = spotlightRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'left', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'top', { duration: 0.6, ease: 'power3.out' });

    // Set initial position out of view or center
    gsap.set(el, { left: window.innerWidth / 2, top: window.innerHeight / 2 });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04] transition-opacity duration-1000 hidden md:block"
      style={{
        background: 'radial-gradient(400px circle at center, rgba(255, 255, 255, 1), transparent 70%)',
      }}
    />
  );
}
