'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { fadeIn, slideUp, scaleIn } from './variants';

interface Props {
  children: ReactNode;
  variant?: 'fade' | 'slide' | 'scale';
  className?: string;
  delay?: number;
}

export function AnimateOnScroll({ children, variant = 'slide', className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  let selectedVariant = slideUp;
  if (variant === 'fade') selectedVariant = fadeIn;
  if (variant === 'scale') selectedVariant = scaleIn;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={selectedVariant}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
