import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { featuredProjects } from '@/data/featured-projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

export function ProjectsSection() {
  return (
    <section id="work" className="py-24 bg-surface">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Selected Work"
            heading="Featured Projects"
            subtitle="Systems and products built with a focus on real-world utility, reliable architecture, and polished user experiences."
          />
        </AnimateOnScroll>

        <div className="space-y-16">
          {featuredProjects.map((project, index) => (
            <AnimateOnScroll key={project.id} delay={0.1}>
              <ProjectCard project={project} reversed={index % 2 !== 0} />
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
