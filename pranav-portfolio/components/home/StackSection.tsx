import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { stack } from '@/data/stack';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as LucideIcons from 'lucide-react';

export function StackSection() {
  return (
    <section id="stack" className="py-24 bg-surface">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Tools & Technologies"
            heading="Engineering Stack"
            subtitle="The technologies I use to build scalable, full-stack applications, organized by system layers."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((layer, index) => {
            const IconComponent = (LucideIcons as any)[layer.icon] || LucideIcons.Code;
            
            return (
              <AnimateOnScroll key={layer.name} delay={0.1 + index * 0.1}>
                <Card hoverable className="h-full flex flex-col p-8 bg-bg group border-border">
                  <div className="w-12 h-12 rounded-full bg-accent-500/10 text-accent-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-[var(--duration-normal)]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold font-display text-text-primary mb-2 group-hover:text-accent-500 transition-colors">
                    {layer.name}
                  </h3>
                  
                  <p className="text-sm text-text-secondary mb-8 flex-grow">
                    {layer.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {layer.technologies.map(tech => (
                      <Badge key={tech} variant="outline" className="bg-surface">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
