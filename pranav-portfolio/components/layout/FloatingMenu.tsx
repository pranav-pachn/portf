'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowLeft, ArrowRight, Layers, FileText, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { featuredProjects } from '@/data/featured-projects';
import { navLinks } from '@/data/nav-links';

export function FloatingMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isWorkRoute = pathname.startsWith('/work/');
  const slug = isWorkRoute ? pathname.split('/')[2] : null;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On home page, only show when scrolled down (since header disappears)
  if (pathname === '/' && !isScrolled) return null;

  let mainLinks: any[] = pathname === '/' 
    ? [...navLinks]
    : [
        { label: 'Back to Home', href: '/', icon: <ArrowLeft className="w-4 h-4 mr-3" /> },
      ];
  let externalLinks: any[] = [];
  let otherLinks: any[] = pathname === '/' ? [] : [...navLinks];

  if (isWorkRoute && slug) {
    const projectIndex = featuredProjects.findIndex((p) => p.id === slug);
    
    if (projectIndex !== -1) {
      const project = featuredProjects[projectIndex];
      const nextProject = featuredProjects[(projectIndex + 1) % featuredProjects.length];
      const prevProject = featuredProjects[(projectIndex - 1 + featuredProjects.length) % featuredProjects.length];

      mainLinks = [
        { label: 'Back to Home', href: '/', icon: <ArrowLeft className="w-4 h-4 mr-3" /> },
        { label: 'Previous Project', href: `/work/${prevProject.id}`, icon: <ArrowLeft className="w-4 h-4 mr-3" /> },
        { label: 'Next Project', href: `/work/${nextProject.id}`, icon: <ArrowRight className="w-4 h-4 mr-3" /> },
      ];

      externalLinks = [
        ...(project.liveUrl ? [{ label: 'View Live', href: project.liveUrl, icon: <Layers className="w-4 h-4 mr-3" />, external: true }] : []),
        ...(project.githubUrl ? [{ label: 'Source Code', href: project.githubUrl, icon: <Github className="w-4 h-4 mr-3" />, external: true }] : []),
      ];
    }
  }

  const renderLink = (link: any) => {
    const content = (
      <>
        {link.icon}
        <span className="flex-1">{link.label}</span>
        {link.external && <ExternalLink className="w-3 h-3 opacity-50 ml-2" />}
      </>
    );

    const className = "flex items-center px-4 py-3 md:py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors";

    if (link.external) {
      return (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => setIsOpen(false)}>
          {content}
        </a>
      );
    }

    return (
      <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={className}>
        {content}
      </Link>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-bg/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div className="fixed top-6 right-6 z-50 flex flex-col items-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full shadow-xl transition-all duration-300 z-50 text-white",
            isOpen ? "bg-bg border border-border text-text-primary hover:bg-surface" : "bg-accent-500 hover:bg-accent-600 hover:scale-105"
          )}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6 text-text-primary" /> : <Menu className="w-6 h-6 text-white" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, type: 'spring', bounce: 0.15 }}
              className="mt-4 w-[calc(100vw-3rem)] sm:w-64 rounded-2xl bg-surface/80 backdrop-blur-xl border border-border shadow-2xl overflow-hidden origin-top-right"
            >
              <nav className="flex flex-col py-2">
                {mainLinks.map(renderLink)}
                
                {externalLinks.length > 0 && (
                  <div className="my-1 border-t border-border/50">
                    {externalLinks.map(renderLink)}
                  </div>
                )}
                
                {otherLinks.length > 0 && (
                  <div className="my-1 border-t border-border/50">
                    {otherLinks.map(renderLink)}
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
