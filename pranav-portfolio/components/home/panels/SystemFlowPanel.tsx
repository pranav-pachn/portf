'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Container } from '@/components/ui/container';
import { FlowDiagram } from '@/components/architecture/FlowDiagram';
import { architectureDiagrams } from '@/data/architecture-diagrams';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export function SystemFlowPanel() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const diagram = architectureDiagrams[activeIndex];
  const shouldReduceMotion = useReducedMotion();
  
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!containerRef.current || shouldReduceMotion) return;

    if (tlRef.current) {
      tlRef.current.kill();
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });
    tlRef.current = tl;

    // Reset styles for replay
    gsap.set(['.arch-text-reveal', '.arch-diagram-frame'], { clearProps: 'all' });

    // 1. Heading slides in
    tl.fromTo('.arch-text-reveal', {
      x: -30,
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // 2. Diagram frame border draws in
    tl.fromTo('.arch-diagram-frame', {
      scaleX: 0,
      opacity: 0,
      transformOrigin: 'left',
    }, {
      scaleX: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');
    
    const nodesEls = gsap.utils.toArray('.flow-node', containerRef.current);
    const connectorEls = gsap.utils.toArray('.flow-connector', containerRef.current);
    const packetEls = gsap.utils.toArray('.flow-packet', containerRef.current);
    const labelEls = gsap.utils.toArray('.flow-label', containerRef.current);

    gsap.set(nodesEls, { opacity: 0, scale: 0.8, y: 20 });
    gsap.set(connectorEls, { scaleX: 0, opacity: 0, transformOrigin: 'left center' });
    gsap.set('.flow-connector-mobile', { scaleY: 0, opacity: 0, transformOrigin: 'top center' });
    gsap.set(packetEls, { opacity: 0 });
    gsap.set(labelEls, { opacity: 0, y: 10 });

    nodesEls.forEach((node, i) => {
      // 1. Node appears
      tl.to(node as Element, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, i > 0 ? '+=0' : '-=0.2');

      // 2. Line draws to next node (if not last)
      if (i < nodesEls.length - 1) {
        tl.to(connectorEls[i] as Element, {
          scaleX: 1,
          opacity: 0.3,
          duration: 0.5,
          ease: 'power2.inOut',
        }, '-=0.1');

        tl.to(containerRef.current?.querySelectorAll('.flow-connector-mobile')[i] as Element, {
          scaleY: 1,
          opacity: 0.3,
          duration: 0.5,
          ease: 'power2.inOut',
        }, '<');

        // 3. Data packet travels along the line
        tl.to(packetEls[i] as Element, {
          opacity: 1,
          duration: 0.1
        }, '-=0.2');

        tl.fromTo(packetEls[i] as Element, { left: 0 }, { left: '100%', duration: 0.6, ease: 'power1.inOut' }, '<');
        tl.fromTo(containerRef.current?.querySelectorAll('.flow-packet-mobile')[i] as Element, { top: 0, opacity: 1 }, { top: '100%', duration: 0.6, ease: 'power1.inOut' }, '<');
        
        tl.to([packetEls[i] as Element, containerRef.current?.querySelectorAll('.flow-packet-mobile')[i] as Element], { opacity: 0, duration: 0.1 });
      }

      // 4. Label fades in last (after node/line)
      tl.to(labelEls[i] as Element, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, i === nodesEls.length - 1 ? '-=0.2' : '-=0.4');
    });

  }, { scope: containerRef, dependencies: [shouldReduceMotion, activeIndex] });

  if (!diagram) return null;

  return (
    <section ref={containerRef} className="py-24 bg-surface flex items-center min-h-[800px]">
      <Container wide>
        
        <div className="flex flex-wrap gap-3 mb-12 arch-text-reveal justify-center lg:justify-start">
          {architectureDiagrams.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "font-mono px-4 py-2 rounded-full text-[13px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                activeIndex === i 
                  ? "bg-bg shadow-sm text-text-primary" 
                  : "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg/50"
              )}
              style={activeIndex === i ? { border: `1px solid ${d.accentColor}` } : { border: '1px solid var(--color-border)' }}
            >
              {activeIndex === i && (
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.accentColor }} />
              )}
              {d.title.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="flex flex-col lg:w-[25%] flex-shrink-0 text-center lg:text-left">
            <span className="arch-text-reveal font-mono text-[13px] font-semibold text-text-muted uppercase tracking-[0.14em] mb-4 block">
              System Flow
            </span>
            <h3 className="arch-text-reveal text-3xl md:text-4xl font-sans font-bold tracking-[-0.04em] leading-[1] text-text-primary mb-6">
              {diagram.title}
            </h3>
            <p className="arch-text-reveal text-[20px] text-text-secondary leading-[1.6] max-w-[34rem] font-normal tracking-normal mb-8">
              {diagram.description}
            </p>
          </div>

          <div className="lg:w-[75%] w-full">
            <div className="arch-diagram-frame bg-bg rounded-xl border border-border p-6 md:p-12 w-full overflow-hidden shadow-sm">
              <FlowDiagram nodes={diagram.nodes} accentColor={diagram.accentColor} disableAnimation={true} />
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
