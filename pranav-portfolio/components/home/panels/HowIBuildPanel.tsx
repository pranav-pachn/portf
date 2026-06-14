'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Code, Server, Eye, Rocket } from 'lucide-react';

export function HowIBuildPanel() {
  const items = [
    {
      title: 'Frontend interactions',
      desc: 'React, Next.js, and Framer Motion for smooth, accessible, component-driven UI.',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'Backend APIs',
      desc: 'FastAPI, Node.js, and PostgreSQL for reliable, stateless, high-performance data delivery.',
      icon: <Server className="w-6 h-6" />
    },
    {
      title: 'Explainable AI workflows',
      desc: 'Designing AI that shows its reasoning, building trust through visual feedback.',
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: 'Reliable deployment',
      desc: 'CI/CD pipelines, Docker, and comprehensive testing to ship with confidence.',
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  return (
    <section id="how-i-build" className="py-24 bg-bg border-t border-border min-h-screen flex items-center">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Capability"
            heading="How I Build"
            subtitle="The engineering practices and stacks I use to deliver quality software."
            align="center"
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <AnimateOnScroll key={item.title} delay={0.1 + index * 0.1}>
              <Card hoverable className="h-full flex flex-col p-8 bg-surface group border-border">
                <div className="w-12 h-12 rounded-lg bg-bg flex items-center justify-center text-accent-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
