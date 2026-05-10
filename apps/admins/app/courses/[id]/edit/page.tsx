"use client"

import * as React from "react"
import { Button } from "@repo/ui/atoms/Button"
import {
  ArrowLeft,
  Save,
  Video,
  FileText,
  HelpCircle,
  GripVertical,
  Plus,
  Trash2,
  Edit3,
  MonitorPlay,
} from "lucide-react"
import { Container } from "@repo/ui/organisms/Container"

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
          <Button color="ghost" size="sm" className="btn-square -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl leading-tight">【年次】コンプライアンス研修</h1>
            <span className="text-xs text-base-content/60 mt-1">ステータス: 下書き (未公開)</span>
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

        {/* --- セクション1 --- */}
        <div className="bg-base-100 rounded-box shadow-sm border border-base-200 mb-6">
          <div className="bg-base-200/50 p-4 border-b border-base-200 flex items-center justify-between group rounded-t-2xl">
            <div className="flex items-center gap-3">
              <GripVertical className="w-5 h-5 text-base-content/30 cursor-grab" />
              <span className="font-bold text-lg">第1章：評価制度について</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" color="ghost" className="btn-square">
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button size="sm" color="ghost" className="btn-square text-error">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="p-2 pb-4">
            {/* レクチャー（動画） */}
            <div className="flex items-center justify-between p-3 hover:bg-base-200/50 rounded-lg group border border-transparent hover:border-base-200 transition-colors">
              <div className="flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-base-content/20 cursor-grab" />
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <Video className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">STEP0. 評価制度理解（動画）</div>
                  <div className="text-xs text-base-content/50 mt-0.5">動画のみ</div>
                </div>
              </div>
              <div className="hidden group-hover:flex items-center gap-2">
                <Button size="sm" color="ghost">
                  編集
                </Button>
                <Button size="sm" color="ghost" className="btn-square text-error">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* レクチャー（テスト） */}
            <div className="flex items-center justify-between p-3 hover:bg-base-200/50 rounded-lg group border border-transparent hover:border-base-200 transition-colors mt-1">
              <div className="flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-base-content/20 cursor-grab" />
                <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <div className="font-medium text-sm">理解度テスト（全5問）</div>
                  <div className="text-xs text-base-content/50 mt-0.5">テスト / アンケート</div>
                </div>
              </div>

              <div className="hidden group-hover:flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-secondary/10 text-secondary border-none hover:bg-secondary/20"
                >
                  テスト問題を作成 (SurveyJS)
                </Button>
                <Button size="sm" color="ghost" className="btn-square text-error">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* レクチャー追加時のドロップダウンUX */}
            <div className="mt-3 ml-10">
              <div className="dropdown dropdown-bottom dropdown-end sm:dropdown-right sm:dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
                >
                  <Plus className="w-4 h-4 mr-1" /> レクチャーを追加
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[10] menu p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-200 mt-1"
                >
                  <li className="menu-title text-xs py-2">レイアウトタイプを選択</li>
                  <li>
                    <a className="py-3">
                      <Video className="w-4 h-4 text-primary" />
                      <div className="flex flex-col">
                        <span className="font-medium">動画のみ</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="py-3">
                      <FileText className="w-4 h-4 text-accent" />
                      <div className="flex flex-col">
                        <span className="font-medium">記事 / 説明文</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="py-3">
                      <HelpCircle className="w-4 h-4 text-secondary" />
                      <div className="flex flex-col">
                        <span className="font-medium">テスト / アンケート</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="py-3">
                      <MonitorPlay className="w-4 h-4 text-info" />
                      <div className="flex flex-col">
                        <span className="font-medium">動画 ＋ テスト</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
