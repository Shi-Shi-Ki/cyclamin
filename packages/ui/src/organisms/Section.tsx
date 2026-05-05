"use client"

import { forwardRef } from "react"
import { cn } from "../../../common/util"

export type ISection = React.HTMLAttributes<HTMLElement>

export const Section = forwardRef<HTMLElement, ISection>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        // スマホでは上下幅を小さく、PCでは大きくするルールを一元管理
        className={cn("py-8 md:py-12", className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)
Section.displayName = "Section"

export default Section
