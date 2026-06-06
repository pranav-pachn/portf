import { HeroSection } from '@/components/home/HeroSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ArchitectureSection } from '@/components/home/ArchitectureSection';
import { StackSection } from '@/components/home/StackSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { ContactSection } from '@/components/home/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ArchitectureSection />
      <StackSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
