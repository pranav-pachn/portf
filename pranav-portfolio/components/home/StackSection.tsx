import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { stack } from '@/data/stack';

export function StackSection() {
  return (
    <section id="stack" className="py-24 px-4 md:px-6 bg-[var(--color-surface)]">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text-primary)] mb-4">Engineering Stack</h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              Tools and technologies organized by system layers.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((layer, index) => (
            <AnimateOnScroll key={layer.name} delay={0.1 + index * 0.1} className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{layer.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">{layer.description}</p>
              <div className="flex flex-wrap gap-2">
                {layer.technologies.map(tech => (
                  <span key={tech} className="px-2 py-1 text-xs font-medium rounded-md bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)]">
                    {tech}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
