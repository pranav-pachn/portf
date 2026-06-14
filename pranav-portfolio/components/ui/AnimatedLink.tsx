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
  onClick?: () => void;
}

export function AnimatedLink({ href, children, external, className, active, onClick }: AnimatedLinkProps) {
  const isExternal = external || href.startsWith('http');
  
  const inner = (
    <>
      {children}
      <span 
        className={cn(
          "absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--project-accent,var(--color-accent-500))] origin-center transition-transform duration-300 ease-out",
          active ? "scale-x-100 shadow-glow" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </>
  );

  const baseClassName = cn(
    "relative group inline-flex items-center text-sm font-medium transition-colors py-1",
    active ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
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
