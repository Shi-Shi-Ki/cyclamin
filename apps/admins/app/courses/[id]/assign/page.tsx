"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@repo/ui/atoms/Button"
import { Badge } from "@repo/ui/atoms/Badge"
import { ArrowLeft, Save, Users, Search, Building2, User, X, Check, Plus } from "lucide-react"
import Container from "@repo/ui/organisms/Container"

export default function CourseBuilderPage() {
  // アサイン画面内の「部署で探す」か「個人で探す」かのタブ状態
  const [searchMode, setSearchMode] = useState("group")

  return (
    <Container className="max-w-6xl py-8 md:py-10">
      {/* ==========================================
          トップヘッダー
      ========================================== */}
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

      {/* ==========================================
          メインワークスペース
      ========================================== */}
      <div className="flex flex-1 overflow-hidden">
        {/* --- 右カラム：受講者アサイン領域 --- */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative">
          <div className="max-w-6xl mx-auto">
            {/* ページタイトルとサマリー */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold">受講者アサイン</h2>
                <p className="text-sm text-base-content/70 mt-1">
                  この研修を配信する対象（部署・グループ・個人）を設定します。
                </p>
              </div>

              {/* 合計人数のリアルタイムサマリー（安心感を与えるUX） */}
              <div className="bg-primary/10 text-primary px-5 py-3 rounded-xl border border-primary/20 flex items-center gap-3">
                <Users className="w-6 h-6" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold opacity-80">現在のアサイン対象</span>
                  <span className="text-lg font-bold leading-none">約 1,245 名</span>
                </div>
              </div>
            </div>

            {/* ショッピングカート型（左右分割）レイアウト */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* ==============================================
                  左パネル：対象を探して「追加」するエリア
              ============================================== */}
              <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden flex flex-col h-[600px]">
                {/* タブ切り替え（部署 vs 個人） */}
                <div className="flex border-b border-base-200 bg-base-200/30">
                  <button
                    onClick={() => setSearchMode("group")}
                    className={`flex-1 py-3 text-sm font-bold flex justify-center items-center gap-2 border-b-2 transition-colors ${searchMode === "group" ? "border-primary text-primary bg-base-100" : "border-transparent text-base-content/60 hover:bg-base-200"}`}
                  >
                    <Building2 className="w-4 h-4" /> 部署・グループで追加
                  </button>
                  <button
                    onClick={() => setSearchMode("individual")}
                    className={`flex-1 py-3 text-sm font-bold flex justify-center items-center gap-2 border-b-2 transition-colors ${searchMode === "individual" ? "border-primary text-primary bg-base-100" : "border-transparent text-base-content/60 hover:bg-base-200"}`}
                  >
                    <User className="w-4 h-4" /> 個別ユーザーで追加
                  </button>
                </div>

                {/* 検索・フィルターバー */}
                <div className="p-4 border-b border-base-200">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                    <input
                      type="text"
                      placeholder={
                        searchMode === "group" ? "部署名で検索..." : "氏名・メールアドレスで検索..."
                      }
                      className="input input-sm input-bordered w-full pl-9 bg-base-100"
                    />
                  </div>
                  {searchMode === "individual" && (
                    <div className="mt-2 flex gap-2">
                      <select className="select select-sm select-bordered flex-1 text-xs">
                        <option>すべての部署</option>
                        <option>営業本部</option>
                        <option>開発本部</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* リスト表示領域（スクロール） */}
                <div className="flex-1 overflow-y-auto p-2">
                  {/* --- 部署モードのリスト表示 --- */}
                  {searchMode === "group" && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between p-3 hover:bg-base-200/50 rounded-lg group">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-base-content/40" />
                          <div>
                            <div className="font-bold text-sm">全社（すべての社員）</div>
                            <div className="text-xs text-base-content/50">約 5,200名</div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          color="ghost"
                          className="text-primary border border-primary hover:bg-primary hover:text-white"
                        >
                          <Plus className="w-4 h-4 mr-1" /> 追加
                        </Button>
                      </div>

                      {/* 追加済みの状態 */}
                      <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-bold text-sm">営業本部</div>
                            <div className="text-xs text-base-content/50">約 850名</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Check className="w-4 h-4" /> 追加済み
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 hover:bg-base-200/50 rounded-lg group">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-base-content/40" />
                          <div>
                            <div className="font-bold text-sm">開発本部</div>
                            <div className="text-xs text-base-content/50">約 400名</div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          color="ghost"
                          className="text-primary border border-primary hover:bg-primary hover:text-white"
                        >
                          <Plus className="w-4 h-4 mr-1" /> 追加
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* --- 個人モードのリスト表示 --- */}
                  {searchMode === "individual" && (
                    <div className="flex flex-col gap-1">
                      {/* 追加済みの状態 */}
                      <div className="flex items-center justify-between p-2 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="w-8 rounded-full bg-primary text-primary-content text-xs">
                              鈴
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">鈴木 一郎</div>
                            <div className="text-xs text-base-content/50">営業本部 第1営業部</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-primary flex items-center gap-1 px-2">
                          <Check className="w-4 h-4" /> 追加済み
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 hover:bg-base-200/50 rounded-lg group">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="w-8 rounded-full bg-neutral text-neutral-content text-xs">
                              佐
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">佐藤 花子</div>
                            <div className="text-xs text-base-content/50">営業本部 第2営業部</div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          color="ghost"
                          className="text-primary border border-primary hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          追加
                        </Button>
                      </div>

                      {/* 5000人いるので、検索しないと出てこない旨を表示するのもUXです */}
                      <div className="p-8 text-center text-sm text-base-content/50">
                        該当者が多いため、氏名で検索してください。
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ==============================================
                  右パネル：追加された対象の一覧（カートの中身）
              ============================================== */}
              <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden flex flex-col h-[600px]">
                <div className="p-4 border-b border-base-200 bg-base-200/20 flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" /> アサイン確定リスト
                  </h3>
                  <Button size="sm" color="ghost" className="text-error text-xs">
                    すべてクリア
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                  {/* 部署・グループのアサイン一覧 */}
                  <div>
                    <h4 className="text-xs font-bold text-base-content/60 mb-3 flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> 選択中の部署・グループ
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="badge-lg bg-base-200 border-base-300 gap-2 py-4 pl-3 pr-1">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-base-content/70">営業本部</span>
                        <button className="btn btn-xs btn-circle btn-ghost text-base-content/50 hover:bg-base-300 hover:text-error ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                      <Badge className="badge-lg bg-base-200 border-base-300 gap-2 py-4 pl-3 pr-1">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-base-content/70">経営企画室</span>
                        <button className="btn btn-xs btn-circle btn-ghost text-base-content/50 hover:bg-base-300 hover:text-error ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    </div>
                  </div>

                  <div className="divider my-0"></div>

                  {/* 個別ユーザーのアサイン一覧 */}
                  <div>
                    <h4 className="text-xs font-bold text-base-content/60 mb-3 flex items-center gap-1">
                      <User className="w-3 h-3" /> 選択中の個別ユーザー
                    </h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between p-2 bg-base-200/50 rounded-lg border border-base-200">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="w-6 rounded-full bg-neutral text-neutral-content text-[10px]">
                              鈴
                            </div>
                          </div>
                          <span className="text-sm font-medium">鈴木 一郎</span>
                        </div>
                        <button className="btn btn-xs btn-square btn-ghost text-base-content/50 hover:text-error">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-base-200/50 rounded-lg border border-base-200">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="w-6 rounded-full bg-neutral text-neutral-content text-[10px]">
                              山
                            </div>
                          </div>
                          <span className="text-sm font-medium">山田 太郎</span>
                        </div>
                        <button className="btn btn-xs btn-square btn-ghost text-base-content/50 hover:text-error">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Container>
  )
}
