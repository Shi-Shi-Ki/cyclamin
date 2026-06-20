"use client"

import * as React from "react"
import { useState } from "react" // ★ 追加
import { Button, Container, useConfirmModal } from "@repo/ui" // ★ useConfirmModal を追加
import { ArrowLeft, Save, Plus, Trash2, Asterisk } from "lucide-react" // ★ Asterisk を追加
import Link from "next/link"
import { CurriculumBuilder } from "./_components/curriculumBuilder/CurriculumBuilder"
import { Section } from "./_components/types/schema"

const INITIAL_SECTIONS: Section[] = [
  {
    id: "sec-1",
    title: "第1章：評価制度について",
    lectures: [
      { id: "lec-1", title: "STEP0. 評価制度理解（動画）", type: "video", typeLabel: "動画のみ" },
      {
        id: "lec-2",
        title: "理解度テスト（全5問）",
        type: "test",
        typeLabel: "テスト / アンケート",
      },
    ],
  },
  {
    id: "sec-2",
    title: "第2章：マネージャーの役割",
    lectures: [
      { id: "lec-3", title: "STEP1. 目標設定の基本", type: "mixed", typeLabel: "動画 + テスト" },
    ],
  },
]

export default function CourseBuilderPage() {
  const { showConfirm } = useConfirmModal() // ★ 確認モーダルフック

  // ★ ポイント1: カリキュラム全体の状態を親に持たせる
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS)
  // 新しいIDを生成するためのカウンター（モック用）
  const [nextId, setNextId] = useState(3)

  // コース全体の削除処理
  const handleDeleteCourse = () => {
    showConfirm(
      "コースの削除",
      "本当にこのコースを削除しますか？\nコース内のセクションやレクチャー、設問データもすべて削除されます。",
      () => {
        // todo: API呼び出し
        console.log("コースを削除しました")
        alert("コースを削除しました。")
      }
    )
  }

  // ★ ポイント2: セクション追加処理
  const handleAddSection = () => {
    const newSection: Section = {
      id: `sec-new-${nextId}`,
      title: "", // 最初は空タイトル
      lectures: [],
    }
    setSections((prev) => [...prev, newSection])
    setNextId((prev) => prev + 1)
  }

  return (
    <Container className="max-w-6xl py-8 md:py-10">
      {/* ページヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-base-200 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/courses">
            <Button color="ghost" size="sm" className="btn-square -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl leading-tight">【年次】コンプライアンス研修</h1>
            <span className="text-xs text-base-content/60 mt-1">ステータス: 下書き (未公開)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* ★ コースを削除ボタンにアクションを紐付け */}
          <Button
            color="ghost"
            size="sm"
            className="text-error hover:bg-error/10 mr-4"
            onClick={handleDeleteCourse}
          >
            <Trash2 className="w-4 h-4 mr-1.5" /> コースを削除
          </Button>
          <Link href="/courses/999/preview">
            <Button color="ghost" className="text-primary">
              プレビュー
            </Button>
          </Link>
          <Button className="bg-primary/10 text-primary border-none hover:bg-primary/20">
            <Save className="w-4 h-4 mr-2" /> 下書き保存
          </Button>
          <Button color="primary">公開設定へ進む</Button>
        </div>
      </div>

      <div className="pb-32">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-3xl font-bold">カリキュラム構築</h2>
            <p className="text-sm text-base-content/70 mt-1">
              セクション（章）とレクチャーを組み合わせてコースを作成します。
            </p>
          </div>
          {/* ★ セクションを追加ボタンにアクションを紐付け */}
          <Button
            size="sm"
            className="bg-primary/10 text-primary border-none hover:bg-primary/20"
            onClick={handleAddSection}
          >
            <Plus className="w-4 h-4 mr-1" /> セクションを追加
          </Button>
        </div>

        {/* ★ sections と setSections（または同等の更新関数）を渡す */}
        <CurriculumBuilder sections={sections} setSections={setSections} />
      </div>
    </Container>
  )
}
