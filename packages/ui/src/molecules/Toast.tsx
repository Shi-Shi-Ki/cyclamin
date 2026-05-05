"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("toast", {
  variants: {
    vertical: {
      top: "toast-top",
      middle: "toast-middle",
      bottom: "toast-bottom",
    },
    horizontal: {
      start: "toast-start",
      center: "toast-center",
      end: "toast-end",
    },
  },
  defaultVariants: {
    vertical: "bottom",
    horizontal: "end",
  },
})

export interface IToast
  extends Omit<React.ComponentPropsWithRef<"div">, "color">, VariantProps<typeof variants> {}

export const Toast = React.forwardRef<HTMLDivElement, IToast>(
  ({ className, vertical, horizontal, ...props }, ref) => {
    return <div ref={ref} className={variants({ vertical, horizontal, className })} {...props} />
  }
)

Toast.displayName = "Toast"

export default Toast
