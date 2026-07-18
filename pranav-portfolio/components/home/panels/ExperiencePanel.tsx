'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { experience } from '@/data/experience';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { GraduationCap, Briefcase, Award } from 'lucide-react';

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
};

export function ExperiencePanel() {
  return (
    <section id="experience" className="py-24 bg-surface border-t border-border flex items-center">
      <Container narrow>
        <AnimateOnScroll>
          <SectionHeading 
            eyebrow="Credibility" 
            heading="Experience & Education" 
            align="center"
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
          {experience.map((item, index) => {
            const Icon = typeIcons[item.type];
            
            return (
              <AnimateOnScroll key={item.id} variant="scale" delay={0.1 * index}>
                <Card className="p-6 h-full border-border bg-bg flex flex-col group hover:border-[var(--color-accent-500)]/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-lg bg-surface text-accent-500 group-hover:scale-110 transition-transform overflow-hidden">
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
                      <h3 className="font-display font-bold text-lg text-text-primary">
                        {item.title}
                      </h3>
                      <div className="text-sm font-medium text-text-muted">
                        {item.organization} • {item.dateRange}
                      </div>
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="text-text-secondary text-sm leading-relaxed mt-auto">
                      {item.description}
                    </p>
                  )}

                  {(item.techStack || item.outcomes) && (
                    <div className="mt-6 pt-5 border-t border-border/50 grid grid-cols-1 gap-5">
                      {item.techStack && (
                        <div>
                          <div className="text-xs font-semibold text-text-primary mb-3 uppercase tracking-wider">Tech Stack</div>
                          <div className="flex flex-wrap gap-2">
                            {item.techStack.map((tech, idx) => (
                              <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-md bg-surface border border-border text-text-secondary">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.outcomes && (
                        <div>
                          <div className="text-xs font-semibold text-text-primary mb-3 uppercase tracking-wider">Key Outcomes</div>
                          <ul className="space-y-2">
                            {item.outcomes.map((outcome, idx) => (
                              <li key={idx} className="text-sm text-text-secondary flex items-start gap-2.5">
                                <span className="text-accent-500 mt-0.5">✓</span>
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll variant="fade" delay={0.5}>
          <div className="mt-12 text-center text-sm font-medium text-text-muted border-t border-border pt-6 max-w-4xl mx-auto">
            <span className="text-accent-500">Currently focused on:</span> advanced full-stack engineering and AI product development.
          </div>
        </AnimateOnScroll>

      </Container>
    </section>
  );
}
