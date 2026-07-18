'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function FloatingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.floating-text');
    
    elements.forEach((el, index) => {
      // Extremely slow drift
      gsap.to(el, {
        x: '+=100',
        y: '+=50',
        rotation: '+=5',
        duration: 30 + index * 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-[0.03]">
      <div className="floating-text absolute top-[10%] left-[5%] font-display font-black text-[15rem] leading-none text-text-primary whitespace-nowrap">
        BACKEND
      </div>
      <div className="floating-text absolute top-[40%] right-[10%] font-display font-black text-[20rem] leading-none text-text-primary whitespace-nowrap">
        AI
      </div>
      <div className="floating-text absolute bottom-[10%] left-[20%] font-display font-black text-[12rem] leading-none text-text-primary whitespace-nowrap">
        CLOUD
      </div>
    </div>
  );
}
