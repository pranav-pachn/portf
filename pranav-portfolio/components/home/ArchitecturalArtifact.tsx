'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function ArchitecturalArtifact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs with heavy damping for a grounded, physical feel
  const springConfig = { damping: 30, stiffness: 120, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Restricted micro-tilt: exactly ±1deg and ±2px translation
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [1, -1]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-1, 1]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-2, 2]);

  // Additional micro-movements for screen reflection
  const reflectionX = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const reflectionY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isCoarse);

    if (isCoarse) return;

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      // Normalized between -0.5 and 0.5
      const normX = (e.clientX / windowWidth) - 0.5;
      const normY = (e.clientY / windowHeight) - 0.5;
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center select-none"
    >
      {/* Heavy 14s Ambient Float Container */}
      <motion.div
        animate={isTouchDevice ? undefined : { y: [0, -3, 0] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={isTouchDevice ? undefined : {
          rotateX,
          rotateY,
          translateY,
          transformPerspective: 1200,
        }}
        className="relative w-full max-w-[640px] xl:max-w-[700px] group cursor-default"
      >
        {/* Atmospheric separation behind the laptop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_60%)] pointer-events-none z-0 transform -translate-y-4 scale-110"
        />

        {/* Stronger Contact Shadow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[105%] h-16 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.98)_0%,_rgba(0,0,0,0.7)_40%,_transparent_75%)] pointer-events-none z-0"
        />

        {/* Photographic Monolith Container (No border, no rounded corners) */}
        <div className="relative z-10 w-full shadow-2xl">
          {/* Main Editorial Image */}
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/hero-artifact.jpg"
              alt="Architectural monolith with systems laptop"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-center transition-[filter,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-[1.02] contrast-[1.05] group-hover:brightness-[1.08]"
            />

            {/* Seamless Vignette overlay for edge blending into #0a0a0a */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 50%, transparent 65%, rgba(10,10,10,0.4) 85%, rgba(10,10,10,0.95) 100%),
                  linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 15%),
                  linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, transparent 15%),
                  linear-gradient(to right, rgba(10,10,10,0.8) 0%, transparent 10%),
                  linear-gradient(to left, rgba(10,10,10,0.8) 0%, transparent 10%)
                `,
              }}
            />

            {/* Laptop Screen Diagram Overlay */}
            <div className="absolute top-[18%] left-[41%] w-[26%] h-[40%] pointer-events-none mix-blend-screen opacity-90">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-[rgba(255,255,255,0.28)] fill-none text-[rgba(255,255,255,0.4)]">
                <text x="15" y="25" fontSize="7" fill="currentColor" fontWeight="500" letterSpacing="0.5">CORE</text>
                <text x="65" y="25" fontSize="7" fill="currentColor" fontWeight="500" letterSpacing="0.5">AI</text>
                <text x="40" y="75" fontSize="7" fill="currentColor" fontWeight="500" letterSpacing="0.5">DATA</text>
                
                <path d="M 32 23 L 60 23" strokeWidth="0.5" />
                <path d="M 23 28 L 43 68" strokeWidth="0.5" />
                <path d="M 68 28 L 48 68" strokeWidth="0.5" />
                
                <circle cx="23" cy="23" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="68" cy="23" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="45" cy="73" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </div>

            {/* Subtle Physical Screen Reflection Glare (Moves with mouse) */}
            <motion.div
              aria-hidden="true"
              style={isTouchDevice ? undefined : { x: reflectionX, y: reflectionY }}
              className="absolute top-[16%] left-[40%] w-[28%] h-[44%] pointer-events-none opacity-30 mix-blend-overlay overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-tr from-transparent via-white/[0.15] to-transparent" />
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
