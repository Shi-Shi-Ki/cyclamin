"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../common/src/util"

// ==========================================
// 1. Card
// ★ overflow-hidden を追加し、画像がカードの角から飛び出すのを防ぎます
// ==========================================
const cardVariants = cva("card bg-base-100 overflow-hidden", {
  variants: {
    variant: {
      default: "shadow-xl",
      bordered: "card-bordered",
      flat: "shadow-sm border border-base-200",
    },
    layout: {
      normal: "",
      compact: "card-compact",
      side: "card-side",
    },
  },
  defaultVariants: {
    variant: "default",
    layout: "normal",
  },
})

export interface ICard
  extends React.ComponentPropsWithRef<"div">, VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, ICard>(
  ({ className, variant, layout, ...props }, ref) => (
    // ★ cnを使って安全にクラスを結合する
    <div ref={ref} className={cn(cardVariants({ variant, layout }), className)} {...props} />
  )
)
Card.displayName = "Card"

// ==========================================
// 2. CardFigure
// ==========================================
export const CardFigure = React.forwardRef<HTMLElement, React.ComponentPropsWithRef<"figure">>(
  ({ className, ...props }, ref) => <figure ref={ref} className={cn("", className)} {...props} />
)
CardFigure.displayName = "CardFigure"

// ==========================================
// 3. CardBody
// ★ cva()() の書き方をやめ、cn("card-body", className) に統一
// これでPaddingが消失するバグが直ります
// ==========================================
export const CardBody = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("card-body", className)} {...props} />
  )
)
CardBody.displayName = "CardBody"

// ==========================================
// 4. CardTitle
// ==========================================
export const CardTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithRef<"h2">>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("card-title", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

// ==========================================
// 5. CardActions
// ==========================================
export const CardActions = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("card-actions justify-end", className)} {...props} />
  )
)
CardActions.displayName = "CardActions"
