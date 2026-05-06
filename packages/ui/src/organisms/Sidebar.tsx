"use client"

import * as React from "react"
import { Home, BookOpen, Award, FileText } from "lucide-react"

export const Sidebar = () => {
  return (
    // bg-base-100 で背景色を設定し、w-80 でサイドバーの幅を固定します
    <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content flex flex-col gap-2">
      <li className="menu-title text-lg font-bold pb-4">学習メニュー</li>

      <li>
        <a>
          <Home className="w-5 h-5" /> ダッシュボード
        </a>
      </li>
      <li>
        <a>
          <BookOpen className="w-5 h-5" /> すべてのコース
        </a>
      </li>
      <li>
        <a>
          <Award className="w-5 h-5" /> 取得した資格
        </a>
      </li>
      <li>
        <a>
          <FileText className="w-5 h-5" /> テスト結果一覧
        </a>
      </li>

      {/* 下部に余白を持たせて配置したい要素があれば、mt-autoを使います */}
      <li className="mt-auto">
        <a>ヘルプ・お問い合わせ</a>
      </li>
    </ul>
  )
}
