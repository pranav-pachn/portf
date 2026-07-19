'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Container } from '@/components/ui/container';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { CursorHover } from '@/components/motion/CursorHover';

interface ProjectPanelProps {
  project: FeaturedProject;
  index: number;
}

export function ProjectPanel({ project, index }: ProjectPanelProps) {
  const formattedIndex = (index + 1).toString().padStart(2, '0');
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isEven = index % 2 === 0;

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current) return;

    // 1. Enter Animation (Scrub)
    gsap.fromTo(contentRef.current, {
      scale: 0.9,
      opacity: 0.3,
      y: 50,
    }, {
      scale: 1,
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%', // Starts when top of section is just peeking in
        end: 'top 30%',   // Fully visible when top reaches 30% of viewport
        scrub: true,
      }
    });

    // 2. Exit Animation (Scrub)
    gsap.fromTo(contentRef.current, {
      scale: 1,
      opacity: 1,
    }, {
      scale: 0.95,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top', // Starts when top of section hits the top of viewport
        end: 'bottom top', // Ends when bottom of section hits top of viewport
        scrub: true,
      }
    });

    // Subtle Image Parallax (keep this as it adds depth)
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, {
        y: -40,
        scale: 1.05,
      }, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className={cn(
        "py-16 md:py-32 flex items-center border-t border-border/50 overflow-hidden",
        isEven ? "bg-bg" : "bg-surface"
      )} 
      style={{ '--project-accent': project.accentColor || 'var(--color-accent-500)' } as React.CSSProperties}
    >
      <Container>
        <div ref={contentRef} className="flex flex-col w-full max-w-6xl mx-auto origin-center">
          
          {/* Top Section: Large Index */}
          <div className="mb-6 md:mb-10">
             <span 
               ref={indexRef}
               className="text-[6rem] md:text-[10rem] leading-none font-display font-black text-border/40 select-none block"
             >
               {formattedIndex}
             </span>
          </div>

          {/* Middle Section: Large Full-Width Image wrapped in CursorHover */}
          <div className="w-full mb-12 md:mb-16">
            <CursorHover 
              href={project.caseStudy ? `/work/${project.id}` : null} 
              text="Case Study" 
              external={false}
              className="w-full"
            >
              <div 
                ref={imageContainerRef}
                className="w-full aspect-video overflow-hidden rounded-2xl border border-border bg-surface-elevated relative transition-colors duration-500 group-hover:border-[var(--project-accent)]/50 shadow-2xl block"
              >
                {project.image ? (
                  <Image
                    ref={imageRef as any}
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    quality={90}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--project-accent)]/30 font-display text-2xl font-bold">
                    {project.title} Screenshot
                  </div>
                )}
                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
              </div>
            </CursorHover>
          </div>

          {/* Bottom Section: Details Grid */}
          <div className="flex flex-col gap-10 lg:gap-16">
            
            {/* Title Row */}
            <div className="max-w-4xl">
              <span className="text-sm font-bold text-text-muted uppercase tracking-widest block mb-4">
                {project.category}
              </span>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-text-primary mb-6 text-[var(--project-accent)] tracking-tight leading-none">
                {project.title}
              </h3>
              <p className="text-lg md:text-2xl text-text-secondary leading-relaxed font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Split Grid for Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pt-10 border-t border-border/50">
              
              {/* Left Column: Engineering Focus */}
              <div className="md:col-span-4">
                <div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest block mb-5">
                    Engineering Focus
                  </span>
                  {project.engineeringFocus && (
                    <div className="flex flex-col gap-3">
                      {project.engineeringFocus.map((focus) => (
                        <span key={focus.label} className="text-base font-medium text-text-primary flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-[var(--project-accent)]/50" />
                           {focus.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Center Column: Key Decision */}
              <div className="md:col-span-8 lg:col-span-5">
                <div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest block mb-5">
                    Key Engineering Decision
                  </span>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed font-medium italic border-l-2 pl-4" style={{ borderLeftColor: 'var(--project-accent)' }}>
                    "{project.keyDecision || project.architectureDecisions?.[0] || project.engineeringChallenge}"
                  </p>
                </div>
              </div>

              {/* Right Column: Links */}
              <div className="md:col-span-12 lg:col-span-3 flex flex-col justify-between items-start lg:items-end space-y-8 mt-6 lg:mt-0">
                <div className="w-full flex flex-col gap-4">
                  {project.caseStudy ? (
                    <Link 
                      href={`/work/${project.id}`}
                      className="inline-flex items-center text-[var(--project-accent)] hover:text-text-primary transition-colors font-bold group text-lg"
                    >
                      Case Study 
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center text-text-muted font-bold cursor-not-allowed text-lg">
                      Case Study Coming Soon
                    </span>
                  )}
                  
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-text-secondary hover:text-[var(--project-accent)] transition-colors font-medium text-base group"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                      Live Demo
                    </a>
                  )}

                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-text-secondary hover:text-[var(--project-accent)] transition-colors font-medium text-base group"
                    >
                      <Github className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

            </div>
            
            {/* Bottom Row: Tech Tags */}
            <div>
              <div className="flex flex-wrap items-center gap-3 pt-6">
                {project.stack.slice(0, 5).map(tech => (
                  <span key={tech} className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-text-secondary bg-surface rounded-full border border-border hover:border-[var(--project-accent)]/50 transition-colors">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 5 && (
                  <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-text-muted bg-surface/50 rounded-full border border-border/50">
                    +{project.stack.length - 5}
                  </span>
                )}
                {project.year && (
                  <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--project-accent)] bg-[var(--project-accent)]/10 rounded-full border border-[var(--project-accent)]/20 ml-auto">
                    {project.year}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
