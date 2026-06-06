import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
    accent: "bg-[var(--color-accent-500)]/10 text-[var(--color-accent-500)] border border-[var(--color-accent-500)]/20",
    outline: "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)]"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5 text-[var(--text-xs)] font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
