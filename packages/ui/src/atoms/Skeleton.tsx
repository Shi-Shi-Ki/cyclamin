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

export interface ISkelton
  extends Omit<React.ComponentPropsWithRef<"div">, "color">, VariantProps<typeof variants> {}

export const Skelton = React.forwardRef<HTMLDivElement, ISkelton>(
  ({ className, type, ...props }, ref) => {
    return <div ref={ref} className={variants({ type, className })} {...props} />
  }
)

Skelton.displayName = "Skelton"

export default Skelton
