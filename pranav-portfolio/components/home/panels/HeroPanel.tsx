'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
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
            <div className="mb-6">
              <span className="text-xl md:text-2xl text-text-secondary font-medium tracking-wide">
                Pranav Pachunoori
              </span>
              <div className="text-sm font-bold text-accent-500 uppercase tracking-widest mt-2">
                GenAI + Full-Stack Developer
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="blur" delay={0.3}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-text-primary leading-[1.05] mb-8 max-w-4xl">
              Building <span className="text-accent-500">AI-integrated</span> web systems for real-world products.
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll variant="slide" delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-12">
              <MagneticButton>
                <Button href="#work" size="lg" icon={<ArrowRight className="w-5 h-5 order-last ml-2 mr-0 group-hover:translate-x-1 transition-transform" />}>
                  View Selected Work
                </Button>
              </MagneticButton>
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
