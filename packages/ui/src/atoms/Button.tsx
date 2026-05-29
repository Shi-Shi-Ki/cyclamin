"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("btn", {
  variants: {
    color: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      error: "btn-error",
      ghost: "btn-ghost",
    },
    size: {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
})

export interface IButton
  extends Omit<React.ComponentPropsWithRef<"button">, "color">, VariantProps<typeof variants> {}

export const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({ className, color, size, ...props }, ref) => {
    return <button ref={ref} className={variants({ color, size, className })} {...props} />
  }
)

Button.displayName = "Button"
