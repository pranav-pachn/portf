import { ExternalLink, Github } from 'lucide-react';
import { FeaturedProject } from '@/types/project';

interface ProjectMetaStripProps {
  project: FeaturedProject;
}

export function ProjectMetaStrip({ project }: ProjectMetaStripProps) {
  const metaItems = [
    { label: 'Category', value: project.category },
    { label: 'Year', value: project.year },
    { label: 'Stack', value: project.stack.slice(0, 3).join(', ') + (project.stack.length > 3 ? '...' : '') },
  ];

  return (
    <div className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-border mt-8">
      {metaItems.map((item, i) => (
        <div key={i} className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-text-muted font-bold mb-1">
            {item.label}
          </span>
          <span className="text-sm font-medium text-text-primary">
            {item.value}
          </span>
        </div>
      ))}

      {/* External Links */}
      <div className="flex gap-6 ml-auto">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-[var(--project-accent)] transition-colors"
          >
            <span className="text-xs uppercase tracking-wider text-text-muted font-bold">Live</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-[var(--project-accent)] transition-colors"
          >
            <span className="text-xs uppercase tracking-wider text-text-muted font-bold">Source</span>
            <Github className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
