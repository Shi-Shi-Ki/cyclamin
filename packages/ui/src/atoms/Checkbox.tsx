"use client"

import { forwardRef, Ref } from "react"
import { cva, type VariantProps } from "class-variance-authority"

interface ICheckbox
  extends
    Omit<React.ComponentPropsWithRef<"input">, "color" | "size">,
    VariantProps<typeof variants> {
  hintText?: React.ReactNode
  errorMessage?: string
}

const variants = cva("checkbox", {
  variants: {
    color: {
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      accent: "checkbox-accent",
      error: "checkbox-error",
      ghost: "checkbox-ghost",
    },
    size: {
      sm: "checkbox-sm",
      md: "checkbox-md",
      lg: "checkbox-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
})

const Checkbox = forwardRef<HTMLInputElement, ICheckbox>(
  (
    // 1. ここで color と size を props から抜き出す（分離する）
    { hintText, errorMessage, className, color, size, ...props },
    ref: Ref<HTMLInputElement>
  ) => {
    // 2. エラーメッセージがある場合は、強制的に color を "error" に上書きする小技
    const resolvedColor = errorMessage ? "error" : color

    return (
      <fieldset className="fieldset">
        {hintText && <legend className="fieldset-legend">{hintText}</legend>}
        <input
          type="checkbox"
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

Checkbox.displayName = Checkbox.name

export default Checkbox
