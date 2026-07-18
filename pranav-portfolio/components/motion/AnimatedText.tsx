'use client';

import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import SplitType from 'split-type';
import { cn } from '@/lib/utils';

interface Segment {
  text?: string;
  className?: string;
  break?: boolean;
}

interface AnimatedTextProps {
  /** Can be a single string or an array of segments for mixed styling */
  text?: string;
  segments?: Segment[];
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  animate?: boolean;
}

export function AnimatedText({
  text,
  segments,
  as: Component = 'h1',
  className = '',
  delay = 0,
  animate = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalize input into segments
  const normalizedSegments: Segment[] = segments || (text ? [{ text }] : []);

  useGSAP(() => {
    if (shouldReduceMotion || !animate || !containerRef.current) return;

    // We only want to animate the chars inside our segments
    const elementsToSplit = containerRef.current.querySelectorAll('.split-target');
    
    if (elementsToSplit.length === 0) return;

    // Split text into characters
    const split = new SplitType(elementsToSplit as NodeListOf<HTMLElement>, { types: 'chars,words' });

    if (!split.chars) return;

    // Initial state: hidden, shifted down, rotated, blurred
    gsap.set(split.chars, {
      opacity: 0,
      y: 40,
      rotateX: -40,
      filter: 'blur(10px)',
      transformOrigin: '0% 50% -50',
    });

    // Animation timeline
    gsap.to(split.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.02,
      ease: 'power3.out',
      delay: delay,
    });

    return () => {
      split.revert();
    };
  }, { scope: containerRef, dependencies: [text, segments, animate, shouldReduceMotion, delay] });

  // Generate plain text for aria-label
  const plainText = normalizedSegments.map((s) => s.break ? ' ' : s.text || '').join('');

  return (
    <Component 
      ref={containerRef as any} 
      className={cn(className, "flex flex-wrap items-baseline gap-x-0")} 
      aria-label={plainText}
    >
      {normalizedSegments.map((segment, segIdx) => {
        if (segment.break) {
          return <div key={`br-${segIdx}`} className="basis-full h-0" />;
        }
        if (!segment.text) return null;
        
        return (
          <span 
            key={segIdx} 
            className={cn("split-target inline-block whitespace-pre", segment.className)}
            aria-hidden="true"
          >
            {segment.text}
          </span>
        );
      })}
    </Component>
  );
}
