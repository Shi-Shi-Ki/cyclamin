"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const variants = cva("skeleton", {
  variants: {
    type: {
      text: "skeleton-text",
    },
  },
})

export interface ISkeleton
  extends Omit<React.ComponentPropsWithRef<"div">, "color">, VariantProps<typeof variants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, ISkeleton>(
  ({ className, type, ...props }, ref) => {
    return <div ref={ref} className={variants({ type, className })} {...props} />
  }
)

Skeleton.displayName = "Skeleton"
