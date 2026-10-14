'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { EngineeringManuals } from './EngineeringManuals';

export function AboutSection() {
  return (
    <section id="about" className="py-0 bg-transparent text-[var(--surface-text)] overflow-hidden flex flex-col scroll-mt-20 border-t border-[var(--surface-border)]">
      {/* Top: Engineering Manuals (Capability Chapter) */}
      <div className="w-full bg-transparent pb-20 pt-16 border-b border-[var(--surface-border)]">
        <AnimateOnScroll variant="subtleRise">
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 mb-14 text-left">
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-accent-500 block mb-3 select-none">
              04 — ENGINEERING MANUALS
            </span>
            <h2 className="font-editorial font-medium tracking-[-0.025em] text-2xl sm:text-3xl md:text-[38px] leading-[1.1] text-[var(--surface-text)]">
              Technical depth, by discipline.
            </h2>
            <p className="text-[var(--surface-muted)] mt-3 max-w-[36rem] leading-[1.6] text-[15px] font-normal">
              Three areas I build in — click any volume to explore.
            </p>
          </div>
        </AnimateOnScroll>
        
        <EngineeringManuals />
      </div>

      {/* Bottom: Perspective & Bio Spread */}
      <div className="w-full border-b border-[var(--surface-border)] bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[50vh]">
          {/* Left — Editorial Perspective & Tenets */}
          <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 py-16 lg:py-20 lg:border-r border-[var(--surface-border)]">
            <AnimateOnScroll variant="subtleRise">
              <div>
                <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-accent-500 block mb-4 select-none">
                  04B — PERSPECTIVE
                </span>
                <h3 className="font-editorial font-medium text-[28px] sm:text-[32px] lg:text-[36px] text-[var(--surface-text)] leading-[1.12] tracking-[-0.025em] mb-7">
                  Systems architecture meets interaction design.
                </h3>

                <div className="space-y-6 pt-2">
                  <div className="border-l-2 border-accent-500 pl-4">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--surface-text)] block mb-1">
                      01 / Deterministic Engineering
                    </span>
                    <p className="text-[13.5px] text-[var(--surface-muted)] leading-relaxed">
                      Correctness belongs in the data layer. Deterministic range queries, ACID transactions, and typed schemas eliminate entire classes of runtime errors.
                    </p>
                  </div>

                  <div className="border-l-2 border-accent-500/50 pl-4">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--surface-text)] block mb-1">
                      02 / Taste as a Function of Detail
                    </span>
                    <p className="text-[13.5px] text-[var(--surface-muted)] leading-relaxed">
                      Typography, spatial rhythm, performance, and micro-interactions determine whether software feels credible and pleasant to operate.
                    </p>
                  </div>

                  <div className="border-l-2 border-accent-500/50 pl-4">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--surface-text)] block mb-1">
                      03 / End-to-End Ownership
                    </span>
                    <p className="text-[13.5px] text-[var(--surface-muted)] leading-relaxed">
                      From customer problem formulation and system diagrams down to pixel implementation, deployment, and performance tuning.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right — Narrative & Ledger */}
          <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 py-16 lg:py-20 bg-black/[0.03] dark:bg-white/[0.02]">
            <AnimateOnScroll variant="subtleRise" delay={0.15}>
              <div className="space-y-6 max-w-xl text-[16px] lg:text-[17px]">
                <p className="text-[var(--surface-text)] opacity-85 leading-[1.65] font-normal">
                  I am a full-stack and AI product engineer focused on building web systems that combine clean, art-directed user experiences with robust backend architecture.
                </p>
                <p className="text-[var(--surface-text)] opacity-85 leading-[1.65] font-normal">
                  I enjoy transforming ambiguous challenges into coherent products — designing intuitive interfaces, engineering reliable APIs, integrating intelligent workflows, and thinking deeply about how distributed systems operate under pressure.
                </p>
                <p className="text-[var(--surface-text)] opacity-85 leading-[1.65] font-normal">
                  Software is not just code — it is about identifying core user friction, making deliberate architectural tradeoffs, and delivering tools that are <span className="text-[var(--surface-text)] font-semibold underline decoration-accent-500/40 underline-offset-4">useful, fast, and enduring.</span>
                </p>

                {/* Status Ledger */}
                <div className="pt-8 border-t border-[var(--surface-border)] grid grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-[var(--surface-muted)] block mb-1 tracking-wider uppercase text-[10px]">CURRENT FOCUS</span>
                    <span className="text-[var(--surface-text)] font-medium">Full-Stack & Applied AI</span>
                  </div>
                  <div>
                    <span className="text-[var(--surface-muted)] block mb-1 tracking-wider uppercase text-[10px]">EDUCATION</span>
                    <span className="text-[var(--surface-text)] font-medium">B.Tech in CSE</span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
