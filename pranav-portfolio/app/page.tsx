import { featuredProjects } from '@/data/featured-projects';

// Panels & Chapters
import { HeroPanel } from '@/components/home/panels/HeroPanel';
import { WorkIntroPanel } from '@/components/home/panels/WorkIntroPanel';
import { StickyProjectShowcase } from '@/components/home/panels/StickyProjectShowcase';
import { ArchIntroPanel } from '@/components/home/panels/ArchIntroPanel';
import { SystemFlowPanel } from '@/components/home/panels/SystemFlowPanel';
import { ExperiencePanel } from '@/components/home/panels/ExperiencePanel';
import { AboutSection } from '@/components/home/AboutSection';
import { ContactPanel } from '@/components/home/panels/ContactPanel';

// Motion & UI
import { BlueprintTransition } from '@/components/motion/BlueprintTransition';
import { ScrollColorProgression } from '@/components/motion/ScrollColorProgression';
import { ChapterIndicator } from '@/components/ui/ChapterIndicator';

export default function Home() {
  const allProjects = featuredProjects.slice(0, 5);

  return (
    <main className="bg-bg relative transition-colors duration-700">
      <ScrollColorProgression />
      <ChapterIndicator />

      {/* CHAPTER 1: Identity (Hero + Blueprint Transition) */}
      <BlueprintTransition>
        <HeroPanel />
      </BlueprintTransition>
      
      {/* CHAPTER 2: Products (Sticky Showcase Engine) */}
      <WorkIntroPanel />
      <StickyProjectShowcase projects={allProjects} />
      
      {/* CHAPTER 3: Engineering (Workflows & Experience) */}
      <ArchIntroPanel />
      <SystemFlowPanel />
      <ExperiencePanel />
      
      {/* CHAPTER 4: Capability (Engineering Manuals + About Me) */}
      <AboutSection />
      
      {/* CHAPTER 5: Closing (Contact) */}
      <ContactPanel />
    </main>
  );
}
