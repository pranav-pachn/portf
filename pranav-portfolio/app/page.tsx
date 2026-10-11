import { featuredProjects } from '@/data/featured-projects';

// Panels & Chapters
import { HeroPanel } from '@/components/home/panels/HeroPanel';
import { ServicesPanel } from '@/components/home/panels/ServicesPanel';
import { StickyProjectShowcase } from '@/components/home/panels/StickyProjectShowcase';
import { AboutSection } from '@/components/home/AboutSection';
import { ExperiencePanel } from '@/components/home/panels/ExperiencePanel';
import { ContactPanel } from '@/components/home/panels/ContactPanel';

// Motion & UI
import { BlueprintTransition } from '@/components/motion/BlueprintTransition';
import { ScrollColorProgression } from '@/components/motion/ScrollColorProgression';

export default function Home() {
  const allProjects = featuredProjects.slice(0, 5);

  return (
    <main className="bg-[var(--surface-bg)] text-[var(--surface-text)] relative">
      <ScrollColorProgression />

      {/* CHAPTER 1: Identity (Hero + Blueprint Transition) — Warm Ivory */}
      <BlueprintTransition>
        <HeroPanel />
      </BlueprintTransition>
      
      {/* CHAPTER 2: Work (Sticky Showcase Engine) — Warm Grey */}
      <StickyProjectShowcase projects={allProjects} />

      {/* CHAPTER 3: Services (Outcomes & Capabilities) — Warm Ivory */}
      <ServicesPanel />
      
      {/* CHAPTER 4: About & Perspective (Manuals + Manifesto) — Charcoal */}
      <AboutSection />

      {/* CHAPTER 5: Experience & Track Record — Warm Ivory */}
      <ExperiencePanel />
      
      {/* CHAPTER 6: Closing (Contact) — Charcoal */}
      <ContactPanel />
    </main>
  );
}
