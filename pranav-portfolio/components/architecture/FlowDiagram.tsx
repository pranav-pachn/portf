'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { FlowNode } from '@/types/architecture';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface FlowDiagramProps {
  nodes: FlowNode[];
  accentColor?: string;
  disableAnimation?: boolean;
}

export function FlowDiagram({ nodes, accentColor = 'var(--color-accent-500)', disableAnimation = false }: FlowDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || disableAnimation) return;
    
    // Create a master timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%', // start when top of diagram hits 80% of viewport
        toggleActions: 'play none none reverse',
      }
    });

    const nodesEls = gsap.utils.toArray('.flow-node', containerRef.current);
    const connectorEls = gsap.utils.toArray('.flow-connector', containerRef.current);
    const packetEls = gsap.utils.toArray('.flow-packet', containerRef.current);
    const labelEls = gsap.utils.toArray('.flow-label', containerRef.current);

    // Initial state setup
    gsap.set(nodesEls, { opacity: 0, scale: 0.8, y: 20 });
    gsap.set(connectorEls, { scaleX: 0, opacity: 0, transformOrigin: 'left center' });
    gsap.set('.flow-connector-mobile', { scaleY: 0, opacity: 0, transformOrigin: 'top center' });
    gsap.set(packetEls, { opacity: 0 });
    gsap.set(labelEls, { opacity: 0, y: 10 });

    // Choreograph the sequence
    nodesEls.forEach((node, i) => {
      // 1. Node appears
      tl.to(node as Element, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, i > 0 ? '+=0' : 0);

      // 2. Label fades in
      tl.to(labelEls[i] as Element, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.2');

      // 3. Line draws to next node (if not last)
      if (i < nodes.length - 1) {
        // Desktop line
        tl.to(connectorEls[i] as Element, {
          scaleX: 1,
          opacity: 0.3,
          duration: 0.5,
          ease: 'power2.inOut',
        }, '-=0.1');

        // Mobile line
        tl.to(containerRef.current?.querySelectorAll('.flow-connector-mobile')[i] as Element, {
          scaleY: 1,
          opacity: 0.3,
          duration: 0.5,
          ease: 'power2.inOut',
        }, '<'); // Play at same time as desktop line

        // 4. Data packet travels along the line
        tl.to(packetEls[i] as Element, {
          opacity: 1,
          duration: 0.1
        }, '-=0.2');

        // Travel desktop
        tl.fromTo(packetEls[i] as Element, {
          left: 0,
        }, {
          left: '100%',
          duration: 0.6,
          ease: 'power1.inOut'
        }, '<');

        // Travel mobile
        tl.fromTo(containerRef.current?.querySelectorAll('.flow-packet-mobile')[i] as Element, {
          top: 0,
          opacity: 1
        }, {
          top: '100%',
          duration: 0.6,
          ease: 'power1.inOut'
        }, '<');

        tl.to([packetEls[i] as Element, containerRef.current?.querySelectorAll('.flow-packet-mobile')[i] as Element], {
          opacity: 0,
          duration: 0.1
        });
      }
    });

  }, { scope: containerRef, dependencies: [disableAnimation] });

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-0 w-full py-8"
      style={{ '--diagram-accent': accentColor } as React.CSSProperties}
    >
      {nodes.map((node, index) => {
        const isLast = index === nodes.length - 1;
        const IconComponent = (LucideIcons as any)[node.icon] || LucideIcons.Circle;

        return (
          <div key={node.id} className="relative flex-1 flex flex-col items-center group">
            {/* Node Container */}
            <div className="flow-node w-full px-2 relative z-10">
              <Card 
                padding="sm"
                className={cn(
                  "relative flex flex-col items-center text-center h-full transition-colors duration-500",
                  "border-[var(--diagram-accent)] shadow-glow bg-surface-elevated"
                )}
              >
                <div 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-500",
                    "bg-[var(--diagram-accent)]/10 text-[var(--diagram-accent)]"
                  )}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flow-label">
                  <h4 className="text-sm font-bold text-text-primary leading-tight mb-1">
                    {node.label}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {node.caption}
                  </p>
                </div>
                
                {node.reason && (
                  <div className="absolute inset-0 bg-surface-elevated/95 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center border border-[var(--diagram-accent)]/50 z-20 pointer-events-none">
                    <p className="text-xs text-text-primary font-medium leading-relaxed">
                      {node.reason}
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Desktop Connector */}
            {!isLast && (
              <div className="hidden md:block absolute top-1/2 -right-2 w-[calc(100%-1rem)] h-0.5 -translate-y-1/2 z-0">
                <div className="flow-connector h-full w-full bg-[var(--diagram-accent)]" />
                <div className="flow-packet absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--diagram-accent)] shadow-[0_0_8px_var(--diagram-accent)]" />
              </div>
            )}

            {/* Mobile Connector */}
            {!isLast && (
              <div className="md:hidden w-0.5 h-8 my-2 z-0 relative">
                <div className="flow-connector-mobile w-full h-full bg-[var(--diagram-accent)]" />
                <div className="flow-packet-mobile absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--diagram-accent)] shadow-[0_0_8px_var(--diagram-accent)]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
