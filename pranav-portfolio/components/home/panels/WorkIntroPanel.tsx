'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';

export function WorkIntroPanel() {
  return (
    <section id="work" className="py-24 bg-surface min-h-screen flex items-center justify-center text-center">
      <Container>
        <AnimateOnScroll variant="scale">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-accent-500 uppercase tracking-widest mb-6">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-text-primary tracking-tight max-w-4xl mb-8">
              AI-integrated systems built to ship, not just to demo.
            </h2>
            <div className="flex items-center space-x-4 text-text-muted">
              <span className="w-12 h-px bg-border"></span>
              <span className="text-sm font-medium uppercase tracking-widest">3 Featured Projects</span>
              <span className="w-12 h-px bg-border"></span>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
