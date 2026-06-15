export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (!href.startsWith('/#')) return;

  const id = href.substring(2);
  const element = document.getElementById(id);
  if (!element) return;

  // Only intercept on the home page
  if (window.location.pathname !== '/') return;

  e.preventDefault();

  // Walk up from the target <section id="..."> to find the sticky wrapper
  // We added data-stacked-section="true" to every sticky wrapper in StackedSections.tsx
  const stickyWrapper = element.closest('[data-stacked-section]') as HTMLElement | null;

  if (!stickyWrapper) {
    // Fallback: straightforward element scroll
    element.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // Calculate absolute top position using offsetTop recursively to get the natural (un-stuck) layout position
  let absoluteTop = 0;
  let currentEl: HTMLElement | null = stickyWrapper;
  while (currentEl) {
    absoluteTop += currentEl.offsetTop;
    currentEl = currentEl.offsetParent as HTMLElement;
  }

  window.scrollTo({
    top: absoluteTop,
    behavior: 'smooth',
  });

  window.history.pushState(null, '', href);
};


