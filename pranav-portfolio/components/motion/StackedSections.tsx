'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function StackedSections({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);
  const shouldReduceMotion = useReducedMotion();

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
              className="md:sticky w-full"
              style={{ zIndex: index + 1, top: 'calc(100vh - 100%)' }}
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

  // Track the scroll progress of THIS section's original layout box.
  // "start start" -> top of section hits top of viewport
  // "end start" -> bottom of section hits top of viewport (meaning user scrolled 1 section height past it)
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
      className="md:sticky w-full"
      style={{ zIndex: index + 1, top: 'calc(100vh - 100%)' }}
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
