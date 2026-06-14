'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { routeContentVariants, routeOverlayVariants } from '@/lib/animations';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {/* 
        The overlay acts as a 'curtain' sweeping down from top to bottom.
        It starts covering the screen, then reveals the content.
      */}
      <motion.div
        variants={routeOverlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-[60] bg-bg pointer-events-none"
      />

      {/* 
        The content scales up slightly and fades in behind the overlay.
      */}
      <motion.div
        variants={routeContentVariants}
        initial="initial"
        animate="animate"
      >
        {children}
      </motion.div>
    </>
  );
}
