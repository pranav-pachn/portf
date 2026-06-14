'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { FlowDiagram } from '@/components/architecture/FlowDiagram';
import { architectureDiagrams } from '@/data/architecture-diagrams';

export function SystemFlowPanel() {
  const diagram = architectureDiagrams[0]; // JobShield AI Pipeline

  if (!diagram) return null;

  return (
    <section className="py-24 bg-surface min-h-screen flex items-center">
      <Container wide>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          <div className="flex flex-col lg:w-[25%] flex-shrink-0">
            <AnimateOnScroll variant="slideRight">
              <span className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4 block">
                System Flow
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-black text-text-primary mb-6">
                Request-to-Response Pipeline
              </h3>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                {diagram.description}
              </p>
            </AnimateOnScroll>
          </div>

          <div className="lg:w-[75%] w-full">
            <AnimateOnScroll variant="fade" delay={0.2}>
              <div className="bg-bg rounded-xl border border-border p-6 md:p-12 w-full overflow-hidden shadow-sm">
                <FlowDiagram nodes={diagram.nodes} accentColor={diagram.accentColor} />
              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </Container>
    </section>
  );
}
