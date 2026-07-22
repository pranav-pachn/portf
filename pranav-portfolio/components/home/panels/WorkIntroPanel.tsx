'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { GsapTitleReveal } from '@/components/motion/GsapTitleReveal';

export function WorkIntroPanel() {
  return (
    <section id="work" className="pt-28 pb-12 bg-surface text-center md:text-left">
      <Container>
        <AnimateOnScroll variant="maskReveal" delay={0.1}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-6xl mx-auto border-t border-border/50 pt-16 md:pt-24 gap-8">
            <div className="w-full md:w-1/3 text-left">
              <span className="font-mono text-[13px] font-semibold text-accent-500 uppercase tracking-[0.14em] block mb-4 md:mb-0">
                02 — SELECTED WORK
              </span>
            </div>
            
            <div className="w-full md:w-2/3 text-left">
              <GsapTitleReveal as="h2" className="text-3xl md:text-4xl lg:text-5xl text-text-primary leading-[1] font-sans font-bold tracking-[-0.04em] max-w-[34rem]">
                Five products. Five different engineering challenges. Each built from idea to deployment.
              </GsapTitleReveal>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
