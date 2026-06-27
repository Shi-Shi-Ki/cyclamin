"use client"

import { forwardRef, Ref } from "react"
import { cva, type VariantProps } from "class-variance-authority"

export interface ITextInput
  extends
    Omit<React.ComponentPropsWithRef<"input">, "color" | "size">,
    VariantProps<typeof variants> {
  hintText?: React.ReactNode
  errorMessage?: string
}

const variants = cva("input", {
  variants: {
    color: {
      primary: "input-primary",
      secondary: "input-secondary",
      accent: "input-accent",
      error: "input-error",
      ghost: "input-ghost",
      neutral: "input-neutral",
    },
    size: {
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
})

export const TextInput = forwardRef<HTMLInputElement, ITextInput>(
  ({ hintText, errorMessage, className, color, size, ...props }, ref: Ref<HTMLInputElement>) => {
    // 2. エラーメッセージがある場合は、強制的に color を "error" に上書きする小技
    const resolvedColor = errorMessage ? "error" : color

    return (
      <fieldset className="fieldset">
        {hintText && <legend className="fieldset-legend">{hintText}</legend>}
        <input
          ref={ref}
          // 3. せっかく作った variants 関数に、色とサイズと外部からの className を渡す
          className={variants({ color: resolvedColor, size, className })}
          // 4. color と size が抜けた純粋な HTML 属性だけが ...props として展開される
          {...props}
        />
      </fieldset>
    )
  }
)

TextInput.displayName = TextInput.name
