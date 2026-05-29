"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
// ※ next-themes v0.3以降は import { ThemeProviderProps } from "next-themes" が使える場合がありますが、
// エラーになる場合は下記のように型をインポートします
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

ThemeProvider.displayName = "ThemeProvider"

export { useTheme } from "next-themes"
