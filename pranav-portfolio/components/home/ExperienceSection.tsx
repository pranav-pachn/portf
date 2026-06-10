import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { experience } from '@/data/experience';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { GraduationCap, Briefcase, Award } from 'lucide-react';

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
};

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24">
      <Container narrow>
        <AnimateOnScroll>
          <SectionHeading 
            eyebrow="Background" 
            heading="Experience & Education" 
            align="center"
          />
        </AnimateOnScroll>

        <div className="relative mt-16 before:absolute before:inset-0 before:ml-6 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-border)] before:to-transparent">
          {experience.map((item, index) => {
            const Icon = typeIcons[item.type];
            
            return (
              <AnimateOnScroll key={item.id} delay={0.1 * index}>
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8 last:mb-0">
                  
                  {/* Timeline dot */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-bg bg-surface text-accent-500 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-[var(--duration-normal)] group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-bg">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Content card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] transition-transform duration-[var(--duration-normal)] md:group-odd:hover:translate-x-2 md:group-even:hover:-translate-x-2">
                    <Card hoverable className="p-6 md:p-8">
                      <div className="flex flex-col mb-4">
                        <span className="text-xs font-bold px-3 py-1 bg-surface-hover text-text-secondary rounded-full w-fit mb-3">
                          {item.dateRange}
                        </span>
                        <h3 className="font-display font-bold text-xl text-text-primary">
                          {item.title}
                        </h3>
                        <div className="text-accent-500 font-medium mt-1">
                          {item.organization}
                        </div>
                      </div>
                      
                      {item.description && (
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </Card>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
