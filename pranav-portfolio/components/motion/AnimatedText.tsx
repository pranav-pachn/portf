'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { letterRevealVariants, TIMING } from '@/lib/animations';

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
  stagger?: number;
  animate?: boolean;
}

export function AnimatedText({
  text,
  segments,
  as: Component = 'h1',
  className = '',
  delay = 0,
  stagger = TIMING.stagger,
  animate = true,
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();

  // Normalize input into segments
  const normalizedSegments: Segment[] = segments || (text ? [{ text }] : []);

  if (shouldReduceMotion || !animate) {
    return (
      <Component className={className}>
        {normalizedSegments.map((segment, idx) => {
          if (segment.break) {
            return <br key={idx} className={segment.className} />;
          }
          return (
            <span key={idx} className={segment.className}>
              {segment.text}
            </span>
          );
        })}
      </Component>
    );
  }

  // Generate plain text for aria-label
  const plainText = normalizedSegments.map((s) => s.break ? ' ' : s.text || '').join('');
  const MotionComponent = motion.create(Component as any) as any;

  return (
    <MotionComponent
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      aria-label={plainText}
    >
      {normalizedSegments.map((segment, segIdx) => {
        if (segment.break) {
          return <br key={`br-${segIdx}`} className={segment.className} />;
        }
        if (!segment.text) return null;
        
        return (
          <span key={segIdx} className={segment.className}>
            {segment.text.split(/(\s+)/).map((word, wordIdx) => {
              if (word.match(/^\s+$/)) {
                return (
                  <span key={`${segIdx}-${wordIdx}`} className="inline-block">
                    {word.replace(/ /g, '\u00A0')}
                  </span>
                );
              }
              return (
                <span key={`${segIdx}-${wordIdx}`} className="inline-block whitespace-nowrap">
                  {word.split('').map((char, charIdx) => (
                    <motion.span
                      key={`${segIdx}-${wordIdx}-${charIdx}`}
                      variants={letterRevealVariants}
                      className="inline-block"
                      aria-hidden="true"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </span>
        );
      })}
    </MotionComponent>
  );
}
