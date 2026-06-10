import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ className, hoverable = false, padding = 'md', children, ...props }: CardProps) {
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  }

  return (
    <div
      className={cn(
        "rounded-xl bg-surface-elevated border border-border shadow-sm transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]",
        paddings[padding],
        hoverable && "hover:-translate-y-1 hover:shadow-lg hover:border-accent-500/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
