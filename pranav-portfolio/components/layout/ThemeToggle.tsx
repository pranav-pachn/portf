'use client';
import { useTheme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-[var(--color-surface-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-500)]"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-[var(--color-text-secondary)]" />
        ) : (
          <Sun className="w-5 h-5 text-[var(--color-text-secondary)]" />
        )}
      </motion.div>
    </button>
  );
}
