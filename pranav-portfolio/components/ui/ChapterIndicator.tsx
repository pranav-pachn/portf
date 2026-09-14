'use client';

import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const chapters = [
  { id: 'hero', num: '01' },
  { id: 'work', num: '02' },
  { id: 'architecture', num: '03' },
  { id: 'experience', num: '04' }, // Experience + Engineering Manuals
  { id: 'contact', num: '05' },
];

const SECTION_IDS = ['hero', 'work', 'architecture', 'experience', 'about', 'contact'];

export function ChapterIndicator() {
  const [mounted, setMounted] = useState(false);
  
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Map experience and about to chapter 04 for the indicator
  const displaySection = activeSection === 'about' ? 'experience' : activeSection;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 mix-blend-difference pointer-events-none">
      {chapters.map((chapter) => {
        const isActive = displaySection === chapter.id || (displaySection === '' && chapter.id === 'hero');
        
        return (
          <div 
            key={chapter.id} 
            className="flex items-center gap-1.5 transition-all duration-300"
            style={{ 
              opacity: isActive ? 1 : 0.15,
            }}
          >
            <div 
              className={cn(
                "w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300",
                isActive ? "scale-100" : "scale-0"
              )} 
            />
            <span className="font-mono text-[10px] text-white">
              {chapter.num}
            </span>
          </div>
        );
      })}
    </div>
  );
}
