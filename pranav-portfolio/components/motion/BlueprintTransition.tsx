'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

interface BlueprintTransitionProps {
  children?: React.ReactNode;
}

export function BlueprintTransition({ children }: BlueprintTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cadBoxRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (shouldReduceMotion || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=80%',
        scrub: true,
      },
    });

    // 1. Grid fades in (0% -> 30%)
    if (gridRef.current) {
      tl.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 0.08, duration: 0.3, ease: 'power1.inOut' },
        0
      );
    }

    // 2. CAD Box path draws: top & right corner first, then bottom & left (20% -> 70%)
    const paths = cadBoxRef.current?.querySelectorAll('path');
    if (paths && paths.length > 0) {
      tl.fromTo(
        paths,
        { strokeDashoffset: 1400 },
        { strokeDashoffset: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        0.2
      );
    }

    // 3. Dots pop in (60% -> 85%)
    if (dotsRef.current) {
      const dotSpan = dotsRef.current.querySelectorAll('span');
      tl.fromTo(
        dotSpan,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, stagger: 0.05, ease: 'back.out(2)' },
        0.55
      );
    }
  }, { scope: containerRef, dependencies: [shouldReduceMotion] });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Background CAD crosshatch grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* CAD Drawing Overlay right between Hero and Work */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end justify-center pb-12 z-20">
        <div className="relative w-full max-w-5xl mx-auto px-6">
          {/* Animated SVG CAD Box */}
          <svg
            ref={cadBoxRef}
            className="w-full h-16 md:h-24 stroke-accent-500/60 fill-none"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            {/* Top right corner and top line: ┌──────────┐ */}
            <path
              d="M 20 100 L 20 20 L 980 20 L 980 100"
              strokeWidth="1.5"
              strokeDasharray="1400"
              strokeDashoffset="1400"
            />
          </svg>

          {/* Three browser dots ● ● ● */}
          <div
            ref={dotsRef}
            className="absolute top-3 left-10 md:left-12 flex items-center gap-2 pointer-events-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent-500/80 scale-0 opacity-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent-500/60 scale-0 opacity-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent-500/40 scale-0 opacity-0" />
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
