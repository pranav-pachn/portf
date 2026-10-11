'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { fadeIn, slideUp, scaleIn, slideRight, blurIn, maskReveal, subtleRise } from './variants';

interface Props {
  children: ReactNode;
  variant?: 'fade' | 'slide' | 'scale' | 'slideRight' | 'blur' | 'maskReveal' | 'subtleRise';
  className?: string;
  delay?: number;
}

export function AnimateOnScroll({ children, variant = 'slide', className = '', delay = 0 }: Props) {
  const shouldReduceMotion = useReducedMotion();

  let selectedVariant = slideUp;
  if (variant === 'fade') selectedVariant = fadeIn;
  if (variant === 'scale') selectedVariant = scaleIn;
  if (variant === 'slideRight') selectedVariant = slideRight;
  if (variant === 'blur') selectedVariant = blurIn;
  if (variant === 'maskReveal') selectedVariant = maskReveal;
  if (variant === 'subtleRise') selectedVariant = subtleRise;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
