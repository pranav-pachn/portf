'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';

export function DecisionsPanel() {
  const decisions = [
    {
      title: 'Why certain stacks',
      desc: 'I choose Next.js for unified routing and rendering, FastAPI when inference latency matters, and Supabase for real-time state without backend bloat.'
    },
    {
      title: 'Why modularity matters',
      desc: 'Separating evaluation logic from routing logic means I can test my AI pipelines independently of my frontend components.'
    },
    {
      title: 'Connecting UX and system design',
      desc: 'An explainable AI model isn\'t helpful if the UI can\'t display the reasoning. The data flow must support the user\'s need for trust.'
    }
  ];

  return (
    <section id="build-decisions" className="py-24 bg-surface border-y border-border min-h-screen flex items-center">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Behind the Build"
            heading="Decisions I care about"
            subtitle="My technical philosophy when architecting new projects."
            align="center"
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          {decisions.map((decision, index) => (
            <AnimateOnScroll key={decision.title} delay={0.1 + index * 0.1}>
              <Card className="h-full p-8 bg-bg border-t-4 shadow-sm" style={{ borderTopColor: 'var(--color-accent-500)' }}>
                <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                  {decision.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {decision.desc}
                </p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
