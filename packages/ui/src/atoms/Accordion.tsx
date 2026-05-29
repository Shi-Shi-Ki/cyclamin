"use client"

import * as React from "react"
import { cn } from "../../../common/src/util"

export interface IAccordion extends React.ComponentPropsWithRef<"details"> {
  summary: React.ReactNode
}

export const Accordion = React.forwardRef<HTMLDetailsElement, IAccordion>(
  ({ className, children, summary, ...props }, ref) => {
    return (
      <details
        ref={ref}
        className={cn("collapse collapse-arrow bg-base-100 border border-base-200", className)}
        {...props}
      >
        <summary className="collapse-title text-lg font-semibold flex items-center">
          {summary}
        </summary>
        <div className="collapse-content">{children}</div>
      </details>
    )
  }
)

Accordion.displayName = "Accordion"
