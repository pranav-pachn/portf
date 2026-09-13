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
  const gridRef = useRef<HTMLDivElement>(null);
  const cadBoxRef = useRef<SVGSVGElement>(null);
  const originatingLineRef = useRef<SVGPathElement>(null);
  const connectionNodeRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (shouldReduceMotion || !containerRef.current) return;

    // Timeline triggers in the final 35% of the Hero scroll runway
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    // 1. Hero content slightly compresses/recedes in the final 35% (progress 0.65 -> 1.0)
    if (contentWrapperRef.current) {
      tl.to(
        contentWrapperRef.current,
        {
          scale: 0.97,
          opacity: 0.35,
          ease: 'power2.inOut',
          duration: 0.35,
        },
        0.65
      );
    }

    // 2. Minimal background architectural grid fades in very gently (0.55 -> 0.85)
    if (gridRef.current) {
      tl.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 0.05, duration: 0.3, ease: 'power1.inOut' },
        0.55
      );
    }

    // 3. Originating line draws outward from laptop position down to the frame (0.65 -> 0.92)
    if (originatingLineRef.current) {
      tl.fromTo(
        originatingLineRef.current,
        { strokeDashoffset: 1200 },
        { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' },
        0.65
      );
    }

    // 4. Subtle connection node pops at the intersection (0.80 -> 0.90)
    if (connectionNodeRef.current) {
      tl.fromTo(
        connectionNodeRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.8, duration: 0.1, ease: 'back.out(2)' },
        0.80
      );
    }

    // 5. Browser frame paths draw at the bottom framing the work section (0.75 -> 1.0)
    const paths = cadBoxRef.current?.querySelectorAll('path.cad-frame');
    if (paths && paths.length > 0) {
      tl.fromTo(
        paths,
        { strokeDashoffset: 1400 },
        { strokeDashoffset: 0, duration: 0.25, stagger: 0.05, ease: 'power2.out' },
        0.75
      );
    }

    // 6. Minimal browser frame dots pop in right at the handoff into Work (0.88 -> 1.0)
    if (dotsRef.current) {
      const dotSpan = dotsRef.current.querySelectorAll('span');
      tl.fromTo(
        dotSpan,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.8, duration: 0.12, stagger: 0.03, ease: 'back.out(2)' },
        0.88
      );
    }
  }, { scope: containerRef, dependencies: [shouldReduceMotion] });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Subtle architectural crosshatch grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Screen-Originating Blueprint Lines SVG (Desktop only overlay) */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-15"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Vector line originating from laptop position (approx x: 1050, y: 380) down into the lower CAD boundary */}
        <path
          ref={originatingLineRef}
          d="M 1050 420 L 1050 720 L 720 720 L 720 850"
          stroke="rgba(245, 245, 245, 0.25)"
          strokeWidth="1.2"
          strokeDasharray="1200"
          strokeDashoffset="1200"
          strokeLinecap="round"
        />

        {/* Intersection node */}
        <circle
          ref={connectionNodeRef}
          cx="1050"
          cy="720"
          r="3"
          fill="#f5f5f5"
          className="opacity-0 origin-center"
        />
      </svg>

      {/* Hero Content Container (which compresses subtly on exit) */}
      <div ref={contentWrapperRef} className="relative w-full origin-center">
        {children}
      </div>

      {/* Clean CAD Browser Frame Overlay transitioning seamlessly into Work */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end justify-center z-20">
        <div className="relative w-full max-w-5xl mx-auto px-6">
          <svg
            ref={cadBoxRef}
            className="w-full h-12 md:h-16 stroke-white/20 fill-none"
            viewBox="0 0 1000 70"
            preserveAspectRatio="none"
          >
            {/* Top boundary framing line: ┌──────────┐ */}
            <path
              className="cad-frame"
              d="M 20 70 L 20 15 L 980 15 L 980 70"
              strokeWidth="1"
              strokeDasharray="1400"
              strokeDashoffset="1400"
            />
          </svg>

          {/* Minimal browser dots ● ● ● */}
          <div
            ref={dotsRef}
            className="absolute top-2.5 left-10 md:left-12 flex items-center gap-2 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-white/40 scale-0 opacity-0" />
            <span className="w-2 h-2 rounded-full bg-white/25 scale-0 opacity-0" />
            <span className="w-2 h-2 rounded-full bg-white/15 scale-0 opacity-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
