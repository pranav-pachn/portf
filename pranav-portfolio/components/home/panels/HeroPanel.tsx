'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeroArtwork } from '@/components/home/HeroArtwork';

export function HeroPanel() {
  const smoothScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-transparent overflow-hidden"
    >
      {/* Primary Split Viewport: 44% text / 56% artwork aligned around shared visual center */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-6 xl:gap-12">
          
          {/* LEFT COLUMN: 44% Text Column */}
          <div className="w-full lg:w-[44%] flex flex-col items-start text-left z-20">
            
            {/* Eyebrow: Cobalt Blue Accent */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3.5 lg:mb-4"
            >
              <span className="font-mono text-[11px] sm:text-[11.5px] font-semibold text-accent-500 uppercase tracking-[0.16em]">
                FULL-STACK • AI • PRODUCT
              </span>
            </motion.div>

            {/* Headline: Refined Hierarchy & Balanced 3-Line Cadence */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[3.15rem] xl:text-[3.6rem] font-editorial tracking-[-0.025em] text-text-primary leading-[1.06] mb-4 lg:mb-5"
            >
              {/* Line 1: Connected Thought with Tightened Baseline & Spacing */}
              <span className="block">
                <span className="inline-flex items-baseline gap-2.5 sm:gap-3">
                  <span className="font-serif-italic font-normal text-[1.06em] tracking-[-0.01em]">
                    I build
                  </span>
                  <span className="font-editorial font-medium tracking-[-0.025em]">
                    digital
                  </span>
                </span>
              </span>

              {/* Line 2: Sustaining Sans Rhythm */}
              <span className="block font-editorial font-medium tracking-[-0.025em] mt-0.5">
                products with
              </span>

              {/* Line 3: Sculptural Destination Word */}
              <span className="block font-serif-italic font-normal text-[1.12em] tracking-[-0.01em] mt-0.5">
                depth.
              </span>
            </motion.h1>

            {/* Subtitle: Refined Supporting Copy, Sitting Closer to Headline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial text-[15.5px] sm:text-[16px] text-text-secondary max-w-[34ch] font-normal leading-[1.6] mb-8 lg:mb-10"
            >
              Thoughtful interfaces, reliable systems <br className="hidden sm:inline" />
              and useful AI — from idea to deployment.
            </motion.p>

            {/* Understated Editorial CTA with Clearer Separation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="#work"
                onClick={smoothScrollToWork}
                className="group inline-flex items-center gap-2.5 font-editorial text-[14.5px] sm:text-[15px] font-medium text-text-primary transition-colors hover:text-accent-500 pb-1 border-b border-text-primary/30 hover:border-accent-500"
              >
                <span>Explore selected work</span>
                <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 text-text-secondary group-hover:text-accent-500">
                  →
                </span>
              </Link>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: 56% Large Photorealistic Artwork - Optically balanced vertical offset */}
          <div className="w-full lg:w-[56%] flex items-center justify-center lg:justify-end relative lg:pt-5 xl:pt-6">
            <div className="w-full max-w-[640px] lg:max-w-none">
              <HeroArtwork />
            </div>
          </div>

        </div>

        {/* Hero Lower Third: Single Footer Rule aligned with Main Container */}
        <div className="w-full mt-10 sm:mt-12 lg:mt-14">
          <div className="flex items-center justify-between border-t border-border/70 pt-4 font-mono text-[11px] text-text-muted">
            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 text-text-secondary text-[10.5px]"
            >
              <span className="text-text-secondary text-xs">↓</span>
              <span className="tracking-[0.14em]">SCROLL TO EXPLORE</span>
            </motion.div>

            {/* Geographic & Chronological Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="hidden sm:flex items-center gap-4 tracking-wider text-[10.5px]"
            >
              <span className="text-text-muted">INDIA</span>
              <span className="text-border">/</span>
              <span className="text-text-secondary">2026 →</span>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
