'use client';

import { ReactNode } from 'react';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';

interface PageHeaderProps {
  projectIndex?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function PageHeader({ projectIndex, title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="relative pt-40 pb-24 bg-surface overflow-hidden border-b border-border">
      {/* Subtle top-gradient based on --project-accent if set, or just a default subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--project-accent,var(--color-bg))]/5 to-transparent pointer-events-none" />
      
      {/* Oversized background number anchor */}
      {projectIndex && (
        <div className="absolute -top-10 -right-10 text-[16rem] md:text-[24rem] font-display font-bold text-border/20 pointer-events-none select-none z-0">
          {projectIndex}
        </div>
      )}

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <AnimatedText
            as="h1"
            text={title}
            className="text-5xl md:text-7xl font-display font-bold text-text-primary tracking-tight mb-8 leading-[1.1]"
            delay={0.2}
          />

          {subtitle && (
            <AnimateOnScroll variant="slide" delay={0.6}>
              <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-3xl mb-12">
                {subtitle}
              </p>
            </AnimateOnScroll>
          )}
        </div>

        {children && (
          <AnimateOnScroll variant="fade" delay={0.8}>
            <div className="mt-8">
              {children}
            </div>
          </AnimateOnScroll>
        )}
      </Container>
    </section>
  );
}
