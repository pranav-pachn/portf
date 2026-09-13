'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { GsapTitleReveal } from '@/components/motion/GsapTitleReveal';

export function WorkIntroPanel() {
  return (
    <section id="work" className="min-h-[50vh] md:min-h-[65vh] flex flex-col justify-center py-12 md:py-16 bg-surface text-center md:text-left">
      <Container>
        <AnimateOnScroll variant="maskReveal" delay={0.1}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-6xl mx-auto border-t border-border/50 pt-8 md:pt-12 gap-6 md:gap-8">
            <div className="w-full md:w-1/3 text-left">
              <span className="font-mono text-[13px] font-semibold text-accent-500 uppercase tracking-[0.14em] block mb-3 md:mb-0">
                02 — SELECTED WORK
              </span>
            </div>
            
            <div className="w-full md:w-2/3 text-left">
              <GsapTitleReveal as="h2" className="text-3xl md:text-4xl lg:text-[44px] text-text-primary leading-[1.1] font-display font-semibold tracking-[-0.04em] max-w-[34rem]">
                Five products. Five different engineering challenges. Each built from idea to deployment.
              </GsapTitleReveal>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
