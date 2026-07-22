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
      <h2 className="text-4xl md:text-[56px] font-sans font-bold text-text-primary tracking-[-0.04em] leading-[1]">
        {heading}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[20px] text-text-secondary max-w-[34rem] leading-[1.6] font-normal tracking-normal">
          {subtitle}
        </p>
      )}
    </div>
  )
}
