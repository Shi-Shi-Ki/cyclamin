"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("status", {
  variants: {
    color: {
      primary: "status-primary",
      secondary: "status-secondary",
      accent: "status-accent",
      error: "status-error",
      ghost: "status-ghost",
    },
    size: {
      sm: "status-sm",
      md: "status-md",
      lg: "status-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
})

export interface IStatus
  extends Omit<React.ComponentPropsWithRef<"div">, "color">, VariantProps<typeof variants> {
  label: string
}

export const Status = React.forwardRef<HTMLDivElement, IStatus>(
  ({ label, className, color, size, ...props }, ref) => {
    return (
      <>
        <div ref={ref} className={variants({ color, size, className })} {...props} />
        &nbsp;{label}
      </>
    )
  }
)

Status.displayName = "Status"

export default Status
