'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { GsapTitleReveal } from '@/components/motion/GsapTitleReveal';

export function ArchIntroPanel() {
  return (
    <section id="architecture" className="pt-28 pb-0 bg-bg text-center md:text-left relative overflow-hidden">
      <Container>
        <AnimateOnScroll variant="maskReveal">
          <div className="max-w-6xl mx-auto border-t border-border/70 pt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12">
            <div className="w-full md:w-1/3">
              <span className="font-mono text-[11px] font-medium text-accent-500 uppercase tracking-[0.18em] block select-none">
                03 — SYSTEM ARCHITECTURE
              </span>
              <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-text-muted tracking-wider select-none">
                <span>INTERACTIVE SCHEMATICS</span>
                <span className="text-border">/</span>
                <span className="text-text-secondary">SYSTEM FLOWS</span>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 flex flex-col items-start text-left">
              <GsapTitleReveal as="h2" className="text-3xl md:text-4xl lg:text-[44px] font-display font-semibold text-text-primary tracking-[-0.035em] leading-[1.08] max-w-[34rem]">
                The workflows behind the products.
              </GsapTitleReveal>
              <p className="mt-4 text-[17px] text-text-secondary leading-[1.6] max-w-[32rem] font-normal">
                How distributed state, temporal scheduling algorithms, and parallel AI inference pipelines are constructed.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* Design Moment: Atmospheric transition into deliberate dark engineering chamber */}
      <div className="w-full h-24 md:h-36 bg-gradient-to-b from-bg to-[#141413] pointer-events-none" />
    </section>
  );
}
