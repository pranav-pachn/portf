'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ManualBook } from './ManualBook';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { X } from 'lucide-react';

const booksData = [
  {
    id: 'book-1',
    volume: 'VOL. I',
    title: 'Frontend\nEngineering',
    philosophy: 'I focus on building responsive, accessible, and performant user interfaces that balance aesthetics with maintainability.',
    spread1Right: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    spread2Left: ['Redux / Zustand', 'React Query', 'Jest / Cypress', 'Radix UI'],
    spread2Right: ['Component-Driven UI', 'Performance Optimization', 'Accessibility (a11y)', 'Motion & Micro-interactions'],
  },
  {
    id: 'book-2',
    volume: 'VOL. II',
    title: 'Backend\nArchitecture',
    philosophy: 'I design scalable, secure, and efficient server-side systems, ensuring reliable data flow and high-performance APIs.',
    spread1Right: ['Node.js', 'Express', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Docker'],
    spread2Left: ['Redis', 'Firebase / Supabase', 'AWS / GCP', 'Nginx'],
    spread2Right: ['REST & GraphQL Design', 'Microservices', 'CI/CD Pipelines', 'Database Optimization'],
  },
  {
    id: 'book-3',
    volume: 'VOL. III',
    title: 'AI Systems\n& Cloud',
    philosophy: 'I integrate intelligent models into production systems, bridging the gap between raw AI capabilities and usable product features.',
    spread1Right: ['Python', 'TensorFlow', 'OpenAI APIs', 'LangChain', 'Hugging Face'],
    spread2Left: ['Vector Databases', 'PyTorch', 'Pandas / NumPy', 'Scikit-learn'],
    spread2Right: ['RAG Architectures', 'Prompt Engineering', 'System Design', 'Data Structures & Algorithms'],
  },
];

export function EngineeringManuals() {
  const [openBookId, setOpenBookId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openBookId !== null) {
        setOpenBookId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openBookId]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(() => {
    if (shouldReduceMotion) return;

    gsap.fromTo('.book-wrapper', {
      y: 60,
      opacity: 0,
      rotate: -3,
    }, {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: containerRef, dependencies: [shouldReduceMotion] });

  return (
    <>
      <div 
        ref={containerRef}
        className="w-full h-full flex flex-col justify-center items-center py-12 relative z-10"
        style={{ perspective: '2500px' }} // Provides 3D context
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-8 w-full max-w-7xl mx-auto">
          {booksData.map((book, index) => {
            const isOpen = openBookId === book.id;
            const isAnyBookOpen = openBookId !== null;
            const isDimmed = isAnyBookOpen && !isOpen;

            return (
              <div
                key={book.id}
                className={`book-wrapper relative w-full max-w-[16rem] md:max-w-[18rem] lg:max-w-[20rem] xl:max-w-[22rem] transition-all duration-500 ${isDimmed ? 'opacity-40 grayscale-[30%]' : 'opacity-100'}`}
                style={{ zIndex: isOpen ? 50 : 10 }}
              >
                <ManualBook 
                  book={book} 
                  isOpen={isOpen} 
                  onToggle={() => setOpenBookId(isOpen ? null : book.id)} 
                  shouldReduceMotion={shouldReduceMotion}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Backdrop for closing when clicking outside */}
      <AnimatePresence>
        {openBookId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[45] bg-transparent cursor-alias"
            onClick={() => setOpenBookId(null)}
          >
            {/* Close Hint */}
            <div className="absolute top-8 right-8 text-text-muted hover:text-text-primary transition-colors flex items-center gap-2">
              <span className="text-sm font-bold tracking-widest">CLOSE</span>
              <X size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
