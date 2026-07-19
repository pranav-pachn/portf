'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // On initial mount, we don't want to play the enter animation from a completely black screen
  // unless we want that effect. Usually we just want to animate the content in.
  // The sweep is mainly for route changes.
  
  if (shouldReduceMotion) {
    return <div className="w-full h-full relative">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="w-full h-full relative"
      >
        {/* Content Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
          className="w-full h-full"
        >
          {children}
        </motion.div>

        {/* The Premium Overlay Sweep */}
        <motion.div
          className="fixed inset-0 z-[60] bg-[#0a0a0a] pointer-events-none"
          initial={{ scaleY: 1, transformOrigin: "bottom" }}
          animate={{ scaleY: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ scaleY: 1, transformOrigin: "top", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
