'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { FlowDiagram } from '@/components/architecture/FlowDiagram';
import { PageHeader } from '@/components/layout/PageHeader';
import { CaseStudySection } from '@/components/case-study/CaseStudySection';
import { ProjectMetaStrip } from '@/components/case-study/ProjectMetaStrip';
import { NextProjectCard } from '@/components/case-study/NextProjectCard';
import { BehindTheBuild } from '@/components/projects/BehindTheBuild';
import { CursorHover } from '@/components/motion/CursorHover';

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

  return (
    <article className="min-h-screen bg-bg" style={{ '--project-accent': project.accentColor || 'var(--color-accent-500)' } as React.CSSProperties}>
      
      {/* 1. Header with Cover Image and Meta Strip */}
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
            className="object-cover" 
            sizes="100vw"
            priority
          />
        </CursorHover>
        
        <ProjectMetaStrip project={project} />
      </PageHeader>

      {/* 2. Problem */}
      <CaseStudySection index="01" title="The Problem" background="default" width="narrow">
        <div className="space-y-6 text-lg border-l-4 border-[var(--project-accent)] pl-6 text-text-secondary">
          {caseStudy.problemContext.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </CaseStudySection>

      {/* 3. Solution */}
      <CaseStudySection index="02" title="The Solution" background="surface" width="narrow">
        <p className="text-xl leading-relaxed text-text-primary font-medium">
          {project.solution}
        </p>
      </CaseStudySection>

      {/* 4. Architecture */}
      <CaseStudySection index="03" title="Architecture" background="default" width="wide">
        <div className="mt-8">
          <FlowDiagram nodes={caseStudy.systemDesignSteps} accentColor={project.accentColor} />
        </div>
      </CaseStudySection>

      {/* 5. Behind the Build */}
      <CaseStudySection index="04" title="Behind the Build" background="surface" width="standard">
        <BehindTheBuild project={project} variant="full" />
      </CaseStudySection>

      {/* 6. Outcome / Learnings (combined with tech challenges) */}
      {(project.engineeringChallenge || project.iteration || project.learned) && (
        <CaseStudySection index="05" title="Outcome & Learnings" background="default" width="narrow">
          <div className="space-y-12">
            {project.engineeringChallenge && (
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4 font-display">The Hardest Part</h3>
                <p className="text-lg text-text-secondary leading-relaxed">{project.engineeringChallenge}</p>
              </div>
            )}
            {project.iteration && (
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4 font-display">Iteration & Trade-offs</h3>
                <p className="text-lg text-text-secondary leading-relaxed">{project.iteration}</p>
              </div>
            )}
            {project.learned && (
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4 font-display">Key Takeaway</h3>
                <p className="text-lg text-text-secondary leading-relaxed">{project.learned}</p>
              </div>
            )}
          </div>
        </CaseStudySection>
      )}

      {/* Visuals (Screenshots) */}
      {caseStudy.screenshots.length > 0 && (
        <section className="py-24 bg-surface border-t border-border">
          <Container wide>
            <AnimateOnScroll>
              <SectionHeading eyebrow="Visuals" heading="Product Screenshots" align="center" />
              <div className="mt-16 space-y-16">
                {caseStudy.screenshots.map((shot, i) => (
                  <figure key={i} className="flex flex-col items-center text-center">
                    <div className="relative w-full rounded-xl overflow-hidden border border-border shadow-lg aspect-[16/10] mb-6">
                      <Image src={shot.src} alt={shot.alt} fill className="object-cover" />
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
