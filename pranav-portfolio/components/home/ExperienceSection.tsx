import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { experience } from '@/data/experience';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <AnimateOnScroll>
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text-primary)] mb-4">Experience & Education</h2>
          </div>
        </AnimateOnScroll>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-border)] before:to-transparent">
          {experience.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={0.1 * index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--color-bg)] bg-[var(--color-surface)] text-[var(--color-accent-500)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-[var(--color-accent-500)] rounded-full" />
              </div>
              
              {/* Content card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent-500)]/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                  <h3 className="font-bold text-lg text-[var(--color-text-primary)]">{item.title}</h3>
                  <span className="text-xs font-medium px-2 py-1 bg-[var(--color-bg)] text-[var(--color-text-secondary)] rounded-full whitespace-nowrap">
                    {item.dateRange}
                  </span>
                </div>
                <div className="text-[var(--color-accent-500)] text-sm font-medium mb-3">{item.organization}</div>
                {item.description && (
                  <p className="text-[var(--color-text-secondary)] text-sm">{item.description}</p>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
