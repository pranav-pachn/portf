'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Brain, Layers, Layout, Zap } from 'lucide-react';

export function WhatIBuildPanel() {
  const items = [
    {
      title: 'AI-integrated web products',
      desc: 'Seamlessly embedding LLMs and ML models into user-facing applications.',
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: 'Full-stack systems',
      desc: 'Architecting robust data models, APIs, and scalable infrastructure.',
      icon: <Layers className="w-6 h-6" />
    },
    {
      title: 'Polished product interfaces',
      desc: 'Crafting responsive, accessible, and highly interactive user experiences.',
      icon: <Layout className="w-6 h-6" />
    },
    {
      title: 'Startup-minded execution',
      desc: 'Moving fast with a focus on product value, user needs, and quick iteration.',
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <section id="what-i-build" className="py-32 md:py-40 bg-surface min-h-screen flex flex-col justify-center">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Identity"
            heading="What I Build"
            subtitle="I specialize in turning complex logic into usable, production-ready experiences."
            align="center"
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <AnimateOnScroll key={item.title} delay={0.1 + index * 0.1}>
              <Card hoverable className="h-full flex flex-col p-8 bg-bg group border-border">
                <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-accent-500 mb-6 group-hover:scale-110 transition-transform duration-300">
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
