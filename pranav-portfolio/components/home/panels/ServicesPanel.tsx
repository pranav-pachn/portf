'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { scrollToSection } from '@/lib/scroll';

interface ServiceItem {
  num: string;
  category: string;
  title: string;
  description: string;
  capabilities: string;
}

const services: ServiceItem[] = [
  {
    num: '01',
    category: 'PRODUCT DEVELOPMENT',
    title: 'Full-Stack Product Development',
    description:
      'Build complete web products, from thoughtful user interfaces to APIs, data models, authentication, and deployment.',
    capabilities: 'Interfaces · APIs · Data · Deployment',
  },
  {
    num: '02',
    category: 'APPLIED AI',
    title: 'AI-Powered Applications',
    description:
      'Turn AI capabilities into useful product features with context-aware answers, intelligent workflows, and evidence-based outputs.',
    capabilities: 'LLM Integration · RAG · AI Evaluation',
  },
  {
    num: '03',
    category: 'SYSTEMS',
    title: 'Backend & System Engineering',
    description:
      'Design dependable services with clear APIs, consistent data handling, resilient integrations, and robust error handling.',
    capabilities: 'API Design · Data Integrity · Reliability',
  },
];

export function ServicesPanel() {
  return (
    <section
      id="services"
      className="relative w-full bg-[var(--surface-bg)] text-[var(--surface-text)] py-20 sm:py-28 border-t border-[var(--surface-border)] scroll-mt-20"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        {/* ── TOP LEDGER BAR ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-6 select-none mb-12 sm:mb-14">
          <span className="font-mono text-sm sm:text-base uppercase tracking-[0.22em] font-semibold text-[var(--surface-text)] shrink-0">
            WHAT I DO
          </span>
          <div className="flex-1 h-[1px] bg-[var(--surface-border)]" />
          <span className="font-mono text-xs sm:text-sm text-[var(--surface-muted)] tracking-wider shrink-0">
            02 — SERVICES
          </span>
        </div>

        {/* ── SECTION HEADING & SUPPORTING STATEMENT ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-editorial font-medium tracking-[-0.025em] text-text-primary leading-[1.12] max-w-[32ch]">
            From product idea to production system.
          </h2>
          <p className="font-editorial text-[15px] sm:text-[16px] text-text-secondary leading-[1.6] mt-3 max-w-[52ch]">
            I build thoughtful interfaces, reliable systems, and useful AI products.
          </p>
        </motion.div>

        {/* ── MAIN AREA: TYPOGRAPHY-LED NUMBERED ROWS ───────────────────── */}
        <div className="flex flex-col border-t border-[var(--surface-border)]">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative py-7 sm:py-9 lg:py-10 border-b border-[var(--surface-border)] transition-colors duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] px-3 sm:px-4 -mx-3 sm:-mx-4"
            >
              {/* Subtle hover accent indicator on left (restrained straight hairline) */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top hidden lg:block" />

              <div className="grid grid-cols-12 gap-5 sm:gap-6 lg:gap-12 items-start">
                {/* Left: Number + Category Tag + Large Service Title */}
                <div className="col-span-12 lg:col-span-6 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="font-mono text-xs sm:text-[13px] text-accent-500 font-semibold tracking-widest tabular-nums">
                      {service.num}
                    </span>
                    <span className="text-text-muted text-xs">/</span>
                    <span className="font-mono text-[11px] sm:text-xs text-text-secondary tracking-widest uppercase">
                      {service.category}
                    </span>
                  </div>

                  <div className="inline-flex items-baseline gap-2.5">
                    <h3 className="font-editorial font-medium text-xl sm:text-2xl lg:text-[24px] xl:text-[26px] tracking-[-0.02em] text-text-primary leading-[1.2] transition-colors duration-300 group-hover:text-accent-500">
                      {service.title}
                    </h3>
                    <span className="text-accent-500 text-base font-normal opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:inline-block font-editorial shrink-0">
                      ↗
                    </span>
                  </div>
                </div>

                {/* Right: Explanation + Capabilities */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-between pt-1 lg:pt-0">
                  <p className="font-editorial text-[15px] sm:text-[16px] text-text-secondary leading-[1.65] max-w-[48ch] mb-3.5">
                    {service.description}
                  </p>

                  {/* Capability Line */}
                  <div className="font-mono text-xs text-text-muted tracking-wide">
                    {service.capabilities}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
        <div className="mt-12 sm:mt-16 pt-8 flex items-center justify-between border-t border-[var(--surface-border)]/60">
          <span className="font-editorial text-sm sm:text-base text-text-secondary hidden sm:inline-block">
            Built around useful outcomes.
          </span>
          <Link
            href="/#contact"
            onClick={(e) => scrollToSection(e, '/#contact')}
            className="group inline-flex items-center gap-2 font-editorial text-[15px] sm:text-[16px] font-medium text-text-primary hover:text-accent-500 pb-0.5 border-b border-text-primary/30 hover:border-accent-500 transition-colors ml-auto sm:ml-0"
          >
            <span>Have a project in mind? Let&apos;s talk</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 text-accent-500">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
