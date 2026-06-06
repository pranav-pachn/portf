import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Github, ArrowRight } from "lucide-react"

export default function Playground() {
  return (
    <div className="py-24 space-y-24">
      <Container>
        <SectionHeading 
          heading="Design System Playground" 
          subtitle="Temporary page to verify tokens and UI primitives."
          eyebrow="Phase 3"
        />

        <div className="space-y-16">
          {/* Typography */}
          <section className="space-y-6">
            <h3 className="text-[var(--text-xl)] font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2">Typography</h3>
            <div className="space-y-4">
              <div className="text-[var(--text-7xl)] font-display font-bold">Display 7XL</div>
              <div className="text-[var(--text-5xl)] font-display font-bold">Display 5XL</div>
              <div className="text-[var(--text-3xl)] font-display font-bold">Display 3XL</div>
              <div className="text-[var(--text-xl)] font-semibold">Sans XL</div>
              <div className="text-[var(--text-base)]">Sans Base - The quick brown fox jumps over the lazy dog.</div>
              <div className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">Sans Small - Secondary text for descriptions.</div>
            </div>
          </section>

          {/* Buttons */}
          <section className="space-y-6">
            <h3 className="text-[var(--text-xl)] font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large Button</Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button icon={<Github className="w-5 h-5"/>}>With Icon</Button>
              <Button variant="ghost" icon={<ArrowRight className="w-5 h-5"/>}/>
            </div>
          </section>

          {/* Badges */}
          <section className="space-y-6">
            <h3 className="text-[var(--text-xl)] font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2">Badges</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variant="default">React</Badge>
              <Badge variant="accent">Next.js 15</Badge>
              <Badge variant="outline">Tailwind</Badge>
            </div>
          </section>

          {/* Cards */}
          <section className="space-y-6">
            <h3 className="text-[var(--text-xl)] font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h4 className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] mb-2">Default Card</h4>
                <p className="text-[var(--color-text-secondary)]">Static card with elevated surface and subtle shadow.</p>
              </Card>
              <Card hoverable>
                <h4 className="text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] mb-2">Hoverable Card</h4>
                <p className="text-[var(--color-text-secondary)]">Lifts up and shows accent border and glow shadow on hover.</p>
              </Card>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
