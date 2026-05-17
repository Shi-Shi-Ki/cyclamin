"use client"

import * as React from "react"
import { Button } from "@repo/ui/atoms/Button"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import { Container } from "@repo/ui/organisms/Container"
import Link from "next/link"
import { CurriculumBuilder } from "./_components/SortableLectureList"

export default function CourseBuilderPage() {
  return (
    // ★ 修正ポイント1: Containerの幅を、カリキュラム部分と同じ `max-w-4xl` に統一します
    <Container className="max-w-6xl py-8 md:py-10">
      {/* ==========================================
          ページヘッダー（保存ボタンなどのライン）
          ★ 修正ポイント2: 背景色や枠線を外し、下のコンテンツと余白(mb-10)で区切ります
      ========================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          {/* 左端をテキストとピッタリ合わせるために -ml-2 を微調整で入れています */}
          <Link href="/courses">
            <Button color="ghost" size="sm" className="btn-square -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl leading-tight">【年次】コンプライアンス研修</h1>
            <span className="text-xs text-base-content/60 mt-1">ステータス: 下書き (未公開)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button color="ghost" size="sm" className="text-error hover:bg-error/10 mr-4">
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

      {/* ==========================================
          カリキュラム構築部分
          ★ 修正ポイント3: 外側で幅を制限したため、ここにあった max-w-4xl mx-auto は外しました
      ========================================== */}
      <div className="pb-32">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold">カリキュラム構築</h2>
            <p className="text-sm text-base-content/70 mt-1">
              セクション（章）とレクチャーを組み合わせてコースを作成します。
            </p>
          </div>
          <Button size="sm" className="bg-primary/10 text-primary border-none hover:bg-primary/20">
            <Plus className="w-4 h-4 mr-1" /> セクションを追加
          </Button>
        </div>

        <CurriculumBuilder />
      </div>
    </Container>
  )
}
