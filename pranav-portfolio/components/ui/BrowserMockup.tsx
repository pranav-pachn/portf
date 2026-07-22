'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface BrowserMockupProps {
  children: React.ReactNode;
  className?: string;
  animateFloat?: boolean;
  enableTilt?: boolean;
}

export function BrowserMockup({ children, className, animateFloat = true, enableTilt = true }: BrowserMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Floating ambient animation
  useGSAP(() => {
    if (!animateFloat || shouldReduceMotion || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { y: -3, rotateZ: -0.15 },
      {
        y: 3,
        rotateZ: 0.15,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }
    );
  }, { scope: containerRef, dependencies: [animateFloat, shouldReduceMotion] });

  // Mouse tilt and inner parallax choreography
  useGSAP(() => {
    if (!enableTilt || shouldReduceMotion || !containerRef.current || !screenshotRef.current) return;

    const el = containerRef.current;
    const inner = screenshotRef.current;

    const rotateXTo = gsap.quickTo(el, 'rotateX', { duration: 0.5, ease: 'power3.out' });
    const rotateYTo = gsap.quickTo(el, 'rotateY', { duration: 0.5, ease: 'power3.out' });
    const innerXTo = gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3.out' });
    const innerYTo = gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates -1 to +1
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      // Max tilt: ±2 degrees
      rotateXTo(-normY * 2);
      rotateYTo(normX * 2);

      // Inner screenshot parallax: opposite shift by up to 3px
      innerXTo(-normX * 3);
      innerYTo(-normY * 3);
    };

    const handleMouseLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(inner, { x: 0, y: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: containerRef, dependencies: [enableTilt, shouldReduceMotion] });

  return (
    <div className="w-full [perspective:1000px]">
      <div
        ref={containerRef}
        className={cn(
          'w-full rounded-2xl border border-border/80 bg-surface-elevated shadow-2xl overflow-hidden transition-colors duration-500 will-change-transform [transform-style:preserve-3d]',
          className
        )}
      >
        {/* Subtle Chrome Header */}
        <div className="h-8 px-4 flex items-center gap-2 border-b border-border/50 bg-surface/80 select-none">
          <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <span className="w-2 h-2 rounded-full bg-text-muted/60" />
            <span className="w-2 h-2 rounded-full bg-text-muted/60" />
            <span className="w-2 h-2 rounded-full bg-text-muted/60" />
          </div>
          <div className="mx-auto flex items-center justify-center">
            <div className="h-4 w-32 md:w-48 rounded-full bg-border/40 opacity-50" />
          </div>
          <div className="w-10" /> {/* Spacer for centering the address bar indicator */}
        </div>

        {/* Screenshot Body with Parallax Ref */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface/30">
          <div ref={screenshotRef} className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] will-change-transform">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
