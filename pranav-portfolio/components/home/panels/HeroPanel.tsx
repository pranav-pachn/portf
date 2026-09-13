'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { ArchitecturalArtifact } from '@/components/home/ArchitecturalArtifact';

export function HeroPanel() {
  const smoothScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Editorial line-by-line reveal
  const lineVariants = {
    hidden: { y: '105%', opacity: 0 },
    visible: (i: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        delay: 0.12 + i * 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const lines = ['Building products', 'for complex', 'systems.'];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-10 lg:pt-36 lg:pb-12 bg-bg overflow-hidden"
    >
      <Container className="relative z-10 my-auto w-full">
        {/* Asymmetric Split: 45% Left (Identity) / 55% Right (Artifact & Void) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: 45% (5 cols on lg, with breathing room) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left z-20 lg:-mt-10 -ml-1">
            
            {/* Eyebrow: 01 — IDENTITY */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 lg:mb-5"
            >
              <span className="font-mono text-[10px] font-[500] text-accent-500 uppercase tracking-[0.18em]">
                01 — IDENTITY
              </span>
            </motion.div>

            {/* Headline: Manrope Display, lighter weights (600/500), tight tracking */}
            <h1 className="text-5xl sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] font-display tracking-[-0.045em] text-text-primary leading-[0.98] lg:leading-[1.0] mb-8 whitespace-nowrap">
              <span className="block overflow-hidden py-0.5">
                <motion.span custom={0} variants={lineVariants} initial="hidden" animate="visible" className="block font-semibold">
                  Building products
                </motion.span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span custom={1} variants={lineVariants} initial="hidden" animate="visible" className="block font-semibold">
                  for complex
                </motion.span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span custom={2} variants={lineVariants} initial="hidden" animate="visible" className="block font-medium">
                  systems.
                </motion.span>
              </span>
            </h1>

            {/* Subtitle: Geist Sans, lighter (400), narrower */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] text-text-muted max-w-[28ch] font-normal leading-[1.55] mb-10"
            >
              Full-stack & AI product engineer building software from idea to deployment.
            </motion.p>

            {/* Quiet Editorial CTA: View selected work ↗ with growing line */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="#work"
                onClick={smoothScrollToWork}
                className="group inline-flex flex-col text-[15px] font-medium text-text-primary transition-colors hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <span>View selected work</span>
                  <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5 text-text-muted group-hover:text-white">
                    ↗
                  </span>
                </span>
                {/* Thin Underline that scales on hover */}
                <span className="h-[1px] w-full bg-border mt-1.5 transition-colors duration-300 group-hover:bg-text-primary relative overflow-hidden">
                  <span className="absolute inset-0 bg-text-primary origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </span>
              </Link>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: 55% (6-7 cols on lg) - Void & Monolith */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end w-full relative"
          >
            {/* Object occupies ~105-120% of right column bleeding off the viewport on large screens */}
            <div className="w-full lg:w-[105%] xl:w-[115%] 2xl:w-[125%] -mr-4 lg:-mr-12 xl:-mr-20 z-10">
              <ArchitecturalArtifact />
            </div>
          </motion.div>

        </div>
      </Container>

      {/* Hero Footer Meta: Scroll Indicator (settles once) + Location/Year */}
      <Container className="relative z-10 w-full pt-8 lg:pt-0">
        <div className="flex items-center justify-between border-t border-white/[0.04] pt-5 font-mono text-[11px] text-text-muted">
          {/* Scroll Indicator: drops 6px once on load and stays still */}
          <motion.div
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 tracking-wider"
          >
            <span className="text-text-secondary text-xs">↓</span>
            <span className="tracking-[0.14em]">SCROLL TO EXPLORE</span>
          </motion.div>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="hidden sm:flex items-center gap-6 tracking-wider"
          >
            <span className="text-text-muted">INDIA</span>
            <span className="text-border">/</span>
            <span className="text-text-secondary">2026 →</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
