'use client';

import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';

const skillGroups = [
  {
    title: 'Languages & Tools',
    skills: ['Python', 'SQL', 'C++', 'Java', 'TypeScript', 'JavaScript', 'Git', 'Postman', 'Docker', 'Firebase'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['React', 'Node.js', 'Express.js', 'Flask', 'FastAPI', 'Next.js', 'Bootstrap', 'TailwindCSS', 'Framer Motion'],
  },
  {
    title: 'Core CS Concepts',
    skills: ['DSA', 'DBMS', 'OOP', 'Operating Systems', 'System Design'],
  },
];

const roles = ['DEVELOPER', 'ENGINEER', 'CREATOR /'];

export function AboutSection() {
  return (
    <section id="about" className="py-0 bg-bg overflow-hidden min-h-screen">
      {/* Top Split: Roles | Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Left — Editorial Roles */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 border-r border-border">
          <AnimateOnScroll variant="blur">
            <div className="mb-12">
              {roles.map((role, i) => (
                <motion.h2
                  key={role}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-text-primary leading-[1.05] tracking-tight"
                >
                  {role}
                </motion.h2>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade" delay={0.4}>
            <div className="space-y-4 max-w-lg">
              <p className="text-text-secondary leading-relaxed">
                A software engineer passionate about <span className="text-text-primary font-medium">Full-Stack Development</span> focused on building AI-integrated web systems that combine clean user experiences with scalable backend architecture.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I enjoy transforming ideas into complete products — designing intuitive interfaces, developing reliable APIs, integrating intelligent workflows, and thinking through how systems work beyond just the UI.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I believe great software is not only about writing code, but about understanding problems, making engineering decisions, and creating solutions that are <span className="text-text-primary font-medium">useful, maintainable, and impactful.</span>
              </p>
              <p className="text-text-secondary leading-relaxed">
                Currently exploring advanced full-stack engineering, AI applications, and scalable product development while building projects that solve real-world problems.
              </p>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Right — Skills */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-surface">
          <AnimateOnScroll variant="blur">
            <h2 className="font-display font-black text-5xl md:text-6xl text-text-primary mb-12 tracking-tight">
              Skills
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10">
            {skillGroups.map((group, gi) => (
              <AnimateOnScroll key={group.title} delay={0.1 + gi * 0.1}>
                <div>
                  <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-5 pb-2 border-b border-border">
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.skills.map((skill, si) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * si + gi * 0.08, duration: 0.4 }}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
