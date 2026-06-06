import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text-primary)] mb-4">Architecture & Systems</h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              Beyond the interface. How data, services, and models interact in production.
            </p>
          </div>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimateOnScroll delay={0.1} className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)] mb-4">JobShield AI Pipeline</h3>
            <p className="text-[var(--color-text-secondary)] mb-6 text-sm">
              Input → Verification Engine → Heuristics Layer → NLP Scoring → Risk Aggregation → Explainable Report
            </p>
            <div className="aspect-video bg-[var(--color-bg)] rounded flex items-center justify-center border border-dashed border-[var(--color-border)]">
              <span className="text-[var(--color-text-muted)] text-sm">Interactive Diagram Placeholder</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)] mb-4">AgriMitra360 Inference</h3>
            <p className="text-[var(--color-text-secondary)] mb-6 text-sm">
              Crop Image → FastAPI Service → Diagnosis Model → Multilingual Engine & Grad-CAM → User UI
            </p>
            <div className="aspect-video bg-[var(--color-bg)] rounded flex items-center justify-center border border-dashed border-[var(--color-border)]">
              <span className="text-[var(--color-text-muted)] text-sm">Interactive Diagram Placeholder</span>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
