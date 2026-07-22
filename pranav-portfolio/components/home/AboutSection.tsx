'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { motion } from 'framer-motion';
import { EngineeringManuals } from './EngineeringManuals';

const roles = ['DEVELOPER', 'ENGINEER', 'CREATOR /'];

export function AboutSection() {
  return (
    <section id="about" className="py-0 bg-bg overflow-hidden flex flex-col">
      {/* Top: Engineering Manuals (Capability Chapter) */}
      <div className="w-full bg-surface pb-32 pt-24 px-4 md:px-8 border-b border-border">
        <AnimateOnScroll variant="blur">
          <div className="max-w-6xl mx-auto mb-16 text-center xl:text-left">
            <span className="font-mono text-[13px] font-semibold tracking-[0.14em] uppercase text-accent-500 block mb-3">
              04 — ENGINEERING MANUALS
            </span>
            <h2 className="font-sans font-bold tracking-[-0.04em] text-4xl md:text-5xl leading-[1] text-text-primary">
              Engineering Expertise
            </h2>
            <p className="text-text-secondary mt-4 max-w-[34rem] leading-[1.6] font-normal mx-auto xl:mx-0">
              My technical foundation spans across the entire product stack.
            </p>
          </div>
        </AnimateOnScroll>
        
        <EngineeringManuals />
      </div>

      {/* Bottom: Roles | Bio (About Me) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[50vh] border-b border-border">
        {/* Left — Editorial Roles */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 lg:border-r border-border">
          <AnimateOnScroll variant="blur">
            <div className="mb-4">
              {roles.map((role, i) => (
                <motion.h2
                  key={role}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans font-bold text-5xl sm:text-6xl md:text-[72px] text-text-primary leading-[1] tracking-[-0.04em]"
                >
                  {role}
                </motion.h2>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Right — Bio */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-surface">
          <AnimateOnScroll variant="fade" delay={0.2}>
            <div className="space-y-6 max-w-xl text-lg">
              <p className="text-text-secondary leading-[1.6] font-normal">
                A software engineer passionate about <span className="text-text-primary font-medium">Full-Stack Development</span> focused on building AI-integrated web systems that combine clean user experiences with scalable backend architecture.
              </p>
              <p className="text-text-secondary leading-[1.6] font-normal">
                I enjoy transforming ideas into complete products — designing intuitive interfaces, developing reliable APIs, integrating intelligent workflows, and thinking through how systems work beyond just the UI.
              </p>
              <p className="text-text-secondary leading-[1.6] font-normal">
                I believe great software is not only about writing code, but about understanding problems, making engineering decisions, and creating solutions that are <span className="text-text-primary font-medium">useful, maintainable, and impactful.</span>
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
