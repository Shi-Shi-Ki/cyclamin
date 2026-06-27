"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  BookOpen,
  LayoutDashboard,
  Settings,
  Users,
  MessageCircleMore,
} from "lucide-react"
import { ThemeToggle } from "@repo/ui"

// ★ メニューを配列化しておくと、管理が劇的にラクになります
const MENU_ITEMS = [
  { href: "/", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/courses", label: "コース管理", icon: BookOpen },
  { href: "/users", label: "受講者・グループ", icon: Users },
  { href: "/progress", label: "進捗・成績管理", icon: BarChart3 },
  { href: "/questions", label: "受講者からの質問", icon: MessageCircleMore },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  // 現在のURLパスを取得 (例: "/courses", "/courses/1/edit" など)
  const pathname = usePathname()

  // 現在のパスに該当するメニュー項目を探す
  const activeMenu = MENU_ITEMS.find((item) =>
    // トップページ ("/") は完全一致、それ以外は前方一致 (例: /courses/1/edit もコース管理とみなす)
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  )

  // 該当するメニューがない場合（想定外のページ等）のデフォルトタイトル
  const headerTitle = activeMenu?.label || "管理画面"

  return (
    <div className="flex h-screen overflow-hidden bg-base-200/50">
      {/* --- 左サイドバー --- */}
      <aside className="w-64 bg-base-100 border-r border-base-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-base-200 font-bold text-xl">
          LMS <span className="text-primary ml-1">Admin</span>
        </div>
        <div className="flex-1 p-4">
          <ul className="menu w-full gap-1 font-medium">
            {/* 配列をループさせてメニューを描画 */}
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon
              // アクティブ状態の判定
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive ? "active bg-base-200 text-base-content font-bold" : ""}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "opacity-70"}`} />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="p-4 border-t border-base-200">
          <ul className="menu w-full gap-1">
            <li>
              <a>
                <Settings className="w-5 h-5 opacity-70" /> システム設定
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* --- メインコンテンツ --- */}
      <main className="flex-1 overflow-y-auto">
        {/* ページヘッダー */}
        <header className="h-16 bg-base-100 border-b border-base-200 flex items-center justify-between px-8 sticky top-0 z-20">
          {/* ★ ここで動的にタイトルを切り替えます */}
          <h1 className="text-xl font-bold">{headerTitle}</h1>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="btn btn-ghost btn-circle btn-sm relative">
              <Bell className="w-5 h-5" />
              <span className="badge badge-error badge-xs absolute top-1 right-1"></span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">管理者ユーザー</span>
              <div className="avatar">
                <div className="w-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 各ページの中身 */}
        {children}
      </main>
    </div>
  )
}
