import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "bg-surface-hover text-text-secondary border border-border",
    accent: "bg-accent-500/10 text-accent-500 border border-accent-500/20",
    outline: "bg-transparent text-text-primary border border-border"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
