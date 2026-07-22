'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Container } from '@/components/ui/container';
import { BrowserMockup } from '@/components/ui/BrowserMockup';
import { CursorHover } from '@/components/motion/CursorHover';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface StickyProjectShowcaseProps {
  projects: FeaturedProject[];
}

export function StickyProjectShowcase({ projects }: StickyProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const detailsLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  const shouldReduceMotion = useReducedMotion();
  const activeProject = projects[activeIndex] || projects[0];

  // GSAP ScrollTrigger to track scroll across the N * 100vh runway
  useGSAP(() => {
    if (shouldReduceMotion || !sectionRef.current || !stickyRef.current) return;

    const totalProjects = projects.length;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        // Calculate which project index should be active based on scroll progress
        const rawIndex = Math.floor(self.progress * totalProjects);
        const nextIndex = Math.min(totalProjects - 1, Math.max(0, rawIndex));
        if (nextIndex !== activeIndex) {
          setActiveIndex(nextIndex);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, { scope: sectionRef, dependencies: [projects.length, activeIndex, shouldReduceMotion] });

  // Independent Layer Choreography when activeIndex changes
  useGSAP(() => {
    if (shouldReduceMotion) return;

    // Animate out all inactive layers & animate in active layers
    projects.forEach((_, i) => {
      const detailsEl = detailsLayersRef.current[i];
      const imageEl = imageLayersRef.current[i];
      const isActive = i === activeIndex;

      // Screenshot Image Choreography (t = 0.0s)
      if (imageEl) {
        if (isActive) {
          gsap.fromTo(imageEl, {
            filter: 'brightness(0.85)',
            opacity: 0,
            scale: 0.98,
          }, {
            filter: 'brightness(1)',
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          gsap.to(imageEl, {
            filter: 'brightness(0.85)',
            opacity: 0,
            scale: 0.98,
            duration: 0.3,
            ease: 'power2.in',
            overwrite: 'auto',
          });
        }
      }

      // Details Choreography
      if (detailsEl) {
        if (isActive) {
          gsap.set(detailsEl, { opacity: 1, y: 0, pointerEvents: 'auto', zIndex: 10, overwrite: 'auto' });
          
          const category = detailsEl.querySelector('[data-anim="category"]');
          const title = detailsEl.querySelector('[data-anim="title"]');
          const tagline = detailsEl.querySelector('[data-anim="tagline"]');
          const decision = detailsEl.querySelector('[data-anim="decision"]');
          const tags = detailsEl.querySelectorAll('[data-anim="tag"]');
          const links = detailsEl.querySelector('[data-anim="links"]');

          // Reset opacity/pos before staggering inside
          const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });

          if (category) {
            tl.fromTo(category, {
              opacity: 0,
              y: 12,
            }, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: 'power2.out',
            }, 0.05);
          }

          if (title) {
            tl.fromTo(title, {
              opacity: 0,
              y: 15,
            }, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: 'power2.out',
            }, 0.10);
          }

          if (tagline) {
            tl.fromTo(tagline, {
              opacity: 0,
              y: 12,
            }, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: 'power2.out',
            }, 0.15);
          }

          if (decision) {
            tl.fromTo(decision, {
              opacity: 0,
              x: -10,
            }, {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: 'power2.out',
            }, 0.20);
          }

          if (tags.length > 0) {
            tl.fromTo(tags, {
              opacity: 0,
              y: 8,
            }, {
              opacity: 1,
              y: 0,
              duration: 0.25,
              stagger: 0.03,
              ease: 'power2.out',
            }, 0.25);
          }

          if (links) {
            tl.fromTo(links, {
              opacity: 0,
            }, {
              opacity: 1,
              duration: 0.3,
              ease: 'power1.out',
            }, 0.28);
          }
        } else {
          gsap.set(detailsEl, { pointerEvents: 'none', zIndex: 0 });
          gsap.to(detailsEl, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            ease: 'power2.in',
            overwrite: 'auto',
          });
        }
      }
    });
  }, { scope: stickyRef, dependencies: [activeIndex, shouldReduceMotion] });

  // Handle click on rail number to jump to exact project
  const handleRailClick = (index: number) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const windowHeight = window.innerHeight;
    const targetScroll = sectionTop + index * windowHeight;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP STICKY EDITORIAL SHOWCASE (lg:block)                              */}
      {/* ========================================================================= */}
      <section
        ref={sectionRef}
        className="hidden lg:block relative w-full bg-bg border-t border-border/50"
        style={{
          height: `${projects.length * 100}vh`,
          '--project-accent': activeProject.accentColor || 'var(--color-accent-500)',
        } as React.CSSProperties}
      >
        {/* Pinned Viewport Container */}
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-700"
        >
          {/* Subtle background glow linked to active project accent */}
          <div
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none transition-all duration-700"
            style={{ backgroundColor: activeProject.accentColor || 'var(--color-accent-500)' }}
          />

          {/* Numbered Progress Rail (Left Edge) */}
          <div className="absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-30">
            {projects.map((proj, idx) => {
              const formattedNum = (idx + 1).toString().padStart(2, '0');
              const isActive = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleRailClick(idx)}
                  className={cn(
                    'group flex items-center gap-3 text-xs font-mono font-light tracking-widest transition-all duration-300 py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded',
                    isActive
                      ? 'text-[var(--project-accent)] scale-110 translate-x-1 font-normal'
                      : 'text-border/60 hover:text-text-secondary'
                  )}
                  aria-label={`Jump to project ${formattedNum}: ${proj.title}`}
                >
                  <span>{formattedNum}</span>
                  <span
                    className={cn(
                      'h-[2px] rounded-full transition-all duration-300',
                      isActive
                        ? 'w-6 bg-[var(--project-accent)]'
                        : 'w-0 bg-border/40 group-hover:w-3 group-hover:bg-text-secondary'
                    )}
                  />
                </button>
              );
            })}
          </div>

          <Container wide>
            <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center pl-10 xl:pl-16">
              
              {/* LEFT COLUMN: DETAILS (40% Split -> col-span-5) */}
              <div className="col-span-5 relative min-h-[460px] flex flex-col justify-center">
                {/* Stacked Project Details Layers */}
                <div className="relative w-full">
                  {projects.map((proj, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <div
                        key={proj.id}
                        ref={(el) => {
                          detailsLayersRef.current[idx] = el;
                        }}
                        className={cn(
                          'absolute inset-0 flex flex-col justify-center transition-opacity duration-300',
                          isActive ? 'opacity-100 pointer-events-auto z-10 relative' : 'opacity-0 pointer-events-none z-0 absolute'
                        )}
                      >
                        {/* Header Row: Number + Category */}
                        <div
                          data-anim="category"
                          className="flex items-center gap-4 mb-4 select-none"
                        >
                          <span className="font-mono text-sm font-light text-text-muted/80 tracking-widest">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          <span className="w-4 h-[1px] bg-border" />
                          <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--project-accent)] transition-colors duration-500">
                            {proj.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          data-anim="title"
                          className="text-4xl md:text-5xl xl:text-[48px] font-sans font-bold text-[var(--project-accent)] tracking-[-0.04em] leading-[1] mb-4 transition-colors duration-500"
                        >
                          {proj.title}
                        </h3>

                        {/* Tagline (What it does) */}
                        <p
                          data-anim="tagline"
                          className="text-[20px] text-text-secondary leading-[1.6] font-normal tracking-normal mb-6 max-w-[34rem]"
                        >
                          {proj.tagline}
                        </p>

                        {/* Key Engineering Decision */}
                        {(proj.keyDecision || proj.architectureDecisions?.[0] || proj.engineeringChallenge) && (
                          <div
                            data-anim="decision"
                            className="my-4 border-l-2 pl-4 py-1.5 border-[var(--project-accent)] bg-surface/40 rounded-r-lg transition-colors duration-500 max-w-[34rem]"
                          >
                            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted block mb-1">
                              Key Engineering Decision
                            </span>
                            <p className="text-xs xl:text-sm text-text-secondary italic leading-[1.6] font-normal">
                              "{proj.keyDecision || proj.architectureDecisions?.[0] || proj.engineeringChallenge}"
                            </p>
                          </div>
                        )}

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap items-center gap-2 mt-4 mb-8">
                          {proj.stack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              data-anim="tag"
                              className="px-3 py-1 font-mono text-[13px] font-medium uppercase tracking-wide text-text-secondary bg-surface rounded-md border border-border/80 hover:border-[var(--project-accent)] hover:bg-[var(--project-accent)]/10 transition-colors duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                          {proj.stack.length > 5 && (
                            <span
                              data-anim="tag"
                              className="px-3 py-1 font-mono text-[13px] font-medium uppercase tracking-wide text-text-muted bg-surface/50 rounded-md border border-border/40"
                            >
                              +{proj.stack.length - 5}
                            </span>
                          )}
                        </div>

                        {/* Links Row */}
                        <div data-anim="links" className="flex items-center gap-6 pt-2">
                          {proj.caseStudy ? (
                            <Link
                              href={`/work/${proj.id}`}
                              className="inline-flex items-center text-[var(--project-accent)] hover:text-text-primary transition-colors font-medium hover:font-semibold group text-base"
                            >
                              Case Study
                              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                          ) : (
                            <span className="inline-flex items-center text-text-muted font-bold cursor-not-allowed text-sm">
                              Case Study Coming Soon
                            </span>
                          )}

                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-text-secondary hover:text-[var(--project-accent)] transition-colors font-medium text-sm group"
                            >
                              <ExternalLink className="w-3.5 h-3.5 mr-1.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                              Live Demo
                            </a>
                          )}

                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-text-secondary hover:text-[var(--project-accent)] transition-colors font-medium text-sm group"
                            >
                              <Github className="w-3.5 h-3.5 mr-1.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: SCREENSHOT MOCKUP (60% Split -> col-span-7) */}
              <div className="col-span-7 relative">
                <CursorHover
                  href={activeProject.caseStudy ? `/work/${activeProject.id}` : null}
                  text="Case Study"
                  external={false}
                  className="w-full block"
                >
                  <BrowserMockup animateFloat={!shouldReduceMotion}>
                    {projects.map((proj, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <div
                          key={proj.id}
                          ref={(el) => {
                            imageLayersRef.current[idx] = el;
                          }}
                          className={cn(
                            'absolute inset-0 w-full h-full transition-all duration-500',
                            isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-98 z-0'
                          )}
                        >
                          {proj.image ? (
                            <Image
                              src={proj.image}
                              alt={proj.title}
                              fill
                              className="object-contain p-2 md:p-4"
                              sizes="(max-width: 1200px) 60vw, 800px"
                              quality={90}
                              priority={idx === 0}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[var(--project-accent)]/30 font-sans tracking-[-0.03em] text-2xl font-bold bg-surface">
                              {proj.title} Screenshot
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </BrowserMockup>
                </CursorHover>
              </div>

            </div>
          </Container>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MOBILE STACKED EDITORIAL SHOWCASE (lg:hidden)                             */}
      {/* ========================================================================= */}
      <div className="lg:hidden w-full bg-bg py-16 px-4 md:px-8 space-y-20 border-t border-border/50">
        {projects.map((proj, idx) => {
          const formattedNum = (idx + 1).toString().padStart(2, '0');
          return (
            <div
              key={proj.id}
              className="flex flex-col gap-6"
              style={{ '--project-accent': proj.accentColor || 'var(--color-accent-500)' } as React.CSSProperties}
            >
              {/* Header: Number + Category */}
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="font-mono text-sm font-light text-text-muted">
                  {formattedNum}
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--project-accent)]">
                  {proj.category}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-3xl font-sans font-bold tracking-[-0.04em] leading-[1] text-text-primary mb-3 text-[var(--project-accent)]">
                  {proj.title}
                </h3>
                <p className="text-base text-text-secondary leading-[1.6] font-normal max-w-[34rem]">
                  {proj.tagline}
                </p>
              </div>

              {/* Screenshot Mockup */}
              <div className="w-full">
                <Link
                  href={proj.caseStudy ? `/work/${proj.id}` : '#'}
                  className={cn('block w-full', !proj.caseStudy && 'pointer-events-none')}
                >
                  <BrowserMockup animateFloat={false}>
                    {proj.image ? (
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 95vw, (max-width: 1200px) 70vw, 800px"
                        quality={85}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--project-accent)]/30 font-sans tracking-[-0.03em] text-lg font-bold">
                        {proj.title}
                      </div>
                    )}
                  </BrowserMockup>
                </Link>
              </div>

              {/* Key Decision */}
              {(proj.keyDecision || proj.architectureDecisions?.[0] || proj.engineeringChallenge) && (
                <div className="border-l-2 pl-4 py-1.5 border-[var(--project-accent)] bg-surface/40 rounded-r-lg max-w-[34rem]">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted block mb-1">
                    Key Engineering Decision
                  </span>
                  <p className="text-xs text-text-secondary italic leading-[1.6] font-normal">
                    "{proj.keyDecision || proj.architectureDecisions?.[0] || proj.engineeringChallenge}"
                  </p>
                </div>
              )}

              {/* Stack & Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-text-secondary bg-surface rounded-md border border-border/80 hover:border-[var(--project-accent)] hover:bg-[var(--project-accent)]/10 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.stack.length > 4 && (
                    <span className="px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-text-muted bg-surface/50 rounded-md border border-border/40">
                      +{proj.stack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {proj.caseStudy ? (
                    <Link
                      href={`/work/${proj.id}`}
                      className="inline-flex items-center text-[var(--project-accent)] font-medium hover:font-semibold text-sm group"
                    >
                      Case Study
                      <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <span className="text-text-muted font-medium text-xs cursor-not-allowed">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
