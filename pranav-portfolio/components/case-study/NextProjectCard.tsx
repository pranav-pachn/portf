import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FeaturedProject } from '@/types/project';
import { Container } from '@/components/ui/container';

interface NextProjectCardProps {
  project: FeaturedProject;
  index: number;
}

export function NextProjectCard({ project, index }: NextProjectCardProps) {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <section className="py-24 bg-surface border-t border-border">
      <Container>
        <Link 
          href={`/work/${project.id}`}
          className="group block relative overflow-hidden rounded-2xl border border-border bg-bg p-8 md:p-12 transition-all duration-500 hover:border-[var(--project-accent)] hover:shadow-2xl"
          style={{
            '--project-accent': project.accentColor || 'var(--color-accent-500)',
          } as React.CSSProperties}
        >
          {/* Subtle glow background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--project-accent)]/0 to-[var(--project-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            
            <div className="flex-1 w-full">
              <span className="text-sm font-bold tracking-widest uppercase text-text-muted mb-4 block">
                Next Project
              </span>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl md:text-5xl font-display font-bold text-border/40 group-hover:text-[var(--project-accent)]/50 transition-colors duration-500">
                  {formattedIndex}
                </span>
                <span className="text-3xl md:text-5xl font-display font-bold text-text-primary group-hover:text-[var(--project-accent)] transition-colors duration-300">
                  {project.title}
                </span>
              </div>
              
              <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
                {project.tagline}
              </p>
              
              <div className="flex items-center text-[var(--project-accent)] font-medium">
                View Project <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="w-full md:w-[45%] lg:w-[40%] flex-shrink-0">
              <div className="aspect-[16/10] w-full relative rounded-xl overflow-hidden border border-border/50 group-hover:border-[var(--project-accent)]/30 transition-colors duration-500 shadow-xl">
                {project.image ? (
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface/50 text-[var(--project-accent)]/50 font-display font-bold">
                    Screenshot
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </Link>
      </Container>
    </section>
  );
}
