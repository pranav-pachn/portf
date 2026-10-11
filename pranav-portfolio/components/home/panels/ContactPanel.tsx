'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { site } from '@/data/site';
import { socialLinks } from '@/data/social-links';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export function ContactPanel() {
  return (
    <section id="contact" className="relative py-28 md:py-36 bg-transparent text-[var(--surface-text)] overflow-hidden flex items-center border-t border-[var(--surface-border)] scroll-mt-20">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Side */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <AnimateOnScroll variant="subtleRise" delay={0.05}>
              <span className="font-mono text-[11px] font-medium text-accent-500 uppercase tracking-[0.18em] mb-4 block select-none">
                05 — CONTACT
              </span>
              <h2 className="text-[34px] md:text-[40px] lg:text-[44px] font-editorial font-medium text-[var(--surface-text)] leading-[1.08] tracking-[-0.03em] mb-5">
                Let’s build something meaningful.
              </h2>
              <p className="text-[16px] md:text-[17px] text-[var(--surface-muted)] leading-[1.65] max-w-[34rem] font-normal mb-7">
                I’m currently open to software engineering opportunities focused on full-stack products, AI-integrated systems, and scalable user experiences. If you're building something ambitious and care about both architecture and execution, let’s talk.
              </p>
              
              <div className="flex items-center gap-3 font-mono text-xs text-[var(--surface-muted)]">
                <span className="text-[var(--surface-text)] font-medium">BASED IN HYDERABAD, INDIA</span>
                <span className="opacity-40">/</span>
                <span>OPEN TO REMOTE & RELOCATION</span>
              </div>
            </AnimateOnScroll>
          </div>
          
          {/* Right Side */}
          <div className="md:col-span-5 w-full">
            <AnimateOnScroll variant="subtleRise" delay={0.15}>
              <Card className="flex flex-col gap-6 p-7 md:p-8 border border-[var(--surface-border)] bg-black/10 dark:bg-white/[0.03] rounded-xl shadow-[0_16px_40px_-16px_rgba(0,0,0,0.4)] backdrop-blur-xs">
                {/* Status Indicator */}
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-black/20 border border-[var(--surface-border)] w-fit select-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--surface-text)]">
                    AVAILABLE FOR ENGINEERING ROLES
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <MagneticButton>
                    <Button 
                      href={`mailto:${site.socials.email}`} 
                      size="lg" 
                      icon={<Mail className="w-4 h-4 ml-2" />}
                      className="w-full justify-between px-6 py-5 rounded-lg text-sm bg-accent-500 hover:bg-accent-600 text-white font-medium"
                    >
                      <span>Say Hello</span>
                    </Button>
                  </MagneticButton>
                  
                  <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--surface-border)]">
                    {socialLinks.map(link => {
                      if (link.label.toLowerCase() === 'email') return null;
                      return (
                        <Link 
                          key={link.label}
                          href={link.href} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-black/10 border border-transparent hover:border-[var(--surface-border)] transition-all text-[var(--surface-muted)] hover:text-[var(--surface-text)] text-sm font-medium group"
                        >
                          <span className="font-mono text-xs">{link.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent-500" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
