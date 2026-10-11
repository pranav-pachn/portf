'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

import { scrollToSection } from '@/lib/scroll';

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  active?: boolean;
  theme?: 'light' | 'dark';
  onClick?: () => void;
}

export function AnimatedLink({ href, children, external, className, active, theme = 'light', onClick }: AnimatedLinkProps) {
  const isExternal = external || href.startsWith('http');
  const isDark = theme === 'dark';
  
  const inner = (
    <span className="relative flex items-center py-1">
      <span className={cn(
        "relative flex items-center overflow-hidden transition-colors duration-200 font-medium text-[14.5px] tracking-[-0.01em]",
        isDark
          ? active
            ? "text-[#F2F0EA]"
            : "text-[#A09A91] group-hover:text-[#F2F0EA]"
          : active
          ? "text-text-primary"
          : "text-text-secondary group-hover:text-text-primary"
      )}>
        {/* Rolling Text Slot */}
        <span className="relative inline-flex flex-col overflow-hidden leading-normal">
          <span className="transition-transform duration-[260ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full inline-block">
            {children}
          </span>
          <span aria-hidden="true" className="absolute top-full left-0 transition-transform duration-[260ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full inline-block text-accent-500 font-medium">
            {children}
          </span>
        </span>
      </span>

      {/* Subtle Thin Cobalt Active Underline */}
      <span 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[1.5px] origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active
            ? "bg-accent-500 scale-x-100"
            : isDark
            ? "bg-white/20 scale-x-0 group-hover:scale-x-100 group-hover:bg-accent-500/80"
            : "bg-text-primary/20 scale-x-0 group-hover:scale-x-100 group-hover:bg-accent-500/60"
        )}
      />
    </span>
  );

  const baseClassName = cn(
    "relative group inline-flex items-center text-[15px] transition-all duration-[260ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] select-none cursor-pointer",
    className
  );

  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={baseClassName}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link 
      href={href} 
      className={baseClassName} 
      onClick={(e) => {
        if (onClick) onClick();
        scrollToSection(e, href);
      }}
    >
      {inner}
    </Link>
  );
}
