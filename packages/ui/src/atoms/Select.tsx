"use client"

import { forwardRef, Ref } from "react"
import { cva, type VariantProps } from "class-variance-authority"

interface ISelect
  extends
    Omit<React.ComponentPropsWithRef<"select">, "color" | "size">,
    VariantProps<typeof variants> {
  options: { element: string; value: string; disabled?: boolean }[]
  hintText?: React.ReactNode
  errorMessage?: string
}

const variants = cva("select", {
  variants: {
    color: {
      primary: "select-primary",
      secondary: "select-secondary",
      accent: "select-accent",
      error: "select-error",
      ghost: "select-ghost",
    },
    size: {
      sm: "select-sm",
      md: "select-md",
      lg: "select-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
})

const Select = forwardRef<HTMLSelectElement, ISelect>(
  (
    { options, hintText, errorMessage, className, color, size, ...props },
    ref: Ref<HTMLSelectElement>
  ) => {
    const resolvedColor = errorMessage ? "error" : color

    return (
      <fieldset className="fieldset">
        {hintText && <legend className="fieldset-legend">{hintText}</legend>}
        <select
          ref={ref}
          className={variants({ color: resolvedColor, size, className })}
          {...props}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option.value} disabled={option.disabled}>
              {option.element}
            </option>
          ))}
        </select>
      </fieldset>
    )
  }
)

Select.displayName = Select.name

export default Select
