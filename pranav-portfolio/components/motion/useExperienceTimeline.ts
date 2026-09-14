import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface UseExperienceTimelineProps {
  containerRef: React.RefObject<HTMLElement | null>;
  shouldReduceMotion: boolean;
}

export function useExperienceTimeline({ containerRef, shouldReduceMotion }: UseExperienceTimelineProps) {
  useGSAP(() => {
    if (!containerRef.current || shouldReduceMotion) return;

    // 1. The main timeline line grows as you scroll (normal page scroll + GSAP scrub)
    gsap.to('.timeline-active-line', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 65%',
        end: 'bottom 65%',
        scrub: 0.4,
      },
    });

    const isDesktop = window.innerWidth >= 768;

    // 2. Animate all timeline items dynamically (left or right)
    const items = Array.from(containerRef.current.querySelectorAll<HTMLElement>('.timeline-item'));
    
    items.forEach((item) => {
      const dot = item.querySelector('.timeline-dot');
      const card = item.querySelector('.timeline-card');
      const connector = item.querySelector('.timeline-connector');
      const isLeft = item.classList.contains('timeline-item-left');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (dot) {
        tl.to(dot, {
          borderColor: 'var(--color-accent-500)',
          backgroundColor: 'var(--color-accent-500)',
          boxShadow: '0 0 12px rgba(20, 184, 166, 0.45)',
          duration: 0.35,
        });
      }

      if (connector) {
        tl.to(connector, {
          scaleX: 1,
          opacity: 1,
          duration: 0.3,
        }, '-=0.15');
      }

      if (card) {
        const xOffset = isDesktop ? (isLeft ? -40 : 40) : 30;
        tl.fromTo(card, {
          opacity: 0,
          x: xOffset,
        }, {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: 'power2.out',
        }, '-=0.2');
      }
    });

    // 3. Currently (Closing State Endpoint)
    const currentlyItem = containerRef.current.querySelector<HTMLElement>('.timeline-item-currently');
    if (currentlyItem) {
      const dot = currentlyItem.querySelector('.timeline-dot');
      const content = currentlyItem.querySelector('.timeline-currently-content');
      const connector = currentlyItem.querySelector('.timeline-connector');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: currentlyItem,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      if (dot) {
        tl.to(dot, {
          borderColor: 'var(--color-accent-500)',
          backgroundColor: 'var(--color-accent-500)',
          boxShadow: '0 0 12px rgba(20, 184, 166, 0.45)',
          duration: 0.35,
        });
      }

      if (connector) {
        tl.to(connector, {
          scaleX: 1,
          opacity: 1,
          duration: 0.3,
        }, '-=0.15');
      }

      if (content) {
        tl.fromTo(content, {
          opacity: 0,
          x: isDesktop ? 25 : 20,
        }, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.2');
      }
    }

    // 4. Transition: timeline fades into Engineering Manuals
    gsap.to('.timeline-fade-line', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-fade-line-container',
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: true,
      },
    });

  }, { scope: containerRef, dependencies: [shouldReduceMotion] });
}
