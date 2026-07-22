'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Container } from '@/components/ui/container';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';

interface ComingSoonProjectsPanelProps {
  projects: FeaturedProject[];
}

export function ComingSoonProjectsPanel({ projects }: ComingSoonProjectsPanelProps) {
  return (
    <section className="py-24 bg-surface border-y border-border min-h-screen flex items-center">
      <Container>
        <AnimateOnScroll variant="scale">
          <div className="text-center mb-16">
            <span className="font-mono text-[13px] font-semibold text-text-muted uppercase tracking-[0.14em] block mb-4">
              Coming Soon
            </span>
            <h2 className="text-4xl md:text-[56px] font-sans font-bold text-text-primary tracking-[-0.04em] leading-[1]">
              More case studies in progress.
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.id} delay={0.1 + index * 0.1}>
              <div
                className="group p-8 rounded-xl bg-bg border border-border hover:border-[var(--project-accent)] transition-colors h-full flex flex-col"
                style={{ '--project-accent': project.accentColor || 'var(--color-accent-500)' } as React.CSSProperties}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold font-sans tracking-[-0.03em] text-text-primary group-hover:text-[var(--project-accent)] transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary mb-6 flex-grow leading-[1.6] font-normal max-w-[34rem]">
                  {project.tagline}
                </p>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="inline-flex items-center text-text-muted font-medium cursor-not-allowed text-xs">
                    Case Study Coming Soon
                  </span>
                  
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-text-secondary hover:text-[var(--project-accent)] transition-colors font-medium text-xs group/link"
                    >
                      Live
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-text-secondary hover:text-[var(--project-accent)] transition-colors font-medium text-xs group/link"
                    >
                      Source
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/50">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 text-text-muted bg-surface rounded">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 text-text-muted bg-surface rounded">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
