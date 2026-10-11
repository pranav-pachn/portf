import * as React from "react"
import { cn } from "@/lib/utils"

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
        <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-accent-500 mb-3.5 select-none">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-[44px] font-editorial font-medium text-text-primary tracking-[-0.03em] leading-[1.1]">
        {heading}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[17px] md:text-[19px] text-text-secondary max-w-[34rem] leading-[1.55] font-normal tracking-normal">
          {subtitle}
        </p>
      )}
    </div>
  )
}
