'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface BlueprintTransitionProps {
  children?: React.ReactNode;
}

export function BlueprintTransition({ children }: BlueprintTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (shouldReduceMotion || !containerRef.current) return;

    // Timeline triggers in the final 40% of the Hero scroll runway
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    // Hero composition as a unified piece gently shifts and softens into the work section
    if (contentWrapperRef.current) {
      tl.to(
        contentWrapperRef.current,
        {
          y: -28,
          opacity: 0.4,
          ease: 'power1.out',
          duration: 0.4,
        },
        0.6
      );
    }
  }, { scope: containerRef, dependencies: [shouldReduceMotion] });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Hero Content Container - Gives way naturally to Selected Work */}
      <div ref={contentWrapperRef} className="relative w-full origin-center">
        {children}
      </div>
    </div>
  );
}
