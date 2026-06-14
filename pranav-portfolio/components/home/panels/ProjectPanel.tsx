'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';

interface ProjectPanelProps {
  project: FeaturedProject;
  index: number;
}

export function ProjectPanel({ project, index }: ProjectPanelProps) {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <section className="py-24 min-h-screen flex items-center bg-bg" style={{ '--project-accent': project.accentColor || 'var(--color-accent-500)' } as React.CSSProperties}>
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col lg:w-1/2 flex-shrink-0">
            <AnimateOnScroll variant="slideRight">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xl font-display font-bold text-border/60">
                  {formattedIndex}
                </span>
                <div className="h-px w-12 bg-border" />
                <Badge variant="outline" className="border-border text-text-secondary bg-transparent">
                  {project.category}
                </Badge>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-display font-black text-text-primary mb-4 text-[var(--project-accent)]">
                {project.title}
              </h3>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed font-medium">
                {project.tagline}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-surface p-4 rounded-lg border border-border">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Problem</span>
                  <p className="text-sm text-text-secondary">{project.problem}</p>
                </div>
                <div className="bg-surface p-4 rounded-lg border border-border">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Solution</span>
                  <p className="text-sm text-text-secondary">{project.solution}</p>
                </div>
                <div className="bg-surface p-4 rounded-lg border border-border border-l-2" style={{ borderLeftColor: 'var(--project-accent)' }}>
                  <span className="text-xs font-bold text-[var(--project-accent)] uppercase tracking-wider block mb-1">Architecture Highlight</span>
                  <p className="text-sm text-text-primary">{project.architectureDecisions?.[0] || project.engineeringChallenge}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.slice(0, 5).map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium text-text-secondary bg-surface-hover rounded border border-border">
                    {tech}
                  </span>
                ))}
              </div>
              
              <Link 
                href={`/work/${project.id}`}
                className="inline-flex items-center text-[var(--project-accent)] hover:text-text-primary transition-colors font-bold group"
              >
                Read Case Study 
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Image */}
          <div className="flex flex-col lg:w-1/2 w-full">
            <AnimateOnScroll variant="scale">
              <Link href={`/work/${project.id}`} className="block group">
                <div className="w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl border border-border/60 bg-surface/50 relative transition-all duration-500 group-hover:border-[var(--project-accent)]/50 group-hover:shadow-[0_0_40px_-15px_var(--project-accent)]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out)]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--project-accent)]/50 font-display text-xl font-bold">
                      {project.title} Screenshot
                    </div>
                  )}
                  
                  {/* Subtle glow overlay on hover */}
                  <div className="absolute inset-0 bg-[var(--project-accent)]/0 group-hover:bg-[var(--project-accent)]/10 transition-colors duration-500 pointer-events-none mix-blend-overlay" />
                </div>
              </Link>
            </AnimateOnScroll>
          </div>

        </div>
      </Container>
    </section>
  );
}
