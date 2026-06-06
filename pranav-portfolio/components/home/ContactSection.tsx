'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { site } from '@/data/site';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 md:px-6 bg-[var(--color-surface)]">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimateOnScroll variant="scale">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-text-primary)] mb-6">Let's build something.</h2>
          <p className="text-[var(--color-text-secondary)] text-lg mb-10 max-w-2xl mx-auto">
            Currently looking for new opportunities, internships, and product-building roles. If you're building serious AI/full-stack systems, I'd love to chat.
          </p>
          <Link 
            href={`mailto:${site.socials.email}`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-bg)] font-medium text-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Mail className="mr-2 w-5 h-5" />
            Say Hello
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
