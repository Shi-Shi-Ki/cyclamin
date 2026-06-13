import * as React from "react"
import { Container } from "@repo/ui"
import { AlertSections } from "./_components/AlertSections"
import { OngoingCourses } from "./_components/OngoingCourses"
import { QuickActions } from "./_components/QuickActions"
import { RecentActivities } from "./_components/RecentActivities"

export default function AdminDashboardPage() {
  return (
    <Container className="max-w-6xl py-8">
      {/* 1. 重要アラートセクション（最上部） */}
      <AlertSections />

      {/* 3. 2カラムレイアウト（左：進行中のコース、右：クイックアクション） */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左側：進行中のメインコース (2カラム分使用) */}
        <OngoingCourses />

        {/* 右側：クイックアクション・最近のアクティビティ */}
        <div className="flex flex-col gap-6">
          {/* クイックアクション */}
          <QuickActions />

          {/* 最近のアクティビティ（簡易ログ） */}
          <RecentActivities />
        </div>
      </div>
    </Container>
  )
}
