'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FlowNode } from '@/types/architecture';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface FlowDiagramProps {
  nodes: FlowNode[];
  accentColor?: string;
}

export function FlowDiagram({ nodes, accentColor = 'var(--color-accent-500)' }: FlowDiagramProps) {
  return (
    <div 
      className="relative flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-0 w-full py-8"
      style={{ '--diagram-accent': accentColor } as React.CSSProperties}
    >
      {nodes.map((node, index) => (
        <FlowNodeItem 
          key={node.id} 
          node={node} 
          index={index} 
          isLast={index === nodes.length - 1} 
        />
      ))}
    </div>
  );
}

function FlowNodeItem({ node, index, isLast }: { node: FlowNode; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Dynamically get the Lucide icon
  const IconComponent = (LucideIcons as any)[node.icon] || LucideIcons.Circle;

  return (
    <div ref={ref} className="relative flex-1 flex flex-col items-center group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="w-full px-2"
      >
        <Card 
          padding="sm"
          className={cn(
            "relative z-10 flex flex-col items-center text-center h-full transition-colors duration-500",
            isInView ? "border-[var(--diagram-accent)] shadow-[var(--shadow-glow)] bg-[var(--color-surface-elevated)]" : "border-[var(--color-border)]"
          )}
        >
          <div 
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-500",
              isInView ? "bg-[var(--diagram-accent)]/10 text-[var(--diagram-accent)]" : "bg-[var(--color-bg)] text-[var(--color-text-muted)]"
            )}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <h4 className="text-[var(--text-sm)] font-bold text-[var(--color-text-primary)] leading-tight mb-1">
            {node.label}
          </h4>
          <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
            {node.caption}
          </p>
        </Card>
      </motion.div>

      {/* Desktop Connector */}
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-2 w-[calc(100%-1rem)] h-0.5 -translate-y-1/2 z-0">
          <motion.div 
            className="h-full bg-[var(--diagram-accent)] origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.4 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          />
        </div>
      )}

      {/* Mobile Connector */}
      {!isLast && (
        <div className="md:hidden w-0.5 h-8 my-2 z-0">
          <motion.div 
            className="w-full h-full bg-[var(--diagram-accent)] origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 0.4 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          />
        </div>
      )}
    </div>
  );
}
