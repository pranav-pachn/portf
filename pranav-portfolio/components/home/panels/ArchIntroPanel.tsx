'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { GsapTitleReveal } from '@/components/motion/GsapTitleReveal';

export function ArchIntroPanel() {
  return (
    <section id="architecture" className="pt-28 pb-12 bg-bg text-center md:text-left">
      <Container>
        <AnimateOnScroll variant="maskReveal">
          <div className="max-w-6xl mx-auto border-t border-border/50 pt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="w-full md:w-1/3">
              <span className="font-mono text-[13px] font-semibold text-accent-500 uppercase tracking-[0.14em] block">
                03 — SYSTEM ARCHITECTURE
              </span>
            </div>
            
            <div className="w-full md:w-2/3">
              <GsapTitleReveal as="h2" className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-text-primary tracking-[-0.04em] leading-[1] max-w-[34rem]">
                The workflows behind the products.
              </GsapTitleReveal>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
