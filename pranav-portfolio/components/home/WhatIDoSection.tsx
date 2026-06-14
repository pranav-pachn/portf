import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { services } from '@/data/services';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';

export function WhatIDoSection() {
  return (
    <section id="what-i-do" className="py-24 bg-surface">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3 shrink-0">
            <AnimateOnScroll>
              <SectionHeading
                heading="Services"
                eyebrow="What I Do"
                subtitle="I specialize in building full-stack web systems that are fast, reliable, and thoughtfully designed. My work combines frontend polish, backend architecture, and AI-driven workflows to turn product ideas into usable, production-ready experiences."
              />
            </AnimateOnScroll>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              return (
                <AnimateOnScroll key={service.name} delay={0.1 + index * 0.1}>
                  <Card hoverable className="h-full flex flex-col p-8 bg-bg group border-border">
                    <div className="text-5xl font-display font-black text-border/50 mb-6 group-hover:text-accent-500/20 transition-colors duration-[var(--duration-normal)]">
                      0{index + 1}
                    </div>
                    
                    <h3 className="text-xl font-bold font-display text-text-primary mb-3 group-hover:text-accent-500 transition-colors">
                      {service.name}
                    </h3>
                    
                    <p className="text-sm text-text-secondary mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-col gap-3 mt-auto mb-8">
                      {service.capabilityLines?.map((line, i) => (
                        <div key={i} className="text-sm text-text-primary font-medium flex items-start">
                          <span className="text-accent-500 mr-2 mt-0.5 opacity-60">▹</span>
                          <span className="leading-tight">{line.join(', ')}</span>
                        </div>
                      ))}
                    </div>

                    {service.projectLinks && service.projectLinks.length > 0 && (
                      <div className="pt-5 border-t border-border/50 text-xs text-text-muted flex items-center flex-wrap gap-2">
                        <span className="font-medium text-text-secondary">Used in:</span>
                        {service.projectLinks.map((link, i) => (
                          <div key={link.href} className="flex items-center">
                            <a 
                              href={link.href}
                              className="hover:text-[var(--color-accent-500)] transition-colors relative group/link"
                            >
                              {link.label.replace('View ', '')}
                              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--color-accent-500)] transition-all group-hover/link:w-full" />
                            </a>
                            {i < service.projectLinks!.length - 1 && <span className="mx-2 text-border">&bull;</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
