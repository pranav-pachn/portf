'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { Spotlight } from '@/components/ui/spotlight';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Container } from '@/components/ui/container';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export function HeroPanel() {
  const smoothScrollToWork = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden bg-bg">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025] blueprint-grid-ambient" />
      <div className="hidden lg:block absolute inset-0 z-0">
        <Spotlight />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center gap-16 lg:gap-8">
          
          {/* Central Column: Narrative */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-10 lg:pt-0">
            
            <AnimateOnScroll variant="maskReveal" delay={0.1}>
              <div className="mb-8 flex flex-col items-center gap-3">
                <span className="font-mono text-[13px] font-semibold text-accent-500 uppercase tracking-[0.14em]">
                  01 — IDENTITY
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-text-primary tracking-wide">
                    Pranav Pachunoori
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span className="text-sm text-text-secondary font-medium">
                    Full-Stack & AI Engineer
                  </span>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimatedText 
              as="h1"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-sans font-extrabold tracking-[-0.06em] text-text-primary leading-[0.95] mb-8 justify-center"
              delay={0.2}
              duration={1.5}
              stagger={0.05}
              segments={[
                { text: 'Building ' },
                { text: 'intelligent ', className: 'text-accent-500' },
                { break: true },
                { text: 'products for ' },
                { break: true },
                { text: 'real-world engineering.' },
              ]}
            />
            
            <AnimateOnScroll variant="fade" delay={0.4}>
              <p className="text-xl text-text-secondary max-w-[34rem] mx-auto mb-12 leading-[1.6] font-normal tracking-normal">
                I build full-stack applications, architect backend systems, and ship AI features into production.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="slide" delay={0.5}>
              <div className="flex flex-row items-center justify-center gap-8">
                <MagneticButton>
                  <Button 
                    href="#work" 
                    onClick={smoothScrollToWork}
                    className="rounded-full px-8 py-6 shadow-[0_0_20px_rgba(var(--color-accent-500),0.2)] hover:shadow-[0_0_30px_rgba(var(--color-accent-500),0.4)] transition-shadow text-base font-semibold" 
                    icon={<ArrowRight className="w-5 h-5 order-last ml-3 mr-0 group-hover:translate-x-1 transition-transform" />}
                  >
                    View Selected Work
                  </Button>
                </MagneticButton>
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </Container>
    </section>
  );
}
