'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Spotlight } from '@/components/ui/spotlight';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Github, Linkedin, ArrowRight, FileText } from 'lucide-react';
import { site } from '@/data/site';

export function HeroSection() {
  const stack = ['React', 'Next.js', 'TypeScript', 'FastAPI', 'TensorFlow'];

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-bg bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-fade" />
      <div className="hidden lg:block absolute inset-0 z-0">
        <Spotlight />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto md:mx-0 flex flex-col items-center md:items-start text-center md:text-left">
          
          <AnimateOnScroll variant="slide" delay={0.1}>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <Badge variant="accent" className="px-3 py-1 text-sm shadow-glow">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mr-2 animate-pulse" />
                Available for opportunities
              </Badge>
              <span className="text-lg text-text-secondary font-medium">
                Pranav Pachunoori
              </span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="slide" delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-text-primary leading-[1.1] mb-6">
              Building <span className="text-accent-500">AI-integrated</span> web systems for real-world products.
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll variant="slide" delay={0.3}>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10">
              Full-stack developer focused on polished interfaces, backend architecture, and explainable AI workflows — using React, Next.js, FastAPI, and modern deployment practices.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="slide" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-12">
              <MagneticButton>
                <Button href="#work" size="lg" icon={<ArrowRight className="w-5 h-5 order-last ml-2 mr-0 group-hover:translate-x-1 transition-transform" />}>
                  View My Work
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/resume/pranav-pachunoori-resume.pdf" variant="secondary" size="lg" icon={<FileText className="w-5 h-5 mr-2" />}>
                  Read Resume
                </Button>
              </MagneticButton>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade" delay={0.5}>
            <div className="flex flex-col md:flex-row items-center md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <span className="text-sm font-medium text-text-muted uppercase tracking-wider">Core Stack:</span>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {stack.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium text-text-secondary bg-surface-hover rounded border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </Container>
    </section>
  );
}
