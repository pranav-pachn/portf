'use client';

import { FeaturedProject } from '@/types/project';

interface BehindTheBuildProps {
  project: FeaturedProject;
  variant?: 'full'; // Keeping prop for backwards compatibility if needed, but unused internally
}

export function BehindTheBuild({ project }: BehindTheBuildProps) {
  return (
    <div className="pt-2 space-y-8">
      {project.motivation && (
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Why I Built This</h5>
          <p className="text-lg text-text-secondary leading-relaxed">
            {project.motivation}
          </p>
        </div>
      )}

      {project.architectureDecisions && project.architectureDecisions.length > 0 && (
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Architecture Decisions</h5>
          <ul className="list-disc pl-4 space-y-3 text-lg text-text-secondary">
            {project.architectureDecisions.map((decision, i) => (
              <li key={i} className="pl-1 marker:text-[var(--project-accent)]">{decision}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
