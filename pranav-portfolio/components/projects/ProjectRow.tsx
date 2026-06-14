'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Badge } from '@/components/ui/badge';

interface ProjectRowProps {
  project: FeaturedProject;
  index: number;
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <Link 
      href={`/work/${project.id}`}
      className="group block py-16 border-b border-border transition-colors duration-500 hover:border-[var(--project-accent)]/50"
      style={{
        '--project-accent': project.accentColor || 'var(--color-accent-500)',
      } as React.CSSProperties}
    >
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Left Column: Content */}
        <div className="flex flex-col md:w-[40%] flex-shrink-0">
          <span className="text-8xl font-display font-bold text-border/40 mb-6 transition-colors duration-500 group-hover:text-[var(--project-accent)]/80">
            {formattedIndex}
          </span>
          
          <div className="h-px w-16 bg-border mb-6 group-hover:bg-[var(--project-accent)] transition-colors duration-500" />
          
          <h3 className="text-3xl font-display font-bold text-text-primary mb-4 group-hover:text-[var(--project-accent)] transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            {project.tagline}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="border-border/50 text-text-secondary bg-transparent">{project.category}</Badge>
            <Badge variant="outline" className="border-border/50 text-text-secondary bg-transparent">{project.year}</Badge>
          </div>
          
          <p className="text-sm font-medium text-text-muted mt-auto pt-4">
            {project.stack.slice(0, 4).join(' • ')}
            {project.stack.length > 4 ? ' • ...' : ''}
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="flex flex-col md:w-[60%] flex-grow relative">
          <div className="w-full aspect-[16/10] overflow-hidden rounded-lg border border-border/60 bg-surface/50 relative mb-6 group-hover:border-[var(--project-accent)]/30 transition-all duration-500">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out)]"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--project-accent)]/50 font-display text-xl font-bold">
                {project.title} Screenshot
              </div>
            )}
            
            {/* Subtle glow overlay on hover */}
            <div className="absolute inset-0 bg-[var(--project-accent)]/0 group-hover:bg-[var(--project-accent)]/5 transition-colors duration-500 pointer-events-none mix-blend-overlay" />
          </div>
          
          <div className="flex items-center justify-end text-text-secondary group-hover:text-[var(--project-accent)] transition-colors duration-300 font-medium text-sm">
            Read Case Study <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </Link>
  );
}
