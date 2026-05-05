"use client"

import { forwardRef, Ref } from "react"
import { cva, type VariantProps } from "class-variance-authority"

interface ITextArea
  extends
    Omit<React.ComponentPropsWithRef<"textarea">, "color" | "size">,
    VariantProps<typeof variants> {
  hintText?: string
  errorMessage?: string
}

const variants = cva("textarea", {
  variants: {
    color: {
      primary: "textarea-primary",
      secondary: "textarea-secondary",
      accent: "textarea-accent",
      error: "textarea-error",
      ghost: "textarea-ghost",
    },
    size: {
      sm: "textarea-sm",
      md: "textarea-md",
      lg: "textarea-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
})

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
  ({ hintText, errorMessage, className, color, size, ...props }, ref: Ref<HTMLTextAreaElement>) => {
    const resolvedColor = errorMessage ? "error" : color

    return (
      <fieldset className="fieldset">
        {hintText && <legend className="fieldset-legend">{hintText}</legend>}
        <textarea
          ref={ref}
          className={variants({ color: resolvedColor, size, className })}
          {...props}
        />
        {errorMessage ? (
          <p className="label text-error">{errorMessage}</p>
        ) : (
          <p className="label">&nbsp;</p>
        )}
      </fieldset>
    )
  }
)

TextArea.displayName = TextArea.name

export default TextArea
