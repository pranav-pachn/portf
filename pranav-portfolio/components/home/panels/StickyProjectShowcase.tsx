'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FeaturedProject } from '@/types/project';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface StickyProjectShowcaseProps {
  projects: FeaturedProject[];
}

export function StickyProjectShowcase({ projects }: StickyProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef     = useRef<HTMLSpanElement>(null);
  const digitStripRef  = useRef<HTMLDivElement>(null);
  const lastIndexRef   = useRef<number>(0);

  // Circle Cursor Refs
  const screenshotBoxRef = useRef<HTMLDivElement>(null);
  const circleCursorRef  = useRef<HTMLDivElement>(null);
  const xToRef           = useRef<((val: number) => void) | null>(null);
  const yToRef           = useRef<((val: number) => void) | null>(null);

  // Structural Refs
  const sectionRef        = useRef<HTMLDivElement>(null);
  const stickyRef         = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const detailsLayersRef  = useRef<(HTMLDivElement | null)[]>([]);
  const imageLayersRef    = useRef<(HTMLDivElement | null)[]>([]);

  const shouldReduceMotion = useReducedMotion();
  const total = projects.length;

  // Initialize quickTo for 60fps cursor follower without re-renders
  useEffect(() => {
    if (!circleCursorRef.current) return;
    gsap.set(circleCursorRef.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
    xToRef.current = gsap.quickTo(circleCursorRef.current, 'x', { duration: 0.22, ease: 'power2.out' });
    yToRef.current = gsap.quickTo(circleCursorRef.current, 'y', { duration: 0.22, ease: 'power2.out' });
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !circleCursorRef.current || !screenshotBoxRef.current) return;
    const rect = screenshotBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.set(circleCursorRef.current, { x, y });
    gsap.to(circleCursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.28,
      ease: 'back.out(1.8)',
      overwrite: 'auto',
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !screenshotBoxRef.current || !xToRef.current || !yToRef.current) return;
    const rect = screenshotBoxRef.current.getBoundingClientRect();
    xToRef.current(e.clientX - rect.left);
    yToRef.current(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (!circleCursorRef.current) return;
    gsap.to(circleCursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: 'auto',
    });
  };

  const handleMouseDown = () => {
    if (!circleCursorRef.current) return;
    gsap.to(circleCursorRef.current, {
      scale: 0.88,
      duration: 0.12,
      overwrite: 'auto',
    });
  };

  const handleMouseUp = () => {
    if (!circleCursorRef.current) return;
    gsap.to(circleCursorRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'back.out(2)',
      overwrite: 'auto',
    });
  };

  const handleScreenshotClick = () => {
    const cur = projects[lastIndexRef.current] || projects[activeIndex];
    if (!cur) return;
    if (cur.liveUrl) {
      window.open(cur.liveUrl, '_blank', 'noopener,noreferrer');
    } else if (cur.caseStudy) {
      window.location.href = `/work/${cur.id}`;
    } else if (cur.githubUrl) {
      window.open(cur.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  useGSAP(() => {
    if (!sectionRef.current || !stickyRef.current) return;

    const details = detailsLayersRef.current;
    const images  = imageLayersRef.current;

    // Dynamically size the details container to the actual maximum content height
    // so vertical alignment with the project mockup is exact with zero artificial padding
    const updateContainerHeight = () => {
      const maxH = Math.max(...details.map((d) => d?.offsetHeight || 0));
      if (maxH > 0 && contentWrapperRef.current) {
        contentWrapperRef.current.style.height = `${maxH}px`;
      }
    };
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);

    // ── Reduced Motion Adjustments ───────────────────────────────────────────
    const yShift   = shouldReduceMotion ? 0 : 18;
    const scaleOut = shouldReduceMotion ? 1 : 1.008;
    const scaleIn  = shouldReduceMotion ? 1 : 0.995;

    // ── 1. Initial states ─────────────────────────────────────────────────────
    if (digitStripRef.current) {
      gsap.set(digitStripRef.current, { yPercent: 0 });
    }
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
        zIndex:        i === 0 ? 10 : 0,
        pointerEvents: i === 0 ? 'auto' : 'none',
      });
    });
    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' });
    }

    // ── 2. Scrubbed content timeline and Pinned Stage ─────────────────────────
    // Generous reading interval (DWELL = 8.5 units), short transition (TRANS = 1.5 units)
    // 85% dwell, 15% transition per project
    const DWELL       = 8.5;
    const TRANS       = 1.5;
    const SEGMENT     = DWELL + TRANS; // 10 units per project
    const FINAL_DWELL = 14;
    const TOTAL_UNITS = (total - 1) * SEGMENT + FINAL_DWELL; // e.g. 4 * 10 + 14 = 54 units

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:       sectionRef.current,
        start:         'top top',
        end:           'bottom bottom',
        scrub:         true,
        pin:           stickyRef.current,
        pinSpacing:    false,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: self.progress });
          }

          // Discrete active index calculated at crossfade midpoint
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
            setActiveIndex(nextIdx);
          }
        },
      },
    });

    // ── Transition timing constants ───────────────────────────────────────────
    const TEXT_OUT        = TRANS * 0.45;
    const TEXT_IN         = TRANS * 0.55;
    const TEXT_IN_OFFSET  = TRANS * 0.45;

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

      // Current project text OUT: moves up slightly and fades
      if (curD) {
        tl.to(curD, {
          opacity: 0, y: -yShift, duration: TEXT_OUT, ease: 'none',
          onStart: () => {
            gsap.set(curD, { pointerEvents: 'none', zIndex: 5 });
          },
          onReverseComplete: () => {
            gsap.set(curD, { pointerEvents: 'auto', zIndex: 10 });
          },
        }, crossfadeAt);
      }

      // Rolling digit transition from index i to index i + 1 (synchronized with text)
      if (digitStripRef.current) {
        tl.to(
          digitStripRef.current,
          {
            yPercent: -((i + 1) * (100 / total)),
            duration: TRANS,
            ease: shouldReduceMotion ? 'none' : 'power2.inOut',
          },
          crossfadeAt
        );
      }

      // Current screenshot OUT: subtle crossfade
      if (curI) {
        tl.to(curI, {
          opacity: 0, scale: scaleOut, duration: IMAGE_OUT, ease: 'none',
          onStart: () => {
            gsap.set(curI, { pointerEvents: 'none', zIndex: 5 });
          },
          onReverseComplete: () => {
            gsap.set(curI, { pointerEvents: 'auto', zIndex: 10 });
          },
        }, crossfadeAt);
      }

      // Next project text IN: rises gently into place
      if (nxtD) {
        tl.fromTo(nxtD,
          { opacity: 0, y: yShift, zIndex: 15 },
          {
            opacity: 1, y: 0, duration: TEXT_IN, ease: 'none',
            onStart: () => {
              gsap.set(nxtD, { zIndex: 15, pointerEvents: 'none' });
            },
            onComplete: () => {
              gsap.set(nxtD, { zIndex: 10, pointerEvents: 'auto' });
            },
            onReverseComplete: () => {
              gsap.set(nxtD, { zIndex: 0, pointerEvents: 'none' });
            },
          },
          textInStart,
        );
      }

      // Next screenshot IN: subtle crossfade settle
      if (nxtI) {
        tl.fromTo(nxtI,
          { opacity: 0, scale: scaleIn, zIndex: 15 },
          {
            opacity: 1, scale: 1, duration: IMAGE_IN, ease: 'none',
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
    <section id="work" className="relative w-full bg-[var(--surface-bg)] scroll-mt-20">
      {/* ======================================================================== */}
      {/* DESKTOP: Scroll-runway + Pinned Stage (lg:block)                         */}
      {/* ======================================================================== */}
      <div
        ref={sectionRef}
        className="hidden lg:block relative w-full border-t border-[var(--surface-border)]"
        style={{
          height: `${Math.round((((total - 1) * 10 + 14) / 10) * 100)}vh`,
        }}
      >
        {/* ── Pinned Stage ── GSAP pins this container against the scroll runway */}
        <div
          ref={stickyRef}
          className="h-screen w-full flex flex-col justify-between overflow-hidden relative py-6 xl:py-8"
        >
          {/* Subtle Ambient Lighting Glow */}
          <div
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[150px] pointer-events-none bg-accent-500"
          />

          {/* ── TOP LEDGER BAR ──────────────────────────────────────────────── */}
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between gap-6 select-none shrink-0 z-20">
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium text-text-secondary shrink-0">
              SELECTED WORK
            </span>
            <div className="flex-1 h-[1px] bg-[var(--surface-border)]" />
            <span className="font-mono text-xs text-text-secondary tracking-wider shrink-0">
              2026
            </span>
          </div>

          {/* ── CENTER STAGE: 2-Column Split ─────────────────────────────────── */}
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 flex-1 flex items-center my-auto z-10">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full">

              {/* ── LEFT COLUMN: Oversized 01 + Title + Tagline + Link ─────────── */}
              <div className="col-span-12 lg:col-span-5 relative flex flex-col justify-center">

                {/* ── OVERSIZED NUMBER: Fixed '0', Rolling Right Digit ────────── */}
                <div className="select-none leading-[0.82] mb-3 lg:mb-3.5 flex items-baseline">
                  {/* Fixed 0 */}
                  <span className="font-editorial font-normal text-[84px] sm:text-[96px] md:text-[110px] lg:text-[120px] xl:text-[132px] text-text-muted/45 tracking-[-0.05em] tabular-nums shrink-0">
                    0
                  </span>

                  {/* Masked Changing Right Digit */}
                  <div className="relative overflow-hidden h-[0.82em] inline-flex items-baseline font-editorial font-normal text-[84px] sm:text-[96px] md:text-[110px] lg:text-[120px] xl:text-[132px] text-text-muted/45 tracking-[-0.05em]">
                    <div
                      ref={digitStripRef}
                      className="flex flex-col will-change-transform"
                      style={{ transform: 'translateY(0%)' }}
                    >
                      {projects.map((_, i) => (
                        <span
                          key={i}
                          className="tabular-nums block h-[0.82em] leading-[0.82em] text-center"
                        >
                          {i + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── STACKED PROJECT DETAILS: Category + Title + Tagline + Link ── */}
                <div ref={contentWrapperRef} className="relative w-full transition-[height] duration-200">
                  {projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      ref={(el) => { detailsLayersRef.current[idx] = el; }}
                      className="absolute top-0 left-0 w-full flex flex-col justify-start"
                    >
                      {/* Category with Electric-Blue Accent Dash */}
                      <div className="flex items-center gap-2 mb-2 select-none">
                        <span className="font-mono text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                          {proj.category}
                        </span>
                        <span className="w-4 h-[1.5px] bg-accent-500 inline-block rounded-full" />
                      </div>

                      {/* Title: Editorial Typography */}
                      <h3 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] font-editorial font-medium text-text-primary tracking-[-0.025em] leading-[1.12] mb-2.5">
                        {proj.title}
                      </h3>

                      {/* Description / Tagline */}
                      <p className="text-[15px] sm:text-[16px] text-text-secondary leading-[1.58] font-normal tracking-normal mb-5 max-w-[29rem]">
                        {proj.tagline}
                      </p>

                      {/* Action Link: Explore project → */}
                      <div className="flex items-center">
                        {proj.caseStudy ? (
                          <Link
                            href={`/work/${proj.id}`}
                            className="group inline-flex items-center gap-2 font-editorial text-[14px] sm:text-[14.5px] font-medium text-text-primary transition-colors hover:text-accent-500 pb-0.5 border-b border-text-primary/30 hover:border-accent-500"
                          >
                            <span>Explore project</span>
                            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 text-accent-500 font-normal">
                              →
                            </span>
                          </Link>
                        ) : proj.liveUrl ? (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 font-editorial text-[14px] sm:text-[14.5px] font-medium text-text-primary transition-colors hover:text-accent-500 pb-0.5 border-b border-text-primary/30 hover:border-accent-500"
                          >
                            <span>Explore project</span>
                            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 text-accent-500 font-normal">
                              →
                            </span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center text-text-muted font-medium text-sm pb-0.5 border-b border-transparent">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT COLUMN: Anchored Art-Directed Screenshot Preview ───────── */}
              <div className="col-span-12 lg:col-span-7 relative flex items-center justify-center">
                <div className="w-full relative">
                  <div
                    ref={screenshotBoxRef}
                    onClick={handleScreenshotClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    className="w-full rounded-xl bg-[#121213] border border-black/[0.08] dark:border-white/[0.08] shadow-[0_10px_30px_-6px_rgba(20,20,18,0.08),0_2px_6px_rgba(20,20,18,0.03)] overflow-hidden cursor-none select-none relative group"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleScreenshotClick();
                      }
                    }}
                    aria-label={`View ${projects[activeIndex]?.title || 'project'}`}
                  >
                    {/* Compact Dark Window Top Bar with 3 Window Control Dots */}
                    <div className="h-7 px-3.5 flex items-center gap-1.5 bg-[#121213] border-b border-white/[0.06] select-none pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                    </div>

                    {/* Screenshot Frame Container (10-15% larger preview with minimal border padding) */}
                    <div className="relative w-full aspect-[16/10] bg-[#121213] overflow-hidden pointer-events-none">
                      {projects.map((proj, idx) => (
                        <div
                          key={proj.id}
                          ref={(el) => { imageLayersRef.current[idx] = el; }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <div className="relative w-full h-full">
                            {proj.image ? (
                              <Image
                                src={proj.image}
                                alt={proj.title}
                                fill
                                className="object-contain p-0.5 md:p-1"
                                sizes="(max-width: 1200px) 60vw, 850px"
                                quality={95}
                                priority={idx === 0}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/40 font-mono text-sm">
                                {proj.title}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ── Interactive View Live Circle Cursor Follower ────────── */}
                    <div
                      ref={circleCursorRef}
                      className="pointer-events-none absolute left-0 top-0 z-30 flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full bg-accent-500 text-white shadow-[0_14px_36px_rgba(20,50,160,0.55)] border border-white/30 select-none will-change-transform"
                      style={{ opacity: 0, transform: 'scale(0)' }}
                    >
                      <span className="font-mono text-[9px] font-bold tracking-[0.14em] uppercase text-white leading-tight text-center px-2">
                        {projects[activeIndex]?.liveUrl ? 'VIEW LIVE' : projects[activeIndex]?.caseStudy ? 'CASE STUDY' : 'VIEW CODE'}
                      </span>
                      <svg
                        className="w-3.5 h-3.5 text-white/90 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.4}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
                      </svg>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── BOTTOM LEDGER BAR: Single Continuous Progress Track ─────────── */}
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between gap-5 select-none shrink-0 z-20">
            {/* Scroll Indicator */}
            <div className="flex items-center gap-2 font-mono text-[10.5px] text-text-muted tracking-[0.14em] uppercase shrink-0">
              <span className="text-text-secondary text-xs">↓</span>
              <span>SCROLL TO EXPLORE</span>
            </div>

            {/* Single Continuous Thin Progress Track with Blue Progress Segment */}
            <div className="flex-1 h-[1.5px] bg-[var(--surface-border)] relative overflow-hidden rounded-full mx-2 sm:mx-4">
              <div
                ref={progressBarRef}
                className="absolute inset-y-0 left-0 w-full bg-accent-500 origin-left"
              />
            </div>

            {/* Step Counter at Far Right */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-text-secondary tracking-wider shrink-0">
              <span ref={counterRef} className="tabular-nums font-medium text-text-primary">
                01
              </span>
              <span className="text-border">—</span>
              <span>{total.toString().padStart(2, '0')}</span>
              <span className="text-text-muted ml-0.5">→</span>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================================== */}
      {/* MOBILE: Stacked Editorial Project Cards (lg:hidden)                      */}
      {/* ======================================================================== */}
      <div className="lg:hidden w-full bg-[var(--surface-bg)] py-16 px-6 sm:px-8 space-y-16 border-t border-[var(--surface-border)]">
        {/* Mobile Header Rule */}
        <div className="flex items-center justify-between gap-4 select-none pb-4 border-b border-[var(--surface-border)]">
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium text-text-secondary">
            SELECTED WORK
          </span>
          <span className="font-mono text-xs text-text-secondary tracking-wider">
            2026
          </span>
        </div>

        {projects.map((proj, idx) => {
          const formattedNum = (idx + 1).toString().padStart(2, '0');
          return (
            <div
              key={proj.id}
              className="flex flex-col gap-4 pt-2"
            >
              {/* Oversized Number */}
              <div className="select-none leading-[0.82]">
                <span className="font-editorial font-normal text-[60px] sm:text-[72px] text-text-muted/45 tracking-[-0.05em] block tabular-nums">
                  {formattedNum}
                </span>
              </div>

              {/* Category with Electric-Blue Accent Dash */}
              <div className="flex items-center gap-2 select-none -mt-1">
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                  {proj.category}
                </span>
                <span className="w-4 h-[1.5px] bg-accent-500 inline-block rounded-full" />
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-editorial font-medium tracking-[-0.025em] leading-[1.12] text-text-primary mb-2">
                  {proj.title}
                </h3>
                <p className="text-[15px] text-text-secondary leading-[1.58] font-normal max-w-[34rem]">
                  {proj.tagline}
                </p>
              </div>

              {/* Screenshot in Restrained Dark Frame */}
              <div className="w-full">
                <div className="w-full rounded-xl bg-[#121213] border border-black/[0.08] dark:border-white/[0.08] shadow-[0_10px_24px_-8px_rgba(20,20,18,0.1)] overflow-hidden">
                  <div className="h-7 px-3 flex items-center gap-1.5 bg-[#121213] border-b border-white/[0.06] select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                  <div className="relative w-full aspect-[16/10] bg-[#121213] overflow-hidden">
                    {proj.caseStudy ? (
                      <Link
                        href={`/work/${proj.id}`}
                        className="relative block w-full h-full"
                        aria-label={`View ${proj.title} case study`}
                      >
                        {proj.image && (
                          <Image
                            src={proj.image}
                            alt={proj.title}
                            fill
                            className="object-contain p-0.5"
                            sizes="(max-width: 768px) 95vw, 600px"
                            quality={90}
                          />
                        )}
                      </Link>
                    ) : (
                      proj.image && (
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className="object-contain p-0.5"
                          sizes="(max-width: 768px) 95vw, 600px"
                          quality={90}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-1">
                {proj.caseStudy ? (
                  <Link
                    href={`/work/${proj.id}`}
                    className="group inline-flex items-center gap-2 font-editorial text-[14px] font-medium text-text-primary hover:text-accent-500 pb-0.5 border-b border-text-primary/30 hover:border-accent-500"
                  >
                    <span>Explore project</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-accent-500">
                      →
                    </span>
                  </Link>
                ) : proj.liveUrl ? (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-editorial text-[14px] font-medium text-text-primary hover:text-accent-500 pb-0.5 border-b border-text-primary/30 hover:border-accent-500"
                  >
                    <span>Explore project</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-accent-500">
                      →
                    </span>
                  </a>
                ) : (
                  <span className="text-text-muted font-medium text-xs">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
