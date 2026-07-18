'use client'

import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export function Spotlight() {
  const divRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP({ scope: divRef })

  // Initialize quick setters for high performance tracking
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();

  useEffect(() => {
    if (spotlightRef.current) {
      // Set initial opacity to 0
      gsap.set(spotlightRef.current, { opacity: 0 });
      
      // Create highly optimized setters
      xTo.current = gsap.quickTo(spotlightRef.current, "x", { duration: 0.4, ease: "power3" });
      yTo.current = gsap.quickTo(spotlightRef.current, "y", { duration: 0.4, ease: "power3" });
    }
  }, []);

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !xTo.current || !yTo.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()
    
    // We are essentially moving a div with a radial gradient background
    // Calculate center offset (assuming the spotlight div is large, e.g. 1200x1200px)
    // We want the center of the gradient to match the mouse position
    
    const x = e.clientX - rect.left - 600; // 600 is half the width of our spotlight div
    const y = e.clientY - rect.top - 600;

    xTo.current(x);
    yTo.current(y);
  })

  const handleMouseEnter = contextSafe(() => {
    gsap.to(spotlightRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
  })

  const handleMouseLeave = contextSafe(() => {
    gsap.to(spotlightRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    })
  })

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto absolute inset-0 z-0 overflow-hidden"
    >
      {/* We use a large absolute div with a fixed gradient that we translate around for much better performance than updating background styles on every frame */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-0 top-0 w-[1200px] h-[1200px] opacity-0"
        style={{
          background: `radial-gradient(circle at center, var(--color-glow) 0%, transparent 50%)`,
        }}
      />
    </div>
  )
}
