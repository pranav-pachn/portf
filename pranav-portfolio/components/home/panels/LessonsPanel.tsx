'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';

export function LessonsPanel() {
  const lessons = [
    {
      title: 'What broke',
      desc: 'Initially using monolithic scoring functions made it impossible to explain why an AI model flagged an item, frustrating users.'
    },
    {
      title: 'What improved',
      desc: 'Iterating to include Grad-CAM heatmaps and distinct evaluation stages built user trust and made debugging inference easier.'
    },
    {
      title: 'What I optimize for',
      desc: 'I now optimize for stateless, horizontally scalable services with comprehensive test coverage before adding feature complexity.'
    }
  ];

  return (
    <section className="py-24 bg-bg min-h-screen flex items-center">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Engineering Insights"
            heading="Lessons from shipping"
            subtitle="Real-world learnings from taking projects from idea to production."
            align="center"
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          {lessons.map((lesson, index) => (
            <AnimateOnScroll key={lesson.title} delay={0.1 + index * 0.1}>
              <Card className="h-full p-8 bg-surface border-t-4 shadow-sm" style={{ borderTopColor: 'var(--color-accent-500)' }}>
                <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                  {lesson.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {lesson.desc}
                </p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
