'use client';

import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const chapters = [
  { id: 'hero', num: '01' },
  { id: 'work', num: '02' },
  { id: 'architecture', num: '03' },
  { id: 'experience', num: '04' },
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

  const displaySection = activeSection === 'about' ? 'experience' : activeSection;
  const isWork = displaySection === 'work';

  return (
    <aside
      aria-label="Chapter navigation index"
      className={cn(
        'fixed left-4 xl:left-6 top-[44%] -translate-y-1/2 z-40 hidden lg:flex items-center gap-2 mix-blend-difference pointer-events-none select-none transition-opacity duration-300',
        isWork && 'opacity-0'
      )}
    >
      {/* Delicate vertical index line - quiet and understated */}
      <div className="w-[1px] h-8 bg-white/20 rounded-full" />

      {/* Chapter numbers */}
      <div className="flex flex-col gap-1.5">
        {chapters.map((chapter) => {
          const isActive =
            displaySection === chapter.id || (displaySection === '' && chapter.id === 'hero');

          return (
            <div
              key={chapter.id}
              className="flex items-center gap-1.5 transition-opacity duration-300"
              style={{
                opacity: isActive ? 0.65 : 0.14,
              }}
            >
              <div
                className={cn(
                  'w-1 h-1 rounded-full bg-white/80 transition-transform duration-300',
                  isActive ? 'scale-100' : 'scale-0'
                )}
              />
              <span
                className={cn(
                  'font-mono text-[9px] text-white tracking-widest',
                  isActive ? 'font-medium' : 'font-normal'
                )}
              >
                {chapter.num}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
