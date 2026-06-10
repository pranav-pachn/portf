'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { FlowDiagram } from '@/components/architecture/FlowDiagram';
import { BehindTheBuild } from '@/components/projects/BehindTheBuild';

interface CaseStudyPageProps {
  project: FeaturedProject;
  nextProject?: FeaturedProject;
}

export function CaseStudyPage({ project, nextProject }: CaseStudyPageProps) {
  if (!project.caseStudy) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center text-center">
        <Container>
          <h1 className="text-4xl font-display font-bold mb-4">Case Study Coming Soon</h1>
          <p className="text-text-secondary mb-8">The deep dive for {project.title} is currently being written.</p>
          <Button href="/#work" variant="secondary" icon={<ArrowLeft className="w-4 h-4 order-first mr-2" />}>Back to Projects</Button>
        </Container>
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <article className="min-h-screen pb-24" style={{ '--project-accent': project.accentColor || 'var(--color-accent-500)' } as React.CSSProperties}>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 bg-surface overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--project-accent)]/5 to-transparent pointer-events-none" />
        <Container className="relative z-10 text-center max-w-4xl">
          <AnimateOnScroll>
            <Badge variant="accent" className="mb-6">{project.title}</Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tight mb-6 leading-tight">
              {project.tagline}
            </h1>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {project.stack.map(tech => (
                <Badge key={tech} variant="outline" className="bg-bg">{tech}</Badge>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              {project.liveUrl && <Button href={project.liveUrl} external>View Live</Button>}
              {project.githubUrl && <Button href={project.githubUrl} variant="secondary" external>View Source</Button>}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-24">
        <Container narrow>
          <AnimateOnScroll>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-text-primary">
              {caseStudy.overview}
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Problem Context */}
      <section className="py-24 bg-surface-hover">
        <Container narrow>
          <AnimateOnScroll>
            <SectionHeading eyebrow="Context" heading="The Problem" />
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed border-l-4 border-[var(--project-accent)] pl-6">
              {caseStudy.problemContext.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* System Design */}
      <section className="py-24">
        <Container>
          <AnimateOnScroll>
            <SectionHeading eyebrow="Architecture" heading="System Design" align="center" />
            <div className="mt-16">
              <FlowDiagram nodes={caseStudy.systemDesignSteps} accentColor={project.accentColor} />
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Behind the Build */}
      <section className="py-24">
        <Container narrow>
          <AnimateOnScroll>
            <BehindTheBuild project={project} variant="full" />
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Screenshots */}
      {caseStudy.screenshots.length > 0 && (
        <section className="py-24 bg-surface">
          <Container>
            <AnimateOnScroll>
              <SectionHeading eyebrow="Visuals" heading="Product Screenshots" align="center" />
              <div className="mt-12 space-y-16">
                {caseStudy.screenshots.map((shot, i) => (
                  <figure key={i} className="flex flex-col items-center text-center">
                    <div className="relative w-full max-w-5xl rounded-lg overflow-hidden border border-border shadow-lg aspect-[16/10] mb-4">
                      <Image src={shot.src} alt={shot.alt} fill className="object-cover" />
                    </div>
                    <figcaption className="text-text-secondary text-sm">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </AnimateOnScroll>
          </Container>
        </section>
      )}



      {/* Navigation */}
      <section className="py-12 border-t border-border">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link href="/#work" className="group flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
            
            {nextProject && (
              <Link href={`/work/${nextProject.id}`} className="group flex items-center gap-4 text-right">
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Next Project</div>
                  <div className="text-base font-bold text-text-primary group-hover:text-[var(--project-accent)] transition-colors">{nextProject.title}</div>
                </div>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-[var(--project-accent)] transition-colors">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )}
          </div>
        </Container>
      </section>
    </article>
  );
}
