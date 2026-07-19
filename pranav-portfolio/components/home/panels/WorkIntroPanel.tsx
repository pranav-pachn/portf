'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { GsapTitleReveal } from '@/components/motion/GsapTitleReveal';

export function WorkIntroPanel() {
  return (
    <section id="work" className="py-24 bg-surface min-h-screen flex items-center justify-center text-center">
      <Container>
        <AnimateOnScroll variant="maskReveal" delay={0.1}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-6xl mx-auto border-t border-border/50 pt-16 md:pt-24 gap-8">
            <div className="w-full md:w-1/3">
              <span className="text-xs font-bold text-accent-500 uppercase tracking-widest block mb-4 md:mb-0">
                (Engineering Case Studies)
              </span>
            </div>
            
            <div className="w-full md:w-2/3">
              <GsapTitleReveal as="h2" className="text-2xl md:text-3xl lg:text-4xl text-text-primary leading-snug font-medium max-w-3xl">
                Building AI-powered products that combine thoughtful design, robust engineering, and intelligent workflows to solve real-world problems.
              </GsapTitleReveal>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
