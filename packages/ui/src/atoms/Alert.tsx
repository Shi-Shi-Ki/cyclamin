"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("alert", {
  variants: {
    color: {
      info: "alert-info",
      success: "alert-success",
      warning: "alert-warning",
      error: "alert-error",
      ghost: "alert-ghost",
    },
  },
  defaultVariants: {
    color: "info",
  },
})

export interface IAlert
  extends Omit<React.ComponentPropsWithRef<"div">, "color">, VariantProps<typeof variants> {}

export const Alert = React.forwardRef<HTMLDivElement, IAlert>(
  ({ className, color, children, ...props }, ref) => {
    return (
      <div ref={ref} className={variants({ color, className })} {...props}>
        <span>{children}</span>
      </div>
    )
  }
)

Alert.displayName = "Alert"
