"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

// ==========================================
// 1. Card (外枠のコンテナ)
// DaisyUIの .card-bordered や .card-side (横並び) を管理
// ==========================================
const cardVariants = cva("card bg-base-100", {
  variants: {
    variant: {
      default: "shadow-xl",
      bordered: "card-bordered",
      flat: "shadow-sm border border-base-200",
    },
    layout: {
      normal: "",
      compact: "card-compact", // 余白が狭くなる
      side: "card-side", // 画像とテキストが横並びになる
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
    <div ref={ref} className={cardVariants({ variant, layout, className })} {...props} />
  )
)
Card.displayName = "Card"

// ==========================================
// 2. CardFigure (画像のラッパー)
// ==========================================
export const CardFigure = React.forwardRef<HTMLElement, React.ComponentPropsWithRef<"figure">>(
  ({ className, ...props }, ref) => <figure ref={ref} className={className} {...props} />
)
CardFigure.displayName = "CardFigure"

// ==========================================
// 3. CardBody (テキストエリアの余白管理)
// ==========================================
export const CardBody = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cva("card-body")({ className })} {...props} />
  )
)
CardBody.displayName = "CardBody"

// ==========================================
// 4. CardTitle (タイトルのスタイル管理)
// ==========================================
export const CardTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithRef<"h2">>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cva("card-title")({ className })} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

// ==========================================
// 5. CardActions (ボタンなどを置くエリア)
// ==========================================
export const CardActions = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cva("card-actions justify-end")({ className })} {...props} />
  )
)
CardActions.displayName = "CardActions"
