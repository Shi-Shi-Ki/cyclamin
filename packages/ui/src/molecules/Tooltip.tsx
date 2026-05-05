"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("tooltip", {
  variants: {
    color: {
      primary: "tooltip-primary",
      secondary: "tooltip-secondary",
      accent: "tooltip-accent",
      error: "tooltip-error",
      ghost: "tooltip-ghost",
    },
    location: {
      top: "tooltip-top",
      bottom: "tooltip-bottom",
      left: "tooltip-left",
      right: "tooltip-right",
    },
  },
  defaultVariants: {
    color: "ghost",
    location: "top",
  },
})

export interface ITooltip
  extends Omit<React.ComponentPropsWithRef<"div">, "color">, VariantProps<typeof variants> {}

export const Tooltip = React.forwardRef<HTMLDivElement, ITooltip>(
  ({ className, location, color, ...props }, ref) => {
    return <div ref={ref} className={variants({ color, location, className })} {...props} />
  }
)

Tooltip.displayName = "Tooltip"

export default Tooltip
