"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("badge", {
  variants: {
    color: {
      primary: "badge-primary",
      secondary: "badge-secondary",
      accent: "badge-accent",
      warning: "badge-warning",
      error: "badge-error",
      ghost: "badge-ghost",
    },
    size: {
      sm: "badge-sm",
      md: "badge-md",
      lg: "badge-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
})

export interface IBadge
  extends Omit<React.ComponentPropsWithRef<"div">, "color">, VariantProps<typeof variants> {}

export const Badge = React.forwardRef<HTMLDivElement, IBadge>(
  ({ children, className, color, size, ...props }, ref) => {
    return (
      <div ref={ref} className={variants({ color, size, className })} {...props}>
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge"

export default Badge
