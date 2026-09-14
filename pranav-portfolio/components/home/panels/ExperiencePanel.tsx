'use client';

import { useRef } from 'react';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { experience } from '@/data/experience';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { GitPullRequest, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useExperienceTimeline } from '@/components/motion/useExperienceTimeline';
import { cn } from '@/lib/utils';

export function ExperiencePanel() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useExperienceTimeline({ containerRef, shouldReduceMotion });

  return (
    <section 
      ref={containerRef} 
      id="experience" 
      className="py-24 md:py-32 bg-surface/40 border-t border-border relative z-10 overflow-hidden"
    >
      <Container narrow>
        <AnimateOnScroll variant="maskReveal">
          <SectionHeading 
            eyebrow="04 — EXPERIENCE" 
            heading="From learning to shipping production software." 
          />
        </AnimateOnScroll>

        <div className="timeline-container relative max-w-4xl mx-auto mt-20 md:mt-24">
          {/* Base Inactive Central Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-12 w-[1.5px] bg-white/10 dark:bg-white/10 -translate-x-1/2" />
          
          {/* Active Growing Teal Line (Scrubbed on Scroll) */}
          <div className="timeline-active-line absolute left-6 md:left-1/2 top-0 bottom-12 w-[1.5px] bg-[var(--color-accent-500)] -translate-x-1/2 origin-top scale-y-0" />

          <div className="flex flex-col gap-16 md:gap-24 relative">
            {experience.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const isPrimary = idx === 0;
              const itemNum = `0${idx + 1}`;

              return (
                <div 
                  key={item.id}
                  className={cn(
                    "timeline-item relative w-full flex flex-col items-start",
                    isLeft 
                      ? "timeline-item-left md:flex-row md:justify-start" 
                      : "timeline-item-right md:flex-row md:justify-end"
                  )}
                >
                  {/* Center Node / Dot */}
                  <div className="timeline-dot absolute left-6 md:left-1/2 top-6 md:top-7 w-3.5 h-3.5 rounded-full bg-surface border-2 border-border -translate-x-1/2 z-20 transition-colors duration-300" />
                  
                  {/* Horizontal Connector Line (Desktop Only) */}
                  {isLeft ? (
                    <div className="timeline-connector hidden md:block absolute right-1/2 top-[34px] w-8 h-[1.5px] bg-[var(--color-accent-500)]/60 origin-right scale-x-0 opacity-0" />
                  ) : (
                    <div className="timeline-connector hidden md:block absolute left-1/2 top-[34px] w-8 h-[1.5px] bg-[var(--color-accent-500)]/60 origin-left scale-x-0 opacity-0" />
                  )}

                  {/* Card Container */}
                  <div className="w-full md:w-[calc(50%-32px)] pl-14 md:pl-0">
                    <div className="timeline-card opacity-0">
                      <Card className={cn(
                        "p-6 md:p-7 border-border/80 bg-bg/95 transition-all duration-300 shadow-md relative overflow-hidden group",
                        isPrimary 
                          ? "hover:border-[var(--color-accent-500)]/60" 
                          : "hover:border-[var(--color-accent-500)]/40"
                      )}>
                        {/* Primary Gradient Header Accent */}
                        {isPrimary && (
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-accent-500)] via-[var(--color-accent-500)]/40 to-transparent" />
                        )}

                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3.5">
                            {/* 44px Icon Container */}
                            <div className="w-11 h-11 rounded-lg bg-surface border border-border/60 flex items-center justify-center p-2 overflow-hidden flex-shrink-0 group-hover:border-[var(--color-accent-500)]/40 transition-colors">
                              {item.logo ? (
                                <img 
                                  src={item.logo} 
                                  alt={`${item.organization} logo`} 
                                  className={`w-full h-full object-contain ${item.invertLogo ? 'invert dark:invert-0' : ''}`} 
                                />
                              ) : item.type === 'opensource' ? (
                                <GitPullRequest className="w-5 h-5 text-accent-500" />
                              ) : (
                                <Sparkles className="w-5 h-5 text-accent-500" />
                              )}
                            </div>
                            <div>
                              <div className="font-mono text-[10px] font-semibold text-accent-500 uppercase tracking-widest mb-1">
                                {isPrimary ? `${itemNum} · PRIMARY EXPERIENCE` : item.type === 'opensource' ? `${itemNum} · OPEN SOURCE` : `${itemNum} · EXPERIENCE`}
                              </div>
                              <h3 className="font-display font-semibold text-lg md:text-xl tracking-tight text-text-primary leading-tight">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="font-mono text-xs text-text-muted mb-3 flex flex-wrap items-center gap-2">
                          <span className="text-text-primary font-medium">{item.organization}</span>
                          <span className="text-border">—</span>
                          <span>{item.dateRange}</span>
                        </div>

                        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-5 font-normal">
                          {item.description}
                        </p>

                        {/* Focus Tech Stack or Badges */}
                        {(item.techStack || item.badge || item.highlight) && (
                          <div className="pt-4 border-t border-border/40">
                            {item.techStack && (
                              <div>
                                <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2 font-semibold">
                                  FOCUS
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.techStack.map((tech) => (
                                    <span 
                                      key={tech} 
                                      className="font-mono text-[11px] px-2.5 py-1 rounded bg-surface border border-border/70 text-text-secondary tracking-wide uppercase"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {(item.badge || item.highlight) && (
                              <div className="flex items-center gap-2.5 mt-1">
                                {item.badge && (
                                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-accent-500/10 border border-accent-500/30 text-accent-500 tracking-wider">
                                    {item.badge}
                                  </span>
                                )}
                                {item.highlight && (
                                  <span className="font-mono text-[11px] font-medium text-text-secondary">
                                    {item.highlight}
                                  </span>
                                )}
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

            {/* Closing: Currently - Minimal Terminal-like Endpoint */}
            <div className="timeline-item-currently relative w-full flex flex-col md:flex-row md:justify-start items-start">
              {/* Center Node / Dot */}
              <div className="timeline-dot absolute left-6 md:left-1/2 top-4 w-3.5 h-3.5 rounded-full bg-surface border-2 border-border -translate-x-1/2 z-20 transition-colors duration-300" />
              
              {/* L-bracket connector branch */}
              <div className="timeline-connector hidden md:block absolute left-1/2 top-5 w-10 h-6 border-l-[1.5px] border-b-[1.5px] border-[var(--color-accent-500)]/60 origin-left scale-x-0 opacity-0" />
              
              {/* Terminal-like Content */}
              <div className="w-full pl-14 md:pl-0 md:ml-[calc(50%+40px)] md:max-w-md">
                <div className="timeline-currently-content opacity-0 bg-bg/85 border border-border/70 rounded-lg p-4 md:p-5 relative shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
                    </span>
                    <span className="font-mono text-[11px] font-bold text-accent-500 tracking-widest uppercase">
                      CURRENTLY
                    </span>
                  </div>
                  <p className="text-text-primary text-sm md:text-base leading-relaxed font-normal">
                    Building AI-powered products and scalable full-stack systems.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Fade-out Terminal Line transitioning into Engineering Manuals */}
          <div className="timeline-fade-line-container relative mt-12 flex justify-center">
            <div className="timeline-fade-line w-[1.5px] h-20 bg-gradient-to-b from-[var(--color-accent-500)] via-[var(--color-accent-500)]/30 to-transparent scale-y-0 origin-top" />
          </div>
        </div>
      </Container>
    </section>
  );
}
