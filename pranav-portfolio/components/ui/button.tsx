import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, external, icon, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] rounded-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      primary: "bg-accent-500 text-bg hover:bg-accent-600 shadow-sm hover:shadow-glow",
      secondary: "bg-transparent border border-border text-text-primary hover:border-accent-500 hover:text-accent-500",
      ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface"
    }
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg"
    }

    const classes = cn(baseStyles, variants[variant], sizes[size], className)

    const content = (
      <>
        {icon && <span className={cn("mr-2", children ? "" : "mr-0")}>{icon}</span>}
        {children}
      </>
    )

    if (href) {
      return (
        <Link 
          href={href} 
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </Link>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
