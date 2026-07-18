'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import SplitType from 'split-type';

interface GsapTitleRevealProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
  className?: string;
  delay?: number;
}

export function GsapTitleReveal({ children, as: Component = 'h2', className, delay = 0 }: GsapTitleRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Split text into words then characters for masking
    const split = new SplitType(containerRef.current, { types: 'lines,words,chars' });

    if (!split.chars) return;

    // Ensure lines have overflow hidden for the mask effect
    if (split.lines) {
      gsap.set(split.lines, { overflow: 'hidden' });
    }

    // Set initial state (pushed down)
    gsap.set(split.chars, {
      y: '100%',
    });

    // Animate up
    gsap.to(split.chars, {
      y: '0%',
      duration: 0.8,
      stagger: 0.02,
      ease: 'power4.out',
      delay: delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    });

    return () => {
      split.revert();
    };
  }, { scope: containerRef });

  return (
    <Component ref={containerRef as any} className={cn(className, "overflow-hidden")}>
      {children}
    </Component>
  );
}
