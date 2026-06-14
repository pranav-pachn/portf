'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface CurvedSectionProps {
  children: ReactNode;
  /** Color class for the top of the curved SVG (e.g. 'text-bg') */
  topColor: string;
  /** Color class for the bottom background (e.g. 'bg-surface') */
  bottomColor: string;
  /** Direction of the curve animation */
  direction?: 'up' | 'down';
}

/**
 * Wraps a section with a scroll-linked curved transition mask.
 * As the user scrolls the section into view:
 *  - The curved SVG path animates its height
 *  - The section slightly translates upward (parallax overlap)
 *  - A subtle scale effect is applied
 *  - Optional depth shadow fades in
 */
export function CurvedSection({ children, topColor, bottomColor, direction = 'down' }: CurvedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 0.3'],
  });

  // Animated values driven by scroll progress
  const curveHeight = useTransform(scrollYProgress, [0, 1], ['0px', 'clamp(40px, 5vw, 100px)']);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.15]);

  if (shouldReduceMotion) {
    return (
      <>
        {/* Static curved divider for reduced motion */}
        <div 
          className={`w-full overflow-hidden leading-none z-20 relative -mt-[1px] ${bottomColor}`} 
          style={{ height: 'clamp(40px, 5vw, 100px)' }}
        >
          <svg 
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none" 
            className={`block w-full h-full ${topColor}`}
            fill="currentColor"
          >
            <path d="M0,0 L1440,0 L1440,160 Q720,320 0,160 Z" />
          </svg>
        </div>
        {children}
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Animated curved divider */}
      <motion.div 
        className={`w-full overflow-hidden leading-none z-20 relative -mt-[1px] ${bottomColor}`}
        style={{ height: curveHeight }}
      >
        <svg 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none" 
          className={`block w-full h-full ${topColor}`}
          fill="currentColor"
        >
          <path d="M0,0 L1440,0 L1440,160 Q720,320 0,160 Z" />
        </svg>
      </motion.div>

      {/* Section content with scroll-linked transform */}
      <motion.div
        style={{
          y,
          scale,
          opacity,
          boxShadow: useTransform(shadowOpacity, (v) => `0 -20px 60px rgba(0,0,0,${v})`),
        }}
        className="relative z-10 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
