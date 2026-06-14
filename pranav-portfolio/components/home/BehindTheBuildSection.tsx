'use client';

import { useState } from 'react';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { featuredProjects } from '@/data/featured-projects';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

function InsightRow({ label, content, defaultOpen = false }: { label: string, content: string, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!content) return null;

  return (
    <div className="border-b border-border last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="font-bold text-text-primary group-hover:text-accent-500 transition-colors">
          {label}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-text-muted group-hover:text-accent-500 transition-colors" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-muted group-hover:text-accent-500 transition-colors" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-text-secondary leading-relaxed">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BehindTheBuildSection() {
  const topProjects = featuredProjects.slice(0, 3);
  const [activeTab, setActiveTab] = useState(0);

  if (topProjects.length === 0) return null;

  const activeProject = topProjects[activeTab];

  return (
    <section id="behind-the-build" className="py-24 bg-bg border-y border-border">
      <Container narrow>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Engineering Insights"
            heading="Behind the Build"
            subtitle="Curated reasoning and technical decisions behind the flagship products."
            align="center"
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {topProjects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all duration-300",
                  activeTab === index 
                    ? "bg-accent-500 text-bg shadow-md" 
                    : "bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-border"
                )}
              >
                {project.title}
              </button>
            ))}
          </div>

          {/* Active Project Content */}
          <Card 
            className="p-6 md:p-10 border-t-4 shadow-xl bg-surface"
            style={{ borderTopColor: activeProject.accentColor || 'var(--color-accent-500)' }}
          >
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center md:text-left">
                <h3 className="text-2xl font-bold font-display text-text-primary mb-2">
                  {activeProject.title}
                </h3>
                <p className="text-[var(--color-accent-500)] font-medium" style={{ color: activeProject.accentColor || 'var(--color-accent-500)' }}>
                  {activeProject.tagline}
                </p>
              </div>

              <div className="flex flex-col">
                <InsightRow label="Why I built it" content={activeProject.motivation || ''} defaultOpen={true} />
                <InsightRow label="What was hardest" content={activeProject.engineeringChallenge || ''} defaultOpen={true} />
                <InsightRow label="What decision mattered most" content={activeProject.architectureDecisions?.[0] || ''} />
                <InsightRow label="What trade-off I accepted" content={activeProject.iteration || ''} />
                <InsightRow label="What I'd improve next" content={activeProject.nextImprovement || ''} />
              </div>
            </motion.div>
          </Card>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
