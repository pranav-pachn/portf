'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Monitor, Briefcase } from 'lucide-react';
import { navLinks } from '@/data/nav-links';
import { featuredProjects } from '@/data/featured-projects';
import { Card } from '@/components/ui/card';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sections = navLinks.map(link => ({
    id: link.href,
    title: `Go to ${link.label}`,
    icon: <Briefcase className="w-4 h-4" />,
    onSelect: () => {
      router.push(`/${link.href}`);
      setIsOpen(false);
    }
  }));

  const projects = featuredProjects.map(project => ({
    id: `project-${project.id}`,
    title: `Case Study: ${project.title}`,
    icon: <Monitor className="w-4 h-4" />,
    onSelect: () => {
      router.push(`/work/${project.id}`);
      setIsOpen(false);
    }
  }));

  const allActions = [...sections, ...projects];
  const filteredActions = query 
    ? allActions.filter(action => action.title.toLowerCase().includes(query.toLowerCase()))
    : allActions;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[20vh] sm:p-6 sm:pt-[20vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl mx-auto z-10"
          >
            <Card className="overflow-hidden p-0 shadow-2xl border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="flex items-center border-b border-[var(--color-border)] px-4">
                <Search className="w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  className="w-full bg-transparent p-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <span className="text-[var(--text-xs)] text-[var(--color-text-muted)] px-2 py-1 bg-[var(--color-bg)] rounded-[var(--radius-sm)] border border-[var(--color-border)]">
                  ESC
                </span>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredActions.length === 0 ? (
                  <div className="p-4 text-center text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                    No results found.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredActions.map(action => (
                      <button
                        key={action.id}
                        onClick={action.onSelect}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-accent-500)] text-[var(--color-text-secondary)] transition-colors focus:outline-none focus:bg-[var(--color-surface-hover)] focus:text-[var(--color-accent-500)] group"
                      >
                        <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-500)] transition-colors">
                          {action.icon}
                        </span>
                        <span className="text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-500)] transition-colors">
                          {action.title}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
