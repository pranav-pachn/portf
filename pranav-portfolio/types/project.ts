export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  architectureDecisions: string[];
  engineeringChallenge: string;
  iteration: string;
  learned: string;
  liveUrl: string | null;
  githubUrl: string | null;
  image: string;
  accentColor?: string;
  motivation?: string;
  nextImprovement?: string;
  caseStudy?: {
    overview: string;
    problemContext: string;
    systemDesignSteps: import('./architecture').FlowNode[];
    screenshots: { src: string; alt: string; caption: string }[];
  };
}

export interface OtherProject {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
}
