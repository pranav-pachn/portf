'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface BookData {
  id: string;
  volume: string;
  title: string;
  philosophy: string;
  spread1Right: string[];
  spread2Left: string[];
  spread2Right: string[];
}

interface ManualBookProps {
  book: BookData;
  isOpen: boolean;
  onToggle: () => void;
  shouldReduceMotion: boolean;
}

export function ManualBook({ book, isOpen, onToggle, shouldReduceMotion }: ManualBookProps) {
  const [pageTurned, setPageTurned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const flipPageRef = useRef<HTMLDivElement>(null);
  const skillsSpread1Ref = useRef<HTMLUListElement>(null);
  const skillsSpread2LeftRef = useRef<HTMLUListElement>(null);
  const skillsSpread2RightRef = useRef<HTMLUListElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Reset page turn when book closes
  useEffect(() => {
    if (!isOpen && pageTurned) {
      const timer = setTimeout(() => setPageTurned(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, pageTurned]);

  // Main animation for opening/closing
  useGSAP(() => {
    if (shouldReduceMotion) return;

    if (isOpen) {
      const tl = gsap.timeline();
      
      // Calculate centering shifts based on current viewport
      let targetX = 0;
      let targetY = 0;
      let targetScale = 1.04; // Default slight pop out
      
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // The opened book is 2x width, centered around its left edge (the spine).
        targetX = (window.innerWidth / 2) - rect.left;
        targetY = (window.innerHeight / 2) - (rect.top + rect.height / 2);
        
        // Ensure the opened book fits on mobile screens by scaling it down if necessary
        const openWidth = rect.width * 2;
        const maxWidth = window.innerWidth * 0.9; // 90% of screen width to leave some margin
        const openHeight = rect.height;
        const maxHeight = window.innerHeight * 0.8; // 80% of screen height
        
        let widthScale = 1.04;
        let heightScale = 1.04;
        
        if (openWidth > maxWidth) {
          widthScale = maxWidth / openWidth;
        }
        if (openHeight > maxHeight) {
          heightScale = maxHeight / openHeight;
        }
        
        targetScale = Math.min(widthScale, heightScale);
      }

      // 1. Container shift and lift
      tl.to(containerRef.current, {
        scale: targetScale,
        z: 50,
        y: targetY,
        x: targetX,
        rotateY: 0,
        boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 40px var(--color-glow)',
        duration: 0.6,
        ease: 'power3.out'
      }, 0);

      // 2. Cover rotates
      tl.to(coverRef.current, {
        rotateY: -178,
        duration: 0.8,
        ease: 'power3.inOut'
      }, 0.1);

      // 3. Stagger skills fade in (Spread 1)
      const skills = skillsSpread1Ref.current?.querySelectorAll('li');
      if (skills) {
        tl.fromTo(skills, {
          opacity: 0,
          x: 10
        }, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out'
        }, 0.6); // Start as cover finishes opening
      }
    } else {
      const tl = gsap.timeline();
      
      // Reverse animations
      tl.to(coverRef.current, {
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.inOut'
      }, 0);

      tl.to(containerRef.current, {
        scale: 1,
        z: 0,
        y: 0,
        x: '0%',
        rotateY: 0,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        duration: 0.5,
        ease: 'power2.out'
      }, 0.2);
      
      // Hide skills
      const skills = skillsSpread1Ref.current?.querySelectorAll('li');
      if (skills) {
        gsap.set(skills, { opacity: 0, x: 10 });
      }
    }
  }, [isOpen, shouldReduceMotion]);

  // Page turn animation
  useGSAP(() => {
    if (shouldReduceMotion) return;

    if (pageTurned) {
      const tl = gsap.timeline();
      
      tl.to(flipPageRef.current, {
        rotateY: -177,
        duration: 0.7,
        ease: 'power3.inOut'
      }, 0);

      // Animate skills on spread 2
      const leftSkills = skillsSpread2LeftRef.current?.querySelectorAll('li');
      const rightSkills = skillsSpread2RightRef.current?.querySelectorAll('li');
      
      if (leftSkills && rightSkills) {
        tl.fromTo([...Array.from(leftSkills), ...Array.from(rightSkills)], {
          opacity: 0,
          x: 10
        }, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        }, 0.4);
      }
    } else if (isOpen) { // Only animate back if book is open, otherwise let parent close handle it
      const tl = gsap.timeline();
      
      tl.to(flipPageRef.current, {
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.inOut'
      }, 0);
      
      const leftSkills = skillsSpread2LeftRef.current?.querySelectorAll('li');
      const rightSkills = skillsSpread2RightRef.current?.querySelectorAll('li');
      if (leftSkills && rightSkills) {
        gsap.set([...Array.from(leftSkills), ...Array.from(rightSkills)], { opacity: 0, x: 10 });
      }
    } else {
      // Instant reset if closed
      gsap.set(flipPageRef.current, { rotateY: 0 });
    }
  }, [pageTurned, shouldReduceMotion]);

  // Hover animation
  const handleMouseEnter = contextSafe(() => {
    if (isOpen || shouldReduceMotion) return;
    gsap.to(containerRef.current, {
      scale: 1.02,
      y: -8,
      rotateY: -4,
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (isOpen || shouldReduceMotion) return;
    gsap.to(containerRef.current, {
      scale: 1,
      y: 0,
      rotateY: 0,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (!isOpen) onToggle();
      }}
      className={`relative w-full aspect-[2/3] cursor-pointer group`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 
        BOOK BASE (Spread 2 Right - Workflow) 
        This is the very back of the book. Always facing forward (0deg).
      */}
      <div className="absolute inset-0 bg-[#f7f6f3] rounded-r-md rounded-l-sm border-r border-y border-[#e5e5e5] overflow-hidden flex flex-col p-8 text-[#171717]">
        {/* Book shadow/spine fold effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
        
        <div className="flex-1 mt-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#737373] mb-6 pb-2 border-b border-[#e5e5e5]/50">
            Workflow & Practices
          </h4>
          <ul ref={skillsSpread2RightRef} className="space-y-4">
            {book.spread2Right.map((skill) => (
              <li 
                key={skill}
                className="text-sm font-medium border-l-2 border-transparent pl-3 opacity-0"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 
        FLIPPING PAGE (Spread 1 Right & Spread 2 Left) 
        Origin is left.
      */}
      <div
        ref={flipPageRef}
        className="absolute inset-0 origin-left"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT of flipping page: Spread 1 Right (Top Skills) */}
        <div 
          className="absolute inset-0 bg-[#f7f6f3] rounded-r-md rounded-l-sm border-r border-y border-[#e5e5e5] flex flex-col p-8 text-[#171717]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
          
          <div className="flex-1 mt-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#737373] mb-6 pb-2 border-b border-[#e5e5e5]/50">
              Core Technologies
            </h4>
            <ul ref={skillsSpread1Ref} className="space-y-4">
              {book.spread1Right.map((skill) => (
                <li 
                  key={skill}
                  className="text-sm font-medium pl-3 border-l-2 border-transparent opacity-0"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Next Page Button */}
          <div className="mt-auto pt-4 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPageTurned(true);
              }}
              disabled={!isOpen}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#737373] hover:text-[#171717] transition-colors p-2 -mr-2 ${!isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              Next Page <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* BACK of flipping page: Spread 2 Left (Tools / Libraries) */}
        <div 
          className="absolute inset-0 bg-[#f7f6f3] rounded-l-md rounded-r-sm border-l border-y border-[#e5e5e5] flex flex-col p-8 text-[#171717]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Shadow on the right side of the left page, indicating the fold */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
          
          <div className="flex-1 mt-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#737373] mb-6 pb-2 border-b border-[#e5e5e5]/50">
              Tools & Ecosystem
            </h4>
            <ul ref={skillsSpread2LeftRef} className="space-y-4 text-right">
              {book.spread2Left.map((skill) => (
                <li 
                  key={skill}
                  className="text-sm font-medium pr-3 border-r-2 border-transparent opacity-0"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Previous Page Button */}
          <div className="mt-auto pt-4 flex justify-start">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPageTurned(false);
              }}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#737373] hover:text-[#171717] transition-colors p-2 -ml-2"
            >
              <ArrowLeft size={14} /> Prev Page
            </button>
          </div>
        </div>
      </div>

      {/* 
        FRONT COVER
        Origin is left. Contains Cover Design (front) and Spread 1 Left (back)
      */}
      <div
        ref={coverRef}
        className="absolute inset-0 origin-left z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* OUTSIDE of cover */}
        <div 
          className="absolute inset-0 bg-[#0d0d0d] rounded-r-md rounded-l-sm border-l-[3px] border-l-accent-500 overflow-hidden flex flex-col justify-between p-8"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Subtle noise/texture could go here */}
          
          <div className="space-y-16">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 block">
              {book.volume}
            </span>
            
            <div>
              <h3 className="font-display text-4xl md:text-5xl font-black text-white leading-[1.1] whitespace-pre-line tracking-tight">
                {book.title}
              </h3>
              <div className="w-12 h-[2px] bg-accent-500 mt-6" />
            </div>
          </div>

          <div className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase mt-auto">
            Engineering Manual
          </div>
        </div>

        {/* INSIDE of cover (Spread 1 Left - Philosophy) */}
        <div 
          className="absolute inset-0 bg-[#f7f6f3] rounded-l-md rounded-r-sm border-l border-y border-[#e5e5e5] flex flex-col p-8 text-[#171717]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Spine shadow */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
          
          <div className="flex-1 flex flex-col justify-center">
            {isOpen && !pageTurned && (
              <div className="animate-fade-in-up" style={{ animationDelay: '400ms', animationDuration: '600ms', animationFillMode: 'both' }}>
                <h4 className="font-display text-2xl font-bold mb-6 tracking-tight text-[#0d0d0d]">
                  {book.title.replace('\n', ' ')}
                </h4>
                <p className="text-sm leading-relaxed text-[#525252] font-medium">
                  {book.philosophy}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
