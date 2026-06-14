import { StackedSections } from '@/components/motion/StackedSections';
import { featuredProjects } from '@/data/featured-projects';

// Panels
import { HeroPanel } from '@/components/home/panels/HeroPanel';
import { WhatIBuildPanel } from '@/components/home/panels/WhatIBuildPanel';
import { HowIBuildPanel } from '@/components/home/panels/HowIBuildPanel';
import { WorkIntroPanel } from '@/components/home/panels/WorkIntroPanel';
import { ProjectPanel } from '@/components/home/panels/ProjectPanel';
import { ComingSoonProjectsPanel } from '@/components/home/panels/ComingSoonProjectsPanel';
import { ArchIntroPanel } from '@/components/home/panels/ArchIntroPanel';
import { SystemFlowPanel } from '@/components/home/panels/SystemFlowPanel';
import { ReliabilityPanel } from '@/components/home/panels/ReliabilityPanel';
import { DecisionsPanel } from '@/components/home/panels/DecisionsPanel';
import { LessonsPanel } from '@/components/home/panels/LessonsPanel';
import { AboutSection } from '@/components/home/AboutSection';
import { ExperiencePanel } from '@/components/home/panels/ExperiencePanel';
import { ContactPanel } from '@/components/home/panels/ContactPanel';

export default function Home() {
  const mainProjects = featuredProjects.slice(0, 3);
  const comingSoonProjects = featuredProjects.slice(3, 5);

  return (
    <StackedSections>
      <HeroPanel />
      <WhatIBuildPanel />
      <HowIBuildPanel />
      
      <WorkIntroPanel />
      {mainProjects.map((project, index) => (
        <ProjectPanel key={project.id} project={project} index={index} />
      ))}
      <ComingSoonProjectsPanel projects={comingSoonProjects} />
      
      <ArchIntroPanel />
      <SystemFlowPanel />
      <ReliabilityPanel />
      
      <DecisionsPanel />
      <LessonsPanel />
      
      <AboutSection />
      
      <ExperiencePanel />
      <ContactPanel />
    </StackedSections>
  );
}
