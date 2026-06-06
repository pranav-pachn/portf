import Link from 'next/link';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { FlowDiagram } from '@/components/architecture/FlowDiagram';
import { Card } from '@/components/ui/card';
import { architectureDiagrams } from '@/data/architecture-diagrams';
import { ArrowRight } from 'lucide-react';

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Systems Thinking"
            heading="Architecture & Systems"
            subtitle="Beyond the interface. How data, services, and models interact in production."
          />
        </AnimateOnScroll>
        
        <div className="space-y-12">
          {architectureDiagrams.map((diagram, index) => (
            <AnimateOnScroll key={diagram.id} delay={0.1 * index}>
              <Card hoverable className="p-0 overflow-hidden border-[var(--color-border)]">
                <Link href={`/work/${diagram.id}`} className="block p-8 group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                      <h3 className="text-[var(--text-2xl)] font-bold font-display text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-500)] transition-colors">
                        {diagram.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] max-w-2xl">
                        {diagram.description}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center text-[var(--text-sm)] font-bold text-[var(--color-accent-500)] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-[var(--duration-normal)]">
                      View Case Study <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                  
                  <div className="bg-[var(--color-bg)] rounded-[var(--radius-lg)] border border-[var(--color-border)] px-4 sm:px-8 py-12 md:py-16 w-full overflow-hidden">
                    <FlowDiagram nodes={diagram.nodes} accentColor={diagram.accentColor} />
                  </div>
                </Link>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
