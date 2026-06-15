'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { site } from '@/data/site';
import { socialLinks } from '@/data/social-links';
import { ArrowRight, Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export function ContactPanel() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-bg overflow-hidden min-h-screen flex items-center">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-accent-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side */}
          <AnimateOnScroll variant="slide" delay={0.1}>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-bold text-accent-500 uppercase tracking-widest mb-6">
                Contact
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-[1.1] tracking-tight mb-8">
                Let’s build something meaningful.
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-lg font-medium">
                I’m currently open to internships and software engineering opportunities focused on full-stack products, AI-integrated systems, and scalable user experiences. If you're building something ambitious and need someone who cares about both architecture and execution, let’s connect.
              </p>
            </div>
          </AnimateOnScroll>
          
          {/* Right Side */}
          <AnimateOnScroll variant="slide" delay={0.3}>
            <Card className="flex flex-col gap-8 p-8 md:p-10 border border-border bg-surface/50 backdrop-blur-xl rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10 bg-bg/50 w-fit px-4 py-2 rounded-full border border-border/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-primary leading-none mt-px">
                  Open to internships and engineering opportunities
                </span>
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <MagneticButton>
                  <Button 
                    href={`mailto:${site.socials.email}`} 
                    size="lg" 
                    icon={<Mail className="w-5 h-5 ml-2" />}
                    className="w-full justify-between px-6 py-6"
                  >
                    Say Hello
                  </Button>
                </MagneticButton>
                
                <div className="flex flex-col gap-2 mt-2">
                  {socialLinks.map(link => {
                    if (link.label.toLowerCase() === 'email') return null;
                    return (
                      <Link 
                        key={link.label}
                        href={link.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-hover border border-transparent hover:border-border transition-all text-text-secondary hover:text-text-primary font-medium group"
                      >
                        {link.label}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-500" />
                      </Link>
                    );
                  })}

                </div>
              </div>
            </Card>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
