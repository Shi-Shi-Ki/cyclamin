"use client"

import * as React from "react"

export type IForm = React.ComponentPropsWithRef<"form">

export const Form = React.forwardRef<HTMLFormElement, IForm>(({ children, ...props }, ref) => {
  return (
    <form ref={ref} {...props}>
      {children}
    </form>
  )
})
Form.displayName = "Form"

export default Form
