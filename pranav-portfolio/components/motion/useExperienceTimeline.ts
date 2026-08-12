import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface UseExperienceTimelineProps {
  containerRef: React.RefObject<HTMLElement | null>;
  shouldReduceMotion: boolean;
}

export function useExperienceTimeline({ containerRef, shouldReduceMotion }: UseExperienceTimelineProps) {
  useGSAP(() => {
    if (!containerRef.current || shouldReduceMotion) return;

    // 1. The main timeline line grows as you scroll
    gsap.to('.timeline-line', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    // 2. The dots and cards reveal as they enter
    const items = gsap.utils.toArray('.timeline-item', containerRef.current);
    
    items.forEach((item: any, i: number) => {
      const dot = item.querySelector('.timeline-dot');
      const card = item.querySelector('.timeline-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(2)',
      });

      tl.fromTo(card, {
        opacity: 0,
        x: 30, // Cards are always on the right now
      }, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.2');
    });

    // 3. "Currently" dot appears once
    const currentlyDot = containerRef.current.querySelector('.currently-dot');
    if (currentlyDot) {
      gsap.fromTo(currentlyDot, {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.currently-container',
          start: 'top 85%',
          toggleActions: 'play none none none', // Play once
        }
      });
    }

    // 4. Terminal connector to Engineering Manuals grows with scroll
    gsap.to('.terminal-connector', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.terminal-connector-container',
        start: 'top center',
        end: 'bottom 40%', // Adjust end to feel right
        scrub: true,
      }
    });

  }, { scope: containerRef, dependencies: [shouldReduceMotion] });
}
