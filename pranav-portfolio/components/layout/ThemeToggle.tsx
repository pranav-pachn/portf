'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  const isDark = theme === 'dark';

  return (
    <MagneticButton>
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="relative w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:text-accent-500 hover:bg-surface-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] overflow-hidden"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </button>
    </MagneticButton>
  );
}
