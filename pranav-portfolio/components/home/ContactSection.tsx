'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { site } from '@/data/site';
import { socialLinks } from '@/data/social-links';
import { ArrowRight, Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[var(--color-surface)] border-t border-[var(--color-border)] overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-[var(--color-accent-500)]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Container narrow className="relative z-10 text-center">
        <AnimateOnScroll variant="scale">
          <SectionHeading 
            eyebrow="Get In Touch" 
            heading="Let's build something." 
            align="center" 
          />
          <p className="text-[var(--color-text-secondary)] text-[var(--text-lg)] mb-10 max-w-xl mx-auto leading-relaxed">
            Currently looking for new opportunities, internships, and product-building roles. If you're building serious AI or full-stack systems, I'd love to chat.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Button 
                href={`mailto:${site.socials.email}`} 
                size="lg" 
                icon={<Mail className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Say Hello
              </Button>
            </MagneticButton>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {socialLinks.map(link => (
                <Button 
                  key={link.label}
                  href={link.href} 
                  variant="ghost" 
                  external
                  className="font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent-500)]"
                >
                  {link.label}
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Button>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
