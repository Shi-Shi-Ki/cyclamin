// apps/users/app/courses/player/page.tsx

"use client" // ★ タブの切り替え状態を管理するため、クライアントコンポーネントにします

import * as React from "react"
import { useState } from "react"
import { Button } from "@repo/ui/atoms/Button"
import { Badge } from "@repo/ui/atoms/Badge"
import {
  PlayCircle,
  HelpCircle,
  Send,
  List,
  FileText,
  CheckCircle2,
  CheckSquare,
} from "lucide-react"

export default function TheaterPlayerPage() {
  // 右カラムの現在アクティブなタブを管理するステート ('quiz' | 'toc' | 'material')
  const [activeTab, setActiveTab] = useState("quiz")

  return (
    <main className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-base-200">
      {/* ==========================================
          左カラム：動画エリア
      ========================================== */}
      <div className="flex-1 flex flex-col bg-black relative">
        <div className="flex-1 flex items-center justify-center relative w-full aspect-video lg:aspect-auto">
          <div className="text-center text-white/80">
            <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-80" />
            <span className="font-medium text-lg">動画プレイヤー</span>
          </div>
        </div>
        <div className="bg-base-300/10 text-white p-4 border-t border-white/10 flex justify-between items-center hidden md:flex">
          <div>
            <Badge className="bg-primary/20 text-primary border-none mb-1">STEP0</Badge>
            <h2 className="font-bold">評価制度理解</h2>
          </div>
          <div className="text-sm opacity-60">再生時間: 15:00</div>
        </div>
      </div>

      {/* ==========================================
          右カラム：タブ付きマルチエリア
      ========================================== */}
      <div className="w-full lg:w-[450px] xl:w-[500px] bg-base-100 flex-shrink-0 flex flex-col border-l border-base-200 h-full">
        {/* ★ タブヘッダー (DaisyUIのtabsクラスを使用) */}
        <div role="tablist" className="tabs tabs-bordered pt-2 px-2 bg-base-100 flex-shrink-0">
          <a
            role="tab"
            className={`tab ${activeTab === "toc" ? "tab-active font-bold text-primary" : ""}`}
            onClick={() => setActiveTab("toc")}
          >
            <List className="w-4 h-4 mr-1.5" /> 目次
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "quiz" ? "tab-active font-bold text-primary" : ""}`}
            onClick={() => setActiveTab("quiz")}
          >
            <HelpCircle className="w-4 h-4 mr-1.5" /> テスト
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "material" ? "tab-active font-bold text-primary" : ""}`}
            onClick={() => setActiveTab("material")}
          >
            <FileText className="w-4 h-4 mr-1.5" /> 資料
          </a>
        </div>

        {/* コンテンツエリア（タブに応じて表示を切り替え） */}
        <div className="overflow-y-auto flex-1 bg-base-100">
          {/* -------------------------------------
              タブ1: 目次（カリキュラム）
          ------------------------------------- */}
          {activeTab === "toc" && (
            <div className="p-4 animate-in fade-in duration-200">
              <div className="mb-4 p-2">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-bold">全体の進捗</span>
                  <span className="font-bold text-primary">1/3 完了</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={33}
                  max={100}
                ></progress>
              </div>

              <ul className="menu w-full p-0 gap-1 text-base-content">
                <li className="menu-title text-sm font-semibold mt-2">はじめに</li>
                <li>
                  <a className="flex gap-3 hover:bg-base-200">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">概要と説明</span>
                    </div>
                  </a>
                </li>

                <li className="menu-title text-sm font-semibold mt-4">第1章：評価制度について</li>
                <li>
                  <a className="flex gap-3 active bg-primary text-primary-content">
                    <PlayCircle className="w-5 h-5 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">STEP0. 評価制度理解</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="flex gap-3 hover:bg-base-200">
                    <CheckSquare className="w-5 h-5 text-base-content/30 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">理解度テスト（必須）</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* -------------------------------------
              タブ2: 理解度テスト（フォーム）
          ------------------------------------- */}
          {activeTab === "quiz" && (
            <div className="p-6 animate-in fade-in duration-200">
              <p className="text-sm text-base-content/70 mb-6">
                動画を視聴しながら、以下の設問に回答してください。
              </p>
              <form className="flex flex-col gap-6">
                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-base">
                      Q1. 評価制度の最大の目的は何ですか？ <span className="text-error">*</span>
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-20 mt-1"
                    placeholder="簡潔に記載してください"
                  ></textarea>
                </div>
                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-base">
                      Q2. 評価面談の適切な頻度は？ <span className="text-error">*</span>
                    </span>
                  </label>
                  <div className="flex flex-col gap-2 mt-1">
                    <label className="flex items-center gap-3 cursor-pointer p-3 border border-base-200 rounded-lg hover:bg-base-200/50 transition-colors">
                      <input
                        type="radio"
                        name="radio-q2"
                        className="radio radio-primary radio-sm"
                      />
                      <span className="label-text">半年に1回</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 border border-base-200 rounded-lg hover:bg-base-200/50 transition-colors">
                      <input
                        type="radio"
                        name="radio-q2"
                        className="radio radio-primary radio-sm"
                      />
                      <span className="label-text">四半期に1回</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* -------------------------------------
              タブ3: 資料ダウンロード
          ------------------------------------- */}
          {activeTab === "material" && (
            <div className="p-6 animate-in fade-in duration-200">
              <h3 className="font-bold mb-4">このセクションの参考資料</h3>
              <div className="bg-base-200 p-4 rounded-lg flex flex-col gap-3">
                <div className="flex gap-3 items-start">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">評価者向けテキスト.pdf</h4>
                    <p className="text-xs text-base-content/60 mt-1">2.4 MB</p>
                  </div>
                </div>
                <Button size="sm" color="secondary" className="w-full mt-2">
                  ダウンロード
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* テストタブが開いている時だけ「送信ボタン」を表示する制御 */}
        {activeTab === "quiz" && (
          <div className="p-4 border-t border-base-200 bg-base-50 sticky bottom-0 z-10 animate-in slide-in-from-bottom-2">
            <Button color="primary" className="w-full">
              <Send className="w-4 h-4 mr-2" /> 回答を送信して次へ
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
