"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("progress", {
  variants: {
    color: {
      primary: "progress-primary",
      secondary: "progress-secondary",
      accent: "progress-accent",
      success: "progress-success",
      warning: "progress-warning",
      error: "progress-error",
      ghost: "progress-ghost",
    },
  },
  defaultVariants: {
    color: "primary",
  },
})

export interface IProgress
  extends Omit<React.ComponentPropsWithRef<"progress">, "color">, VariantProps<typeof variants> {
  value: number
  max: number
}

export const Progress = React.forwardRef<HTMLProgressElement, IProgress>(
  ({ className, color, value, max, ...props }, ref) => {
    return (
      <progress
        ref={ref}
        value={value}
        max={max}
        className={variants({ color, className })}
        {...props}
      />
    )
  }
)

Progress.displayName = "Progress"
