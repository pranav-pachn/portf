'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { Spotlight } from '@/components/ui/spotlight';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Container } from '@/components/ui/container';
import { ArrowRight } from 'lucide-react';

export function HeroPanel() {
  const stack = ['React', 'Next.js', 'TypeScript', 'FastAPI', 'TensorFlow'];

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-bg bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-fade" />
      <div className="hidden lg:block absolute inset-0 z-0">
        <Spotlight />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto md:mx-0 flex flex-col items-center md:items-start text-center md:text-left">
          
          <AnimateOnScroll variant="slide" delay={0.1}>
            <div className="mb-12 flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-text-primary tracking-wide">
                  Pranav Pachunoori
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                <span className="text-sm text-text-secondary uppercase tracking-widest font-semibold">
                  Full-Stack & AI
                </span>
              </div>
              <p className="text-sm text-text-muted max-w-sm">
                Specializing in high-performance applications, intelligent systems, and scalable backend architecture.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimatedText 
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-display font-black tracking-tight text-text-primary leading-none mb-10 max-w-4xl"
            delay={0.3}
            segments={[
              { text: 'Building ' },
              { text: 'AI', className: 'text-accent-500' },
              { text: '-integrated' },
              { break: true, className: 'hidden md:block' },
              { text: ' web systems for' },
              { break: true, className: 'hidden md:block' },
              { text: ' real-world products.' },
            ]}
          />

          <AnimateOnScroll variant="slide" delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mb-12">
              <MagneticButton>
                <Button href="#work" className="rounded-full px-8 py-6" icon={<ArrowRight className="w-4 h-4 order-last ml-2 mr-0 group-hover:translate-x-1 transition-transform" />}>
                  View Selected Work
                </Button>
              </MagneticButton>
              <a href="#contact" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors flex items-center group">
                Contact Me
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-70 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
              </a>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade" delay={0.7}>
            <div className="flex flex-col md:flex-row items-center md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <span className="text-sm font-medium text-text-muted uppercase tracking-wider">Proven with:</span>
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
