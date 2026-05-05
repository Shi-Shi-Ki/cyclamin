"use client"

import { forwardRef } from "react"
import { cn } from "../../../common/util"

export type IContainer = React.HTMLAttributes<HTMLElement>

export const Container = forwardRef<HTMLDivElement, IContainer>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        // 画面の中央寄せ、最大幅の固定、スマホ〜PCでの左右余白をここで一元管理
        className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = "Container"

export default Container
