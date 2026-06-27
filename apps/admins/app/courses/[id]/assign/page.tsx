"use client"

import * as React from "react"
import { Button, Container } from "@repo/ui"
import { ArrowLeft, Save } from "lucide-react"
import { CourseAssignManager } from "./_components/CourseAssignManager"

export default function CourseBuilderPage() {
  return (
    <Container className="max-w-6xl py-8 md:py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <Button color="ghost" size="sm" className="btn-square">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg leading-tight">【年次】コンプライアンス研修</h1>
            <span className="text-xs text-base-content/60">ステータス: 下書き (未公開)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button color="ghost" className="text-primary">
            プレビュー
          </Button>
          <Button className="bg-primary/10 text-primary border-none hover:bg-primary/20">
            <Save className="w-4 h-4 mr-2" /> 下書き保存
          </Button>
          <Button color="primary">公開設定へ進む</Button>
        </div>
      </div>

      {/* アサイン機能の本体 */}
      <CourseAssignManager />
    </Container>
  )
}
