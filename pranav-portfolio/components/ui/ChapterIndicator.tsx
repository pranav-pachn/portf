'use client';

import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const chapters = [
  { id: 'hero', num: '01' },
  { id: 'work', num: '02' },
  { id: 'architecture', num: '03' }, // Architecture + Experience
  { id: 'about', num: '04' }, // Engineering Manuals + About
  { id: 'contact', num: '05' },
];

export function ChapterIndicator() {
  const [mounted, setMounted] = useState(false);
  
  // Also include experience in the list of sections to track, but map it to 03
  const activeSection = useActiveSection(['hero', 'work', 'architecture', 'experience', 'about', 'contact']);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Map experience to architecture chapter for the indicator
  const displaySection = activeSection === 'experience' ? 'architecture' : activeSection;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 mix-blend-difference">
      {chapters.map((chapter) => {
        const isActive = displaySection === chapter.id || (displaySection === '' && chapter.id === 'hero');
        
        return (
          <div 
            key={chapter.id} 
            className="flex items-center gap-1.5 transition-all duration-300"
            style={{ 
              opacity: isActive ? 1 : 0.25,
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
