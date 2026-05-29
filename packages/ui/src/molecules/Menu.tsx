import { cva, VariantProps } from "class-variance-authority"
import React, { forwardRef } from "react"
import { cn } from "../../../common/src/util"

const menuVariants = cva("menu", {
  variants: {
    size: {
      sm: "menu-sm",
      md: "menu-md",
      lg: "menu-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface IMenu
  extends React.ComponentPropsWithRef<"ul">, VariantProps<typeof menuVariants> {}

export interface IMenuItem extends React.ComponentPropsWithRef<"li"> {}

export const Menu = forwardRef<HTMLUListElement, IMenu>(({ className, size, ...props }, ref) => {
  return <ul ref={ref} className={cn(menuVariants({ size }), className)} {...props} />
})
Menu.displayName = "Menu"

export const MenuItem = forwardRef<HTMLLIElement, IMenuItem>(
  ({ children, className, ...props }, ref) => {
    return (
      <li ref={ref} className={className} {...props}>
        {children}
      </li>
    )
  }
)
MenuItem.displayName = "MenuItem"
