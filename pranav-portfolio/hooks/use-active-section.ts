'use client';
import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('');
  const idsString = sectionIds.join(',');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ids = idsString.split(',').filter(Boolean);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection((prev) => (prev !== entry.target.id ? entry.target.id : prev));
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, options);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [idsString]);

  return activeSection;
}
