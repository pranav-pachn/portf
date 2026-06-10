'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { SectionHeading } from '@/components/ui/section-heading';

interface BehindTheBuildProps {
  project: FeaturedProject;
  variant: 'accordion' | 'full';
}

export function BehindTheBuild({ project, variant }: BehindTheBuildProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const Content = () => (
    <div className="pt-6 space-y-8 pb-2">
      {project.motivation && (
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Why I Built This</h5>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.motivation}
          </p>
        </div>
      )}

      <div>
        <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Architecture Decisions</h5>
        <ul className="list-disc pl-4 space-y-2 text-sm text-text-secondary">
          {project.architectureDecisions.map((decision, i) => (
            <li key={i} className="pl-1 marker:text-[var(--project-accent)]">{decision}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Engineering Challenge</h5>
        <p className="text-sm text-text-secondary leading-relaxed">
          {project.engineeringChallenge}
        </p>
      </div>

      <div>
        <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Iteration</h5>
        <p className="text-sm text-text-secondary leading-relaxed">
          {project.iteration}
        </p>
      </div>

      {project.nextImprovement && (
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">What I'd Improve Next</h5>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.nextImprovement}
          </p>
        </div>
      )}

      <div className="border-l-2 border-[var(--project-accent)] pl-4 italic bg-[var(--project-accent)]/5 p-4 rounded-r-[var(--radius-md)]">
        <h5 className="text-xs font-bold uppercase tracking-wider text-text-primary not-italic mb-2">Takeaway</h5>
        <p className="text-sm text-text-secondary">
          "{project.learned}"
        </p>
      </div>
    </div>
  );

  if (variant === 'full') {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 shadow-lg">
        <SectionHeading eyebrow="Deep Dive" heading="Behind the Build" className="mb-0" />
        <Content />
      </div>
    );
  }

  return (
    <div className="mt-auto border-t border-border pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left text-sm font-semibold text-text-primary hover:text-[var(--project-accent)] transition-colors focus:outline-none"
      >
        Behind the Build
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Content />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
