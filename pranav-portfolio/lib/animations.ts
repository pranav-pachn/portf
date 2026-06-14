import { Variants } from 'framer-motion';

// ============================================================================
// TIMING CONSTANTS
// ============================================================================
export const TIMING = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  stagger: 0.035,
  ease: [0.22, 1, 0.36, 1], // Apple-style smooth ease-out
};

// ============================================================================
// ROUTE TRANSITIONS (Level 1 Hierarchy)
// ============================================================================
export const routeOverlayVariants: Variants = {
  initial: {
    clipPath: 'inset(0 0 100% 0)',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  },
  animate: {
    clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)', 'inset(105% 0 -5% 0)'],
    borderBottomLeftRadius: ['0px', '48px', '48px'],
    borderBottomRightRadius: ['0px', '48px', '48px'],
    transition: {
      duration: 0.85,
      ease: TIMING.ease,
      times: [0, 0.5, 1],
    },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.4, ease: TIMING.ease },
  },
};

export const routeContentVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.35,
      duration: 0.6,
      ease: TIMING.ease,
    },
  },
};

// ============================================================================
// TEXT ANIMATIONS (Level 3 Hierarchy)
// ============================================================================
export const letterRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: TIMING.normal,
      ease: TIMING.ease,
    },
  },
};

// ============================================================================
// SCROLL/SECTION REVEALS (Level 2 Hierarchy)
// ============================================================================
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: TIMING.slow, ease: TIMING.ease } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: TIMING.slow, ease: TIMING.ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: TIMING.ease } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: TIMING.slow, ease: TIMING.ease } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: TIMING.ease } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
