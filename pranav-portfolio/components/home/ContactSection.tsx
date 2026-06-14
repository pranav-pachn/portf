'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { site } from '@/data/site';
import { socialLinks } from '@/data/social-links';
import { ArrowRight, Mail, FileText } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-surface border-t border-border overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-accent-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Container narrow className="relative z-10 text-center">
        <AnimateOnScroll variant="scale">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-text-primary uppercase tracking-wider">
              Open to internships and engineering opportunities
            </span>
          </div>

          <SectionHeading 
            eyebrow="Get In Touch" 
            heading="Let's build something." 
            align="center" 
          />
          <p className="text-text-secondary text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            If you're building serious AI or full-stack systems and need a developer who thinks about architecture and UI, I'd love to chat.
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
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 sm:mt-0">
              {socialLinks.map(link => (
                <Button 
                  key={link.label}
                  href={link.href} 
                  variant="ghost" 
                  external
                  className="font-bold text-text-secondary hover:text-accent-500"
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
