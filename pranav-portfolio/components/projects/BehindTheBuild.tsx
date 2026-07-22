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
          <h5 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-text-muted mb-2">Why I Built This</h5>
          <p className="text-base text-text-secondary leading-[1.6] max-w-[34rem] font-normal">
            {project.motivation}
          </p>
        </div>
      )}

      {project.architectureDecisions && project.architectureDecisions.length > 0 && (
        <div>
          <h5 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-text-muted mb-3">Architecture Decisions</h5>
          <ul className="list-disc pl-4 space-y-3 text-base text-text-secondary max-w-[34rem] leading-[1.6] font-normal">
            {project.architectureDecisions.map((decision, i) => (
              <li key={i} className="pl-1 marker:text-[var(--project-accent)]">{decision}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
