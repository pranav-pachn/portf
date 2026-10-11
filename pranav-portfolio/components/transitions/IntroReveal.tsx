'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function IntroReveal() {
  const [shouldRender, setShouldRender] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Run on mount (hard refresh)
  // Because this is in layout.tsx, it won't re-run during normal Next.js internal link navigation
  useEffect(() => {
    if (shouldReduceMotion) {
      setShouldRender(false);
      return;
    }

    setIsAnimating(true);
  }, [shouldReduceMotion]);

  // Handle scroll locking explicitly during animation
  useEffect(() => {
    if (isAnimating) {
      // 1. Force scroll to top for the intro
      window.scrollTo(0, 0);
      
      const previousScrollRestoration = 'scrollRestoration' in history ? history.scrollRestoration : 'auto';
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // 2. Lock native scrolling
      document.body.style.overflow = 'hidden';
      
      // 3. Stop Lenis if it exists (try immediately)
      if (window.__lenis) {
        window.__lenis.stop();
      }
      
      // 4. In case ScrollOrchestrator initializes Lenis just after this mounts
      const timer = setTimeout(() => {
        if (window.__lenis) {
          window.__lenis.stop();
        }
      }, 50);

      // Cleanup: restore scroll state when animation finishes
      return () => {
        document.body.style.overflow = '';
        if ('scrollRestoration' in history) {
          history.scrollRestoration = previousScrollRestoration as ScrollRestoration;
        }
        if (window.__lenis) {
          window.__lenis.start();
        }
        clearTimeout(timer);
      };
    }
  }, [isAnimating]);

  useGSAP(() => {
    if (!isAnimating || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        // Delay the unmount by a tick to ensure scroll restore is smooth
        setTimeout(() => setShouldRender(false), 0);
      }
    });

    // Phase 1 (Hold: 300ms) & Phase 2 (Open: 1000ms)
    tl.to([leftPanelRef.current, rightPanelRef.current], {
      xPercent: (i) => (i === 0 ? -102 : 102),
      duration: 1.0,
      ease: 'power3.inOut',
      delay: 0.3
    });

    // Phase 3 (Settle: 300ms) — hero is now fully visible, hold briefly before unmount
    tl.to({}, { duration: 0.3 });

  }, { scope: containerRef, dependencies: [isAnimating] });

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex pointer-events-auto overflow-hidden"
    >
      {/* Left panel */}
      <div 
        ref={leftPanelRef}
        className="w-1/2 h-[100dvh]"
        style={{
          background: '#F3F1EC',
          borderRight: '1px solid rgba(23,23,21,0.08)',
          boxShadow: '8px 0 24px rgba(23,23,21,0.05)',
        }}
      />
      {/* Right panel */}
      <div 
        ref={rightPanelRef}
        className="w-1/2 h-[100dvh]"
        style={{
          background: '#F3F1EC',
          borderLeft: '1px solid rgba(23,23,21,0.08)',
          boxShadow: '-8px 0 24px rgba(23,23,21,0.05)',
        }}
      />
    </div>
  );
}

