'use client';

import { useRef } from 'react';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { experience } from '@/data/experience';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { useExperienceTimeline } from '@/components/motion/useExperienceTimeline';

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
};

export function ExperiencePanel() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useExperienceTimeline({ containerRef, shouldReduceMotion });

  return (
    <section ref={containerRef} id="experience" className="py-24 bg-surface border-t border-border flex items-center relative z-10">
      <Container narrow>
        <AnimateOnScroll variant="maskReveal">
          <SectionHeading 
            eyebrow="03 — EXPERIENCE" 
            heading="From fundamentals to production systems." 
          />
        </AnimateOnScroll>

        <div className="timeline-container relative max-w-3xl mx-auto mt-20 pb-0">
          {/* Base Background Line */}
          <div className="absolute left-[24px] md:left-[80px] top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          
          {/* Growing Accent Line */}
          <div className="timeline-line absolute left-[24px] md:left-[80px] top-0 bottom-0 w-px bg-[var(--color-accent-500)] -translate-x-1/2 origin-top scale-y-0" />

          <div className="flex flex-col gap-12 md:gap-16 relative">
            {experience.map((item, index) => {
              const Icon = typeIcons[item.type];
              const isWork = item.type === 'work';
              
              return (
                <div key={item.id} className="timeline-item relative flex w-full justify-end">
                  {/* Center Dot */}
                  <div className="timeline-dot absolute left-[24px] md:left-[80px] top-8 w-4 h-4 rounded-full bg-surface border-[3px] border-[var(--color-accent-500)] -translate-x-1/2 z-10 opacity-0 scale-0" />

                  {/* Card Container */}
                  <div className="w-full pl-14 md:pl-[140px]">
                    <div className="timeline-card opacity-0">
                      <Card className={cn(
                        "p-6 h-full border-border bg-bg flex flex-col group hover:border-[var(--color-accent-500)]/50 transition-colors shadow-sm",
                        isWork ? "md:p-8" : "md:p-6 opacity-90 hover:opacity-100"
                      )}>
                        <div className="flex items-start md:items-center gap-4 mb-4 flex-col md:flex-row">
                          <div className={cn(
                            "flex flex-shrink-0 items-center justify-center rounded-lg bg-surface text-accent-500 group-hover:scale-110 transition-transform overflow-hidden border border-border/50",
                            isWork ? "w-12 h-12" : "w-10 h-10"
                          )}>
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
                            <h3 className={cn(
                              "font-sans font-bold tracking-[-0.03em] text-text-primary",
                              isWork ? "text-xl md:text-2xl" : "text-lg"
                            )}>
                              {item.title}
                            </h3>
                            <div className="font-mono text-xs font-medium text-text-muted mt-1.5 tracking-wide uppercase">
                              {item.organization} <span className="mx-2 text-border">—</span> {item.dateRange}
                            </div>
                          </div>
                        </div>
                        
                        {item.description && (
                          <p className="text-text-secondary text-sm md:text-base leading-[1.6] mt-2 mb-4 font-normal max-w-[34rem]">
                            {item.description}
                          </p>
                        )}

                        {(item.techStack || item.outcomes) && (
                          <div className="mt-auto pt-5 border-t border-border/50">
                            {item.techStack && (
                              <div className="mb-4">
                                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">Focus</div>
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
                              <div className="overflow-hidden md:max-h-0 md:opacity-0 md:group-hover:max-h-[500px] md:group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-h-[500px] opacity-100">
                                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 pt-2 border-t border-border/30 md:border-transparent md:pt-0">Role Focus</div>
                                <ul className="space-y-1.5">
                                  {item.outcomes.map((outcome, idx) => (
                                    <li key={idx} className="text-[13px] md:text-sm text-text-secondary flex items-start gap-2">
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

          {/* Currently Section */}
          <div className="currently-container relative flex w-full justify-end mt-16 pt-8 pb-12">
            <div className="currently-dot absolute left-[24px] md:left-[80px] top-[42px] w-3 h-3 rounded-full bg-[var(--color-accent-500)] -translate-x-1/2 z-10 opacity-0 scale-0" />
            <div className="w-full pl-14 md:pl-[140px]">
               <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">Currently</div>
               <p className="text-text-secondary text-base leading-[1.6] max-w-[34rem]">
                 Building AI-powered products and scalable full-stack systems.
               </p>
            </div>
          </div>
          
          {/* Terminal Connector for Bridge */}
          <div className="terminal-connector-container absolute left-[24px] md:left-[80px] -bottom-[120px] w-px h-[120px] -translate-x-1/2 hidden md:block">
             <div className="terminal-connector absolute top-0 left-0 w-full h-full bg-[var(--color-accent-500)] origin-top scale-y-0" />
          </div>
        </div>

      </Container>
    </section>
  );
}
