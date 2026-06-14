'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';

export function ArchIntroPanel() {
  return (
    <section id="architecture" className="py-24 bg-bg min-h-screen flex items-center justify-center text-center">
      <Container>
        <AnimateOnScroll variant="scale">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-accent-500 uppercase tracking-widest mb-6">
              Architecture & Systems
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-text-primary tracking-tight max-w-4xl mb-8">
              How I think about systems.
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl leading-relaxed font-medium">
              Beyond the interface. Building for reliability through clear service boundaries, modular validation, and explainable AI workflows.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
