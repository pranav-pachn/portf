import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ className, hoverable = false, padding = 'md', children, ...props }: CardProps) {
  const paddings = {
    none: "p-0",
    sm: "p-[var(--space-4)]",
    md: "p-[var(--space-6)]",
    lg: "p-[var(--space-8)]"
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] bg-[var(--color-surface-elevated)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]",
        paddings[padding],
        hoverable && "hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-accent-500)]/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
