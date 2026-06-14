import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { featuredProjects } from '@/data/featured-projects';
import { ProjectRow } from '@/components/projects/ProjectRow';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

export function ProjectsSection() {
  return (
    <section id="work" className="py-24 bg-bg">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Selected Work"
            heading="Projects"
            className="mb-16"
          />
        </AnimateOnScroll>

        <div className="flex flex-col">
          {featuredProjects.map((project, index) => (
            <AnimateOnScroll key={project.id} delay={0.1}>
              <ProjectRow project={project} index={index} />
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
