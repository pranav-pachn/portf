'use client';

import React, { useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface CursorHoverProps {
  children: React.ReactNode;
  href?: string | null;
  text?: string;
  className?: string;
  external?: boolean;
}

export function CursorHover({ children, href, text = "View Live", className = "", external = true }: CursorHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLAnchorElement & HTMLDivElement>(null);
  
  // Spring config for smooth following
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const Content = (
    <>
      {children}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="pointer-events-none absolute left-0 top-0 z-50 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--project-accent,var(--color-accent-500))] text-white shadow-2xl backdrop-blur-sm"
      >
        <span className="flex flex-col items-center text-xs font-bold uppercase tracking-wider">
          {text}
          <ArrowUpRight className="w-5 h-5 mt-0.5" />
        </span>
      </motion.div>
    </>
  );

  if (!href) {
    return (
      <div 
        ref={containerRef}
        className={`relative overflow-hidden cursor-none ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {Content}
      </div>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        ref={containerRef}
        className={`relative block overflow-hidden cursor-none ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {Content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      ref={containerRef}
      className={`relative block overflow-hidden cursor-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {Content}
    </Link>
  );
}
