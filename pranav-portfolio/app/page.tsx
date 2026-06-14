import { HeroSection } from '@/components/home/HeroSection';
import { WhatIDoSection } from '@/components/home/WhatIDoSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ArchitectureSection } from '@/components/home/ArchitectureSection';
import { BehindTheBuildSection } from '@/components/home/BehindTheBuildSection';
import { AboutSection } from '@/components/home/AboutSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { ContactSection } from '@/components/home/ContactSection';
import { CurvedSection } from '@/components/motion/CurvedSection';

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Hero → Services: scroll-linked curved transition */}
      <CurvedSection topColor="text-bg" bottomColor="bg-surface">
        <WhatIDoSection />
      </CurvedSection>

      {/* Services → Works: scroll-linked curved transition */}
      <CurvedSection topColor="text-surface" bottomColor="bg-bg">
        <ProjectsSection />
      </CurvedSection>

      {/* Works → Architecture: scroll-linked curved transition */}
      <CurvedSection topColor="text-bg" bottomColor="bg-surface">
        <ArchitectureSection />
      </CurvedSection>

      {/* Architecture → Behind the Build: scroll-linked curved transition */}
      <CurvedSection topColor="text-surface" bottomColor="bg-bg">
        <BehindTheBuildSection />
      </CurvedSection>

      {/* Remaining sections: no curve animation (stable) */}
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}

