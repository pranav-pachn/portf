'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: FeaturedProject;
  reversed?: boolean;
}

export function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "group relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] p-4 md:p-8 transition-all duration-[var(--duration-normal)] hover:border-[var(--color-accent-500)]/30 hover:shadow-[var(--shadow-lg)]",
        reversed && "lg:flex-row-reverse"
      )}
      style={{
        '--project-accent': project.accentColor || 'var(--color-accent-500)',
      } as React.CSSProperties}
    >
      {/* Image Area */}
      <div className="w-full lg:w-3/5 shrink-0 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] aspect-[16/10] relative">
        {project.image ? (
          <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-normal)]" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--project-accent)]/10 text-[var(--project-accent)] font-display text-xl font-bold group-hover:scale-105 transition-transform duration-[var(--duration-slow)]">
            {project.title} Screenshot
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="w-full lg:w-2/5 flex flex-col">
        <h3 className="text-[var(--text-3xl)] font-bold font-display text-[var(--color-text-primary)] mb-2">
          {project.title}
        </h3>
        <p className="text-[var(--project-accent)] font-medium mb-6 leading-relaxed">
          {project.tagline}
        </p>

        <div className="h-px w-full bg-[var(--color-border)] mb-6 transition-colors group-hover:bg-[var(--project-accent)]/30" />

        <div className="space-y-5 mb-8">
          <div>
            <h4 className="text-[var(--text-xs)] font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-2">The Problem</h4>
            <p className="text-[var(--color-text-secondary)] text-[var(--text-sm)] leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="text-[var(--text-xs)] font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-2">The Solution</h4>
            <p className="text-[var(--color-text-secondary)] text-[var(--text-sm)] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map(tech => (
            <Badge key={tech} variant="default" className="bg-[var(--color-bg)]">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          {project.liveUrl && (
            <Button href={project.liveUrl} external size="sm" icon={<ExternalLink className="w-4 h-4 order-last ml-2 mr-0" />}>
              View Live
            </Button>
          )}
          {project.githubUrl && (
            <Button href={project.githubUrl} external variant="secondary" size="sm" icon={<Github className="w-4 h-4" />}>
              Source
            </Button>
          )}
        </div>

        {/* Behind the Build Accordion */}
        <div className="mt-auto border-t border-[var(--color-border)] pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left text-[var(--text-sm)] font-semibold text-[var(--color-text-primary)] hover:text-[var(--project-accent)] transition-colors focus:outline-none"
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
                <div className="pt-6 space-y-6 pb-2">
                  <div>
                    <h5 className="text-[var(--text-xs)] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Architecture Decisions</h5>
                    <ul className="list-disc pl-4 space-y-2 text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                      {project.architectureDecisions.map((decision, i) => (
                        <li key={i} className="pl-1 marker:text-[var(--project-accent)]">{decision}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-[var(--text-xs)] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Engineering Challenge</h5>
                    <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] leading-relaxed">
                      {project.engineeringChallenge}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[var(--text-xs)] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Iteration</h5>
                    <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)] leading-relaxed">
                      {project.iteration}
                    </p>
                  </div>

                  <div className="border-l-2 border-[var(--project-accent)] pl-4 italic bg-[var(--project-accent)]/5 p-4 rounded-r-[var(--radius-md)]">
                    <h5 className="text-[var(--text-xs)] font-bold uppercase tracking-wider text-[var(--color-text-primary)] not-italic mb-2">Takeaway</h5>
                    <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                      "{project.learned}"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
