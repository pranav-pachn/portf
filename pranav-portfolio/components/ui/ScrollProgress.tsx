'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from '@/components/layout/ScrollOrchestrator';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const updateProgress = (progress: number) => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
    };

    if (lenis) {
      const handleScroll = (e: { progress?: number }) => {
        updateProgress(e.progress ?? 0);
      };
      lenis.on('scroll', handleScroll);
      return () => {
        lenis.off('scroll', handleScroll);
      };
    } else {
      // Fallback for native scroll (e.g. reduced motion mode)
      const handleNativeScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        updateProgress(progress);
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleNativeScroll);
      };
    }
  }, [lenis]);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-1 bg-accent-500 z-[60] origin-left pointer-events-none"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
