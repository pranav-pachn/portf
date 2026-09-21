'use client';

import React, { useRef } from 'react';
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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef     = useRef<HTMLSpanElement>(null);
  const glowRef        = useRef<HTMLDivElement>(null);
  const lastIndexRef   = useRef<number>(0);

  // Structural Refs
  const sectionRef        = useRef<HTMLElement>(null);
  const stickyRef         = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const detailsLayersRef  = useRef<(HTMLDivElement | null)[]>([]);
  const imageLayersRef    = useRef<(HTMLDivElement | null)[]>([]);

  const shouldReduceMotion = useReducedMotion();
  const total = projects.length;

  useGSAP(() => {
    if (!sectionRef.current || !stickyRef.current) return;

    const details = detailsLayersRef.current;
    const images  = imageLayersRef.current;

    // Dynamically size the details container to the actual maximum content height
    // so visual center alignment with the browser mockup is exact with zero artificial padding
    const updateContainerHeight = () => {
      const maxH = Math.max(...details.map((d) => d?.offsetHeight || 0));
      if (maxH > 0 && contentWrapperRef.current) {
        contentWrapperRef.current.style.height = `${maxH}px`;
      }
    };
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);

    // ── Reduced Motion Adjustments ───────────────────────────────────────────
    const yShift   = shouldReduceMotion ? 0 : 28;
    const xShift   = shouldReduceMotion ? 0 : 4;
    const scaleOut = shouldReduceMotion ? 1 : 1.012;
    const scaleIn  = shouldReduceMotion ? 1 : 0.988;

    // ── 1. Initial states ─────────────────────────────────────────────────────
    // GSAP owns opacity/y/scale/x. No CSS transitions on these properties.
    details.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity:       i === 0 ? 1 : 0,
        y:             i === 0 ? 0 : yShift,
        pointerEvents: i === 0 ? 'auto' : 'none',
        zIndex:        i === 0 ? 10 : 0,
      });
    });
    images.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity:       i === 0 ? 1 : 0,
        scale:         i === 0 ? 1 : scaleIn,
        x:             i === 0 ? 0 : xShift,
        zIndex:        i === 0 ? 10 : 0,
        pointerEvents: i === 0 ? 'auto' : 'none',
      });
    });
    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' });
    }

    // ── 2. Scrubbed content timeline and Pinned Stage ─────────────────────────
    // 70% dwell, 30% transition per project.
    // DWELL = 7 units, TRANS = 3 units, SEGMENT = 10 units.
    // Final project receives a generous 13-unit dwell before releasing the pinned stage.
    const DWELL       = 7;
    const TRANS       = 3;
    const SEGMENT     = DWELL + TRANS; // 10 units per project
    const FINAL_DWELL = 13;
    const TOTAL_UNITS = (total - 1) * SEGMENT + FINAL_DWELL; // e.g. 4 * 10 + 13 = 53 units

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:  sectionRef.current,
        start:    'top top',
        end:      'bottom bottom',
        scrub:    true,
        pin:      stickyRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: self.progress });
          }

          // Transitions switch discrete active index right at the crossfade midpoint (unit i * 10 + 9.25)
          const currentUnit = self.progress * TOTAL_UNITS;
          const nextIdx = Math.min(
            total - 1,
            Math.max(0, Math.floor((currentUnit + 0.75) / SEGMENT))
          );

          if (counterRef.current && (nextIdx + 1).toString().padStart(2, '0') !== counterRef.current.textContent) {
            counterRef.current.textContent = (nextIdx + 1).toString().padStart(2, '0');
          }

          if (nextIdx !== lastIndexRef.current) {
            lastIndexRef.current = nextIdx;
            const activeColor = projects[nextIdx]?.accentColor || 'var(--color-accent-500)';
            if (sectionRef.current) {
              sectionRef.current.style.setProperty('--project-accent', activeColor);
            }
            if (glowRef.current) {
              glowRef.current.style.backgroundColor = activeColor;
            }
          }
        },
      },
    });

    // ── Transition timing constants ───────────────────────────────────────────
    // TEXT: outgoing must finish before incoming starts — no simultaneous readable state.
    //   Outgoing text:  crossfadeAt → crossfadeAt + 1.35  (TRANS * 0.45)
    //   Incoming text:  crossfadeAt + 1.35 → crossfadeAt + 3.00  (offset 0.45, dur 0.55)
    //   Gap/overlap:    0 units — clean sequential handoff.
    const TEXT_OUT        = TRANS * 0.45;
    const TEXT_IN         = TRANS * 0.55;
    const TEXT_IN_OFFSET  = TRANS * 0.45;

    // IMAGE: small controlled overlap — incoming starts when outgoing is mostly gone.
    //   Outgoing image: crossfadeAt → crossfadeAt + 1.50  (TRANS * 0.50)
    //   Incoming image: crossfadeAt + 1.20 → crossfadeAt + 3.00  (offset 0.40, dur 0.60)
    //   Overlap window: 1.20 → 1.50 = 0.30 units only (~10% of transition)
    const IMAGE_OUT        = TRANS * 0.50;
    const IMAGE_IN         = TRANS * 0.60;
    const IMAGE_IN_OFFSET  = TRANS * 0.40;

    // Build transition segments
    for (let i = 0; i < total - 1; i++) {
      const crossfadeAt  = i * SEGMENT + DWELL;

      const curD = details[i];
      const curI = images[i];
      const nxtD = details[i + 1];
      const nxtI = images[i + 1];

      const imageInStart = crossfadeAt + IMAGE_IN_OFFSET;
      const textInStart  = crossfadeAt + TEXT_IN_OFFSET;

      // ── Current project OUT ────────────────────────────────────────────────
      if (curD) {
        tl.to(curD, {
          opacity: 0, y: -yShift, duration: TEXT_OUT, ease: 'none',
          onStart: () => {
            // Drop outgoing below incoming immediately so it can never render on top
            gsap.set(curD, { pointerEvents: 'none', zIndex: 5 });
          },
          onReverseComplete: () => {
            gsap.set(curD, { pointerEvents: 'auto', zIndex: 10 });
          },
        }, crossfadeAt);
      }

      if (curI) {
        tl.to(curI, {
          opacity: 0, scale: scaleOut, x: -xShift, duration: IMAGE_OUT, ease: 'none',
          onStart: () => {
            gsap.set(curI, { pointerEvents: 'none', zIndex: 5 });
          },
          onReverseComplete: () => {
            gsap.set(curI, { pointerEvents: 'auto', zIndex: 10 });
          },
        }, crossfadeAt);
      }

      // ── Next project IN ────────────────────────────────────────────────────
      if (nxtD) {
        tl.fromTo(nxtD,
          { opacity: 0, y: yShift, zIndex: 15 },
          {
            opacity: 1, y: 0, duration: TEXT_IN, ease: 'none',
            onStart: () => {
              gsap.set(nxtD, { zIndex: 15, pointerEvents: 'none' });
            },
            onComplete: () => {
              // Settle to normal active z-index once fully in
              gsap.set(nxtD, { zIndex: 10, pointerEvents: 'auto' });
            },
            onReverseComplete: () => {
              gsap.set(nxtD, { zIndex: 0, pointerEvents: 'none' });
            },
          },
          textInStart,
        );
      }

      if (nxtI) {
        tl.fromTo(nxtI,
          { opacity: 0, scale: scaleIn, x: xShift, zIndex: 15 },
          {
            opacity: 1, scale: 1, x: 0, duration: IMAGE_IN, ease: 'none',
            onStart: () => {
              gsap.set(nxtI, { zIndex: 15, pointerEvents: 'none' });
            },
            onComplete: () => {
              gsap.set(nxtI, { zIndex: 10, pointerEvents: 'auto' });
            },
            onReverseComplete: () => {
              gsap.set(nxtI, { zIndex: 0, pointerEvents: 'none' });
            },
          },
          imageInStart,
        );
      }
    }

    // Extended dwell for the final project before release into Architecture
    tl.to({}, { duration: FINAL_DWELL }, (total - 1) * SEGMENT);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
      tl.kill();
    };
  }, { scope: sectionRef, dependencies: [total, shouldReduceMotion] });

  return (
    <>
      {/* ======================================================================== */}
      {/* DESKTOP: Scroll-runway + Pinned Stage (lg:block)                         */}
      {/* ======================================================================== */}
      <section
        ref={sectionRef}
        className="hidden lg:block relative w-full bg-bg border-t border-border/50"
        style={{
          // The explicit height IS the scroll runway. GSAP reads this for pinSpacing.
          // 53 units total = 530vh runway, providing generous dwell for the final project.
          height: `${Math.round((((total - 1) * 10 + 13) / 10) * 100)}vh`,
          '--project-accent': projects[0]?.accentColor || 'var(--color-accent-500)',
        } as React.CSSProperties}
      >
        {/* ── Pinned Stage ── GSAP pins this div against the scroll runway above */}
        <div
          ref={stickyRef}
          className="h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* Atmospheric background glow — very low opacity (0.05) subtle ambient lighting */}
          <div
            ref={glowRef}
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[140px] pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: projects[0]?.accentColor || 'var(--color-accent-500)' }}
          />

          <Container wide>
            <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center pl-4 lg:pl-8">

              {/* ── LEFT: Project Details ─────────────────────────────────────── */}
              <div className="col-span-5 relative flex flex-col justify-center">

                {/* Progress indicator — direct DOM counter + GSAP scaleX bar */}
                <div className="w-3/4 max-w-[260px] z-20 pointer-events-none mb-5 select-none">
                  <div className="flex items-center font-mono text-xs text-text-muted/70 tracking-wider mb-2">
                    <span className="relative inline-block overflow-hidden h-[1.25em] w-[1.7em]">
                      <span ref={counterRef} className="block tabular-nums">01</span>
                    </span>
                    <span className="mx-1 text-text-muted/40">/</span>
                    <span>{total.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="h-[1.5px] w-full bg-border/40 relative overflow-hidden rounded-full">
                    <div
                      ref={progressBarRef}
                      className="absolute inset-y-0 left-0 w-full bg-[var(--project-accent)] transition-colors duration-700"
                    />
                  </div>
                </div>

                {/* Stacked project detail layers — sized dynamically to natural content height */}
                <div ref={contentWrapperRef} className="relative w-full transition-[height] duration-200">
                  {projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      ref={(el) => { detailsLayersRef.current[idx] = el; }}
                      className="absolute top-0 left-0 w-full flex flex-col justify-start"
                    >
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-2.5 select-none">
                        <span
                          className="font-mono text-[11px] xl:text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-500"
                          style={{ color: 'var(--project-accent)', opacity: 0.75 }}
                        >
                          {proj.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl xl:text-4xl font-display font-semibold text-[var(--project-accent)] tracking-[-0.035em] leading-[1.1] mb-2.5 transition-colors duration-500">
                        {proj.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-[17px] xl:text-[18.5px] text-text-secondary leading-[1.5] font-normal tracking-normal mb-4 max-w-[33rem]">
                        {proj.tagline}
                      </p>

                      {/* Key Engineering Decision */}
                      {(proj.keyDecision || proj.architectureDecisions?.[0] || proj.engineeringChallenge) && (
                        <div className="border-l-2 pl-3.5 py-1.5 border-[var(--project-accent)] bg-surface/30 rounded-r-md transition-colors duration-500 max-w-[33rem] mb-4">
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted/80 block mb-1">
                            Key Engineering Decision
                          </span>
                          <p className="text-xs xl:text-[13px] text-text-secondary/90 leading-[1.5] font-normal">
                            &ldquo;{proj.keyDecision || proj.architectureDecisions?.[0] || proj.engineeringChallenge}&rdquo;
                          </p>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-5">
                        {proj.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 font-mono text-[11px] xl:text-xs font-medium uppercase tracking-wide text-text-secondary bg-surface rounded-md border border-border/80 hover:border-[var(--project-accent)] hover:bg-[var(--project-accent)]/10 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.stack.length > 5 && (
                          <span className="px-2.5 py-1 font-mono text-[11px] xl:text-xs font-medium uppercase tracking-wide text-text-muted bg-surface/50 rounded-md border border-border/40">
                            +{proj.stack.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-6">
                        {proj.caseStudy ? (
                          <Link
                            href={`/work/${proj.id}`}
                            className="inline-flex items-center text-[var(--project-accent)] hover:text-text-primary transition-colors font-medium hover:font-semibold group text-sm xl:text-[15px]"
                          >
                            Case Study
                            <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ) : (
                          <span className="inline-flex items-center text-text-muted font-medium cursor-not-allowed text-xs xl:text-sm">
                            Case Study Coming Soon
                          </span>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-text-secondary hover:text-[var(--project-accent)] transition-colors font-medium text-xs xl:text-sm group"
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
                            className="inline-flex items-center text-text-secondary hover:text-[var(--project-accent)] transition-colors font-medium text-xs xl:text-sm group"
                          >
                            <Github className="w-3.5 h-3.5 mr-1.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Screenshot ─────────────────────────────────────────── */}
              <div className="col-span-7 relative flex items-center justify-center">
                <CursorHover
                  href={null}
                  text="Case Study"
                  external={false}
                  className="w-full block"
                >
                  <BrowserMockup animateFloat={false} enableTilt={false}>
                    {projects.map((proj, idx) => {
                      const imageElement = proj.image ? (
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
                      );

                      return (
                        <div
                          key={proj.id}
                          ref={(el) => { imageLayersRef.current[idx] = el; }}
                          className="absolute inset-0 w-full h-full"
                        >
                          {proj.caseStudy ? (
                            <Link
                              href={`/work/${proj.id}`}
                              className="relative block w-full h-full cursor-pointer"
                              aria-label={`View ${proj.title} case study`}
                            >
                              {imageElement}
                            </Link>
                          ) : (
                            imageElement
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

      {/* ======================================================================== */}
      {/* MOBILE: Stacked project cards (lg:hidden)                                */}
      {/* ======================================================================== */}
      <div className="lg:hidden w-full bg-bg py-16 px-4 md:px-8 space-y-20 border-t border-border/50">
        {projects.map((proj, idx) => {
          const formattedNum = (idx + 1).toString().padStart(2, '0');
          return (
            <div
              key={proj.id}
              className="flex flex-col gap-6"
              style={{ '--project-accent': proj.accentColor || 'var(--color-accent-500)' } as React.CSSProperties}
            >
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                <span className="font-mono text-xs font-light text-text-muted/60 tracking-wider">{formattedNum}</span>
                <span className="text-border/50 font-mono text-xs select-none">/</span>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--project-accent)]">{proj.category}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-3xl font-display font-semibold tracking-[-0.04em] leading-[1] text-[var(--project-accent)] mb-3">{proj.title}</h3>
                <p className="text-base text-text-secondary leading-[1.6] font-normal max-w-[34rem]">{proj.tagline}</p>
              </div>

              {/* Screenshot */}
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
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted block mb-1">Key Engineering Decision</span>
                  <p className="text-xs text-text-secondary italic leading-[1.6] font-normal">
                    &ldquo;{proj.keyDecision || proj.architectureDecisions?.[0] || proj.engineeringChallenge}&rdquo;
                  </p>
                </div>
              )}

              {/* Stack & Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-text-secondary bg-surface rounded-md border border-border/80">
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
                    <Link href={`/work/${proj.id}`} className="inline-flex items-center text-[var(--project-accent)] font-medium text-sm group">
                      Case Study <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <span className="text-text-muted font-medium text-xs cursor-not-allowed">Coming Soon</span>
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
