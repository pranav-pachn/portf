import * as React from "react"
import { cn } from "@/lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  narrow?: boolean
  wide?: boolean
}

export function Container({ className, narrow, wide, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-6",
        narrow ? "max-w-4xl" : wide ? "max-w-[var(--max-width-wide)]" : "max-w-[var(--max-width)]",
        className
      )}
      {...props}
    />
  )
}
