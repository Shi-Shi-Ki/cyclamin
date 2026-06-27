"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react" // ★ アイコンをインポート
import { Button } from "../atoms/Button"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // マウント前はレイアウトシフト（ガタつき）を防ぐため、同じサイズの透明なボタンを配置
  if (!mounted) {
    return <Button color="ghost" className="w-10 h-10 px-0 opacity-0" aria-hidden="true" />
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      onClick={toggleTheme}
      color="ghost"
      // アイコンだけのボタンにするため、横幅とパディングを調整して正方形に近づける
      className="w-10 h-10 px-0"
      aria-label="テーマの切り替え"
    >
      {/* 現在のテーマが「ダーク」なら、次はライトにするための「太陽」を表示。
        それ以外（ライトまたはシステムデフォルト）なら「月」を表示。
      */}
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </Button>
  )
}

ThemeToggle.displayName = "ThemeToggle"
