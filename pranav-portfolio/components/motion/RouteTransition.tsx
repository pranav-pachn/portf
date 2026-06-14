'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Global variable to persist the previous pathname across soft navigations
let globalPrevPath = '';

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Determine transition type synchronously during render
  let transitionType = 'none';
  
  if (globalPrevPath && globalPrevPath !== pathname) {
    if (globalPrevPath === '/' && pathname.startsWith('/work/')) {
      transitionType = 'page-turn';
    } else if (globalPrevPath.startsWith('/work/') && pathname === '/') {
      transitionType = 'page-turn-reverse';
    } else if (globalPrevPath.startsWith('/work/') && pathname.startsWith('/work/')) {
      transitionType = 'light';
    } else {
      transitionType = 'light';
    }
  }

  // Update global tracking after render
  useEffect(() => {
    globalPrevPath = pathname;
  }, [pathname]);

  const variants = {
    'page-turn': {
      initial: { opacity: 0, y: '30vh', scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
    'page-turn-reverse': {
      initial: { opacity: 0, y: '-30vh', scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
    'light': {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    'none': {
      initial: { opacity: 1, y: 0, scale: 1 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0 }
    }
  };

  const selectedVariant = variants[transitionType as keyof typeof variants];

  return (
    <motion.div
      key={pathname}
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      transition={selectedVariant.transition}
      className="w-full h-full relative"
    >
      {children}
    </motion.div>
  );
}
