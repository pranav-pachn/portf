'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { FlowDiagram } from '@/components/architecture/FlowDiagram';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProjectMetaStrip } from '@/components/case-study/ProjectMetaStrip';
import { NextProjectCard } from '@/components/case-study/NextProjectCard';
import { BehindTheBuild } from '@/components/projects/BehindTheBuild';
import { CursorHover } from '@/components/motion/CursorHover';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface CaseStudyPageProps {
  project: FeaturedProject;
  nextProject?: FeaturedProject;
  projectIndex: number;
  nextProjectIndex?: number;
}

export function CaseStudyPage({ project, nextProject, projectIndex, nextProjectIndex }: CaseStudyPageProps) {
  if (!project.caseStudy) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center text-center bg-bg">
        <Container>
          <h1 className="text-4xl font-display font-bold mb-4 text-text-primary">Case Study Coming Soon</h1>
          <p className="text-text-secondary mb-8">The deep dive for {project.title} is currently being written.</p>
          <Button href="/#work" variant="secondary" icon={<ArrowLeft className="w-4 h-4 order-first mr-2" />}>Back to Projects</Button>
        </Container>
      </div>
    );
  }

  const { caseStudy } = project;
  const formattedIndex = (projectIndex + 1).toString().padStart(2, '0');
  
  // Calculate how many horizontal panels we have
  const panels = [
    { id: 'problem', title: 'The Problem' },
    { id: 'solution', title: 'The Solution' },
    { id: 'architecture', title: 'Architecture' },
    { id: 'behind-build', title: 'Behind the Build' },
    ...(project.engineeringChallenge || project.iteration || project.learned ? [{ id: 'outcome', title: 'Outcome & Learnings' }] : [])
  ];

  return (
    <article className="min-h-screen bg-bg" style={{ '--project-accent': project.accentColor || 'var(--color-accent-500)' } as React.CSSProperties}>
      
      {/* 1. Header with Cover Image and Meta Strip (Vertical Scroll) */}
      <PageHeader 
        projectIndex={formattedIndex}
        title={project.title}
        subtitle={caseStudy.overview}
      >
        <CursorHover
          href={project.liveUrl || project.githubUrl}
          external={true}
          className="mt-12 w-full aspect-[21/9] rounded-2xl border border-border shadow-2xl"
        >
          <Image 
            src={project.image || ''} 
            alt={`${project.title} Cover`} 
            fill 
            className="object-contain" 
            sizes="100vw"
            priority
          />
        </CursorHover>
        
        <ProjectMetaStrip project={project} />
      </PageHeader>

      {/* VERTICAL NARRATIVE SECTION */}
      <div className="flex flex-col">
        {/* Panel 1: Problem */}
        <section className="py-24 px-6 md:px-24 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <span className="text-[var(--project-accent)] font-bold tracking-widest uppercase text-sm mb-4 block">01 — The Problem</span>
            <div className="space-y-6 text-xl md:text-2xl border-l-4 border-[var(--project-accent)] pl-8 py-4 text-text-secondary leading-relaxed">
              {caseStudy.problemContext.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Panel 2: Solution */}
        <section className="py-24 px-6 md:px-24 bg-surface border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[var(--project-accent)] font-bold tracking-widest uppercase text-sm mb-4 block">02 — The Solution</span>
            <h3 className="text-3xl md:text-5xl leading-tight text-text-primary font-medium font-display">
              {project.solution}
            </h3>
          </div>
        </section>

        {/* Panel 3: Architecture */}
        <section className="py-24 px-6 md:px-12 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <span className="text-[var(--project-accent)] font-bold tracking-widest uppercase text-sm mb-12 block text-center">03 — Architecture</span>
            <FlowDiagram nodes={caseStudy.systemDesignSteps} accentColor={project.accentColor} />
          </div>
        </section>

        {/* Panel 4: Behind the Build */}
        <section className="py-24 px-6 md:px-24 bg-surface border-b border-border">
          <div className="max-w-5xl mx-auto">
            <span className="text-[var(--project-accent)] font-bold tracking-widest uppercase text-sm mb-12 block text-center">04 — Behind the Build</span>
            <BehindTheBuild project={project} variant="full" />
          </div>
        </section>

        {/* Panel 5: Outcome (Optional) */}
        {(project.engineeringChallenge || project.iteration || project.learned) && (
          <section className="py-24 px-6 md:px-24 border-b border-border">
            <div className="max-w-4xl mx-auto">
              <span className="text-[var(--project-accent)] font-bold tracking-widest uppercase text-sm mb-12 block">05 — Outcome & Learnings</span>
              <div className="space-y-12">
                {project.engineeringChallenge && (
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-4 font-display">The Hardest Part</h3>
                    <p className="text-xl text-text-secondary leading-relaxed">{project.engineeringChallenge}</p>
                  </div>
                )}
                {project.iteration && (
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-4 font-display">Iteration & Trade-offs</h3>
                    <p className="text-xl text-text-secondary leading-relaxed">{project.iteration}</p>
                  </div>
                )}
                {project.learned && (
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-4 font-display">Key Takeaway</h3>
                    <p className="text-xl text-text-secondary leading-relaxed">{project.learned}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Visuals (Screenshots) - Back to Vertical */}
      {caseStudy.screenshots.length > 0 && (
        <section className="py-24 bg-surface border-t border-border">
          <Container wide>
            <AnimateOnScroll>
              <SectionHeading eyebrow="Visuals" heading="Product Screenshots" align="center" />
              <div className="mt-16 space-y-16">
                {caseStudy.screenshots.map((shot, i) => (
                  <figure key={i} className="flex flex-col items-center text-center">
                    <div className="relative w-full rounded-xl overflow-hidden border border-border shadow-lg aspect-[16/10] mb-6">
                      <Image src={shot.src} alt={shot.alt} fill className="object-contain" />
                    </div>
                    <figcaption className="text-text-secondary text-sm font-medium">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </AnimateOnScroll>
          </Container>
        </section>
      )}

      {/* Next Project Nav */}
      {nextProject && nextProjectIndex !== undefined && (
        <NextProjectCard project={nextProject} index={nextProjectIndex} />
      )}
    </article>
  );
}
