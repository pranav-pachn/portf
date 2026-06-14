import { notFound } from 'next/navigation';
import { featuredProjects } from '@/data/featured-projects';
import { CaseStudyPage } from '@/components/case-study/CaseStudyPage';
import { Metadata } from 'next';

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const project = featuredProjects.find((p) => p.id === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.tagline,
  };
}

export default async function WorkPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const projectIndex = featuredProjects.findIndex((p) => p.id === params.slug);
  
  if (projectIndex === -1) {
    notFound();
  }

  const project = featuredProjects[projectIndex];
  const nextProject = featuredProjects[(projectIndex + 1) % featuredProjects.length];

  return <CaseStudyPage project={project} nextProject={nextProject} projectIndex={projectIndex} nextProjectIndex={(projectIndex + 1) % featuredProjects.length} />;
}
