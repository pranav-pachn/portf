'use client';

import { ReactNode } from 'react';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

interface CaseStudySectionProps {
  index: string;
  title: string;
  children: ReactNode;
  background?: 'default' | 'surface';
  width?: 'narrow' | 'standard' | 'wide';
}

export function CaseStudySection({ 
  index, 
  title, 
  children, 
  background = 'default',
  width = 'narrow'
}: CaseStudySectionProps) {
  return (
    <section className={cn(
      "py-24",
      background === 'surface' ? "bg-surface-hover" : ""
    )}>
      <Container narrow={width === 'narrow'} wide={width === 'wide'}>
        <AnimateOnScroll>
          <div className="flex flex-col mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight flex items-baseline gap-4">
              <span className="text-[var(--project-accent)] font-mono text-2xl md:text-3xl opacity-80">{index}</span>
              <span className="text-border mx-2">—</span>
              {title}
            </h2>
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-text-secondary">
            {children}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
