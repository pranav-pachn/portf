'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function StackedSections({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);
  const shouldReduceMotion = useReducedMotion();

  // Handle hash navigation when arriving from a different page
  React.useEffect(() => {
    if (window.location.hash) {
      // Small delay to ensure layout and sticky positioning are computed
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const stickyWrapper = element.closest('[data-stacked-section]') as HTMLElement | null;
          if (stickyWrapper) {
            let absoluteTop = 0;
            let currentEl: HTMLElement | null = stickyWrapper;
            while (currentEl) {
              absoluteTop += currentEl.offsetTop;
              currentEl = currentEl.offsetParent as HTMLElement;
            }
            window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  }, []);

  return (
    <div className="relative">
      {childrenArray.map((child, index) => {
        // Last section doesn't need to scale down because nothing covers it
        const isLast = index === childrenArray.length - 1;

        if (shouldReduceMotion) {
          return (
            <div
              key={index}
              data-stacked-section="true"
              className={`sticky w-full ${isLast ? '' : 'mb-[30vh]'}`}
              style={{ zIndex: index + 1, top: 'min(0px, calc(100vh - 100%))' }}
            >
              <div className="w-full bg-bg">
                {child}
              </div>
            </div>
          );
        }

        return (
          <StackedSectionItem key={index} index={index} isLast={isLast}>
            {child}
          </StackedSectionItem>
        );
      })}
    </div>
  );
}

function StackedSectionItem({
  children,
  index,
  isLast,
}: {
  children: React.ReactNode;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = React.useState('0px');

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(() => {
      if (!ref.current) return;
      const height = ref.current.offsetHeight;
      const vh = window.innerHeight;
      if (height <= vh) {
        setTopOffset('0px');
      } else {
        setTopOffset(`${vh - height}px`);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Track the scroll progress of THIS section's original layout box.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  });

  // Scale down and fade out as it gets scrolled past
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div
      ref={ref}
      data-stacked-section="true"
      className={`sticky w-full ${isLast ? '' : 'mb-[30vh]'}`}
      style={{ zIndex: index + 1, top: topOffset }}
    >
      <motion.div
        style={{
          scale: isLast ? 1 : scale,
          opacity: isLast ? 1 : opacity,
          transformOrigin: 'top center',
        }}
        className="w-full h-full bg-bg shadow-2xl relative will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
