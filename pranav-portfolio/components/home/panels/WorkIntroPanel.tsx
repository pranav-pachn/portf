'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { GsapTitleReveal } from '@/components/motion/GsapTitleReveal';

export function WorkIntroPanel() {
  return (
    <section id="work" className="py-20 lg:py-28 bg-bg">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <AnimateOnScroll variant="maskReveal" delay={0.1}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-baseline gap-8 lg:gap-16 w-full">
            {/* Left Ledger Column */}
            <div className="w-full lg:w-1/3 flex flex-col">
              <span className="font-mono text-[11px] font-medium text-accent-500 uppercase tracking-[0.18em] block select-none">
                02 — SELECTED WORK
              </span>
              <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-text-muted tracking-wider select-none">
                <span>05 PRODUCTION REPOSITORIES</span>
                <span className="text-border">/</span>
                <span className="text-text-secondary">2025–2026</span>
              </div>
            </div>
            
            {/* Right Editorial Headline & Description */}
            <div className="w-full lg:w-2/3 flex flex-col items-start text-left">
              <GsapTitleReveal as="h2" className="text-3xl md:text-4xl lg:text-[44px] text-text-primary leading-[1.08] font-display font-semibold tracking-[-0.035em] max-w-[34rem]">
                Five products. Five different engineering challenges. Each built from idea to deployment.
              </GsapTitleReveal>
              <p className="mt-5 text-[17px] text-text-secondary leading-[1.6] max-w-[32rem] font-normal">
                A selection of end-to-end applications spanning temporal database reservation algorithms, multi-signal AI fraud analysis, and high-performance offline systems.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
