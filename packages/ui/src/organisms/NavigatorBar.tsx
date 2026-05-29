"use client"

import { Menu, Bell, User, Settings, LogOut } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export const NavigatorBar = () => {
  return (
    // bg-base-100: 背景色 / border-b: 下線 / sticky top-0: スクロールしても上部に追従
    <header className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-50">
      {/* --- 左側（ハンバーガーメニューとロゴ） --- */}
      <div className="navbar-start">
        <label
          htmlFor="app-drawer"
          className="btn btn-ghost btn-square drawer-button"
          aria-label="メニューを開く"
        >
          <Menu className="w-5 h-5" />
        </label>
        {/* ロゴやシステム名（リンクにするとより実用的です） */}
        <a className="btn btn-ghost text-xl ml-2">
          LMS <span className="text-secondary ml-1">Portal</span>
        </a>
      </div>

      {/* --- 中央（今回は空ですが、検索窓などを置くのによく使います） --- */}
      <div className="navbar-center hidden lg:flex">{/* 必要に応じて何か配置できます */}</div>

      {/* --- 右側（各種アクション） --- */}
      <div className="navbar-end gap-1 sm:gap-2">
        {/* テーマ切り替えボタン */}
        <ThemeToggle />

        {/* お知らせ（ドロップダウン） */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-square relative">
            <Bell className="w-5 h-5" />
            <span className="badge badge-xs badge-error absolute top-2 right-2"></span>
          </label>
          {/* ドロップダウンの中身 */}
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64 border border-base-200 mt-4"
          >
            <li className="menu-title">お知らせ</li>
            <li>
              <a>新しい研修が割り当てられました</a>
            </li>
            <li>
              <a>システムメンテナンスのお知らせ</a>
            </li>
          </ul>
        </div>

        {/* ユーザープロフィール（ドロップダウン） */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-square">
            <User className="w-5 h-5" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-200 mt-4"
          >
            <li>
              <a>
                <User className="w-4 h-4" /> マイプロフィール
              </a>
            </li>
            <li>
              <a>
                <Settings className="w-4 h-4" /> 設定
              </a>
            </li>
            <div className="divider my-0"></div>
            <li>
              <a className="text-error">
                <LogOut className="w-4 h-4" /> ログアウト
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

NavigatorBar.displayName = "NavigatorBar"
