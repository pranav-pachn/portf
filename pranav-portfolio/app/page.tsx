import { featuredProjects } from '@/data/featured-projects';

// Panels
import { HeroPanel } from '@/components/home/panels/HeroPanel';
import { WhatIBuildPanel } from '@/components/home/panels/WhatIBuildPanel';
import { HowIBuildPanel } from '@/components/home/panels/HowIBuildPanel';
import { WorkIntroPanel } from '@/components/home/panels/WorkIntroPanel';
import { ProjectPanel } from '@/components/home/panels/ProjectPanel';

import { ArchIntroPanel } from '@/components/home/panels/ArchIntroPanel';
import { SystemFlowPanel } from '@/components/home/panels/SystemFlowPanel';
import { ReliabilityPanel } from '@/components/home/panels/ReliabilityPanel';
import { DecisionsPanel } from '@/components/home/panels/DecisionsPanel';
import { LessonsPanel } from '@/components/home/panels/LessonsPanel';
import { AboutSection } from '@/components/home/AboutSection';
import { ExperiencePanel } from '@/components/home/panels/ExperiencePanel';
import { ContactPanel } from '@/components/home/panels/ContactPanel';

export default function Home() {
  const allProjects = featuredProjects.slice(0, 5);

  return (
    <main className="bg-bg">
      {/* MACRO 1: Identity & Approach */}
      <HeroPanel />
      <WhatIBuildPanel />
      <HowIBuildPanel />
      
      {/* MACRO 2: Selected Work */}
      <WorkIntroPanel />
      {allProjects.map((project, index) => (
        <ProjectPanel key={project.id} project={project} index={index} />
      ))}
      
      {/* MACRO 3: System Architecture */}
      <ArchIntroPanel />
      <SystemFlowPanel />
      <ReliabilityPanel />
      
      {/* MACRO 4: Engineering Insights */}
      <DecisionsPanel />
      <LessonsPanel />
      
      {/* MACRO 5: About & Experience & Contact */}
      <AboutSection />
      <ExperiencePanel />
      <ContactPanel />
    </main>
  );
}
