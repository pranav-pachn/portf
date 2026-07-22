'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { experience } from '@/data/experience';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
};

export function ExperiencePanel() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current || shouldReduceMotion) return;

    // The line grows as you scroll
    gsap.to('.timeline-line', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    // The dots and cards reveal as they enter
    const items = gsap.utils.toArray('.timeline-item', containerRef.current);
    
    items.forEach((item: any, i: number) => {
      const dot = item.querySelector('.timeline-dot');
      const card = item.querySelector('.timeline-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(2)',
      });

      tl.fromTo(card, {
        opacity: 0,
        x: i % 2 === 0 ? -30 : 30, // mobile might need adjustment but framer motion x handles it, we use GSAP x
      }, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.2');
    });

  }, { scope: containerRef, dependencies: [shouldReduceMotion] });

  return (
    <section ref={containerRef} id="experience" className="py-24 bg-surface border-t border-border flex items-center">
      <Container narrow>
        <AnimateOnScroll variant="maskReveal">
          <SectionHeading 
            eyebrow="Credibility" 
            heading="Experience & Education" 
            align="center"
          />
        </AnimateOnScroll>

        <div className="timeline-container relative max-w-4xl mx-auto mt-16 pb-12">
          {/* Base Background Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          
          {/* Growing Accent Line */}
          <div className="timeline-line absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-accent-500)] md:-translate-x-1/2 origin-top scale-y-0" />

          <div className="flex flex-col gap-8 md:gap-12">
            {experience.map((item, index) => {
              const Icon = typeIcons[item.type];
              const isEven = index % 2 === 0;
              
              return (
                <div key={item.id} className={cn(
                  "timeline-item relative flex w-full",
                  isEven ? "md:justify-start" : "md:justify-end"
                )}>
                  {/* Center Dot */}
                  <div className="timeline-dot absolute left-[24px] md:left-1/2 top-8 w-4 h-4 rounded-full bg-surface border-[3px] border-[var(--color-accent-500)] -translate-x-1/2 z-10 opacity-0 scale-0" />

                  {/* Card Container */}
                  <div className={cn(
                    "w-full md:w-1/2 pl-14 md:pl-0",
                    isEven ? "md:pr-12" : "md:pl-12"
                  )}>
                    <div className="timeline-card opacity-0">
                      <Card className="p-6 h-full border-border bg-bg flex flex-col group hover:border-[var(--color-accent-500)]/50 transition-colors shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-lg bg-surface text-accent-500 group-hover:scale-110 transition-transform overflow-hidden border border-border/50">
                            {item.logo ? (
                              <img 
                                src={item.logo} 
                                alt={`${item.organization} logo`} 
                                className={`w-full h-full object-cover ${item.invertLogo ? 'invert dark:invert-0' : ''}`} 
                              />
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-sans font-bold tracking-[-0.03em] text-lg text-text-primary">
                              {item.title}
                            </h3>
                            <div className="font-mono text-xs font-light text-text-muted mt-1 tracking-wide">
                              {item.organization} • {item.dateRange}
                            </div>
                          </div>
                        </div>
                        
                        {item.description && (
                          <p className="text-text-secondary text-sm leading-[1.6] mt-2 mb-4 font-normal max-w-[34rem]">
                            {item.description}
                          </p>
                        )}

                        {(item.techStack || item.outcomes) && (
                          <div className="mt-auto pt-5 border-t border-border/50 grid grid-cols-1 gap-4">
                            {item.techStack && (
                              <div>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.techStack.map((tech, idx) => (
                                    <span key={idx} className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded bg-surface border border-border text-text-secondary uppercase tracking-[0.14em]">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.outcomes && (
                              <div>
                                <ul className="space-y-1.5">
                                  {item.outcomes.map((outcome, idx) => (
                                    <li key={idx} className="text-[13px] text-text-secondary flex items-start gap-2">
                                      <span className="text-[var(--color-accent-500)] mt-0.5 font-bold">✓</span>
                                      <span className="leading-snug">{outcome}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <AnimateOnScroll variant="fade" delay={0.2}>
          <div className="mt-4 text-center text-sm font-normal text-text-muted border-t border-border/50 pt-8 max-w-[34rem] mx-auto leading-[1.6]">
            <span className="text-[var(--color-accent-500)] font-medium">Currently focused on:</span> advanced full-stack engineering and AI product development.
          </div>
        </AnimateOnScroll>

      </Container>
    </section>
  );
}
