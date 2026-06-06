import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  subtitle?: string
  eyebrow?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ className, heading, subtitle, eyebrow, align = 'left', ...props }: SectionHeadingProps) {
  return (
    <div 
      className={cn(
        "flex flex-col mb-12",
        align === 'center' ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <Badge variant="accent" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-[var(--text-3xl)] md:text-[var(--text-4xl)] font-display font-bold text-[var(--color-text-primary)] tracking-tight">
        {heading}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[var(--text-lg)] text-[var(--color-text-secondary)] max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
