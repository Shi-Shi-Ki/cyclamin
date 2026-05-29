"use client"

import * as React from "react"
import { useState } from "react"
import { Button, Badge, Container } from "@repo/ui"
import {
  Search,
  Filter,
  Clock,
  ExternalLink,
  AlertCircle,
  Check,
  MessageCircleMore,
} from "lucide-react"

export default function QuestionsPage() {
  // 左側のリストで選択されている質問のIDを管理
  const [selectedId, setSelectedId] = useState(1)

  return (
    <Container className="max-w-7xl py-8 h-[calc(100vh-64px)] flex flex-col">
      {/* ==========================================
          ページタイトルとフィルター
      ========================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageCircleMore /> 受講者からの質問
            <Badge color="error" className="ml-2">
              3件の未回答
            </Badge>
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            コースに関する質問の確認と返信を行います。
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="質問や氏名で検索..."
              className="input input-sm input-bordered w-full sm:w-64 pl-9 bg-base-100"
            />
          </div>
          <Button size="sm" color="ghost" className="bg-base-100 border-base-200">
            <Filter className="w-4 h-4 mr-2" /> 絞り込み
          </Button>
        </div>
      </div>

      {/* ==========================================
          メインワークスペース（2ペインレイアウト）
      ========================================== */}
      <div className="flex flex-1 gap-6 min-h-0">
        {/* --- 左カラム：質問リスト（受信トレイ） --- */}
        <div className="w-full md:w-96 bg-base-100 rounded-box shadow-sm border border-base-200 flex flex-col overflow-hidden shrink-0">
          <div className="p-2 border-b border-base-200 bg-base-200/30 flex gap-1 shrink-0">
            <button className="btn btn-sm btn-ghost flex-1 text-primary bg-primary/10">
              未回答 (3)
            </button>
            <button className="btn btn-sm btn-ghost flex-1 text-base-content/60">解決済み</button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* 質問リストアイテム 1 (選択中) */}
            <div
              onClick={() => setSelectedId(1)}
              className={`p-4 border-b border-base-200 cursor-pointer transition-colors ${selectedId === 1 ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-base-200/50 border-l-4 border-l-transparent"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="w-6 rounded-full bg-warning text-warning-content text-[10px]">
                      山
                    </div>
                  </div>
                  <span className="font-bold text-sm">山田 太郎</span>
                </div>
                <span className="text-xs text-base-content/50 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 10分前
                </span>
              </div>
              <h3 className="text-sm font-bold mb-1 truncate">ハロー効果の具体例について</h3>
              <p className="text-xs text-base-content/60 line-clamp-2">
                動画の3:45あたりで説明されている「ハロー効果」について質問です。営業成績が良いからといって...
              </p>
              <div className="mt-2 text-[10px] text-primary font-medium bg-primary/10 inline-block px-2 py-0.5 rounded">
                【年次】コンプライアンス研修
              </div>
            </div>

            {/* 質問リストアイテム 2 */}
            <div
              onClick={() => setSelectedId(2)}
              className={`p-4 border-b border-base-200 cursor-pointer transition-colors ${selectedId === 2 ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-base-200/50 border-l-4 border-l-transparent"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="w-6 rounded-full bg-neutral text-neutral-content text-[10px]">
                      佐
                    </div>
                  </div>
                  <span className="font-bold text-sm">佐藤 花子</span>
                </div>
                <span className="text-xs text-base-content/50 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 2時間前
                </span>
              </div>
              <h3 className="text-sm font-bold mb-1 truncate">テストの第3問が分かりません</h3>
              <p className="text-xs text-base-content/60 line-clamp-2">
                資料PDFも確認したのですが、第3問の選択肢BとCの違いがよく理解できませんでした。
              </p>
              <div className="mt-2 text-[10px] text-primary font-medium bg-primary/10 inline-block px-2 py-0.5 rounded">
                新任マネージャー向け 基礎講座
              </div>
            </div>

            {/* 質問リストアイテム 3 */}
            <div
              onClick={() => setSelectedId(3)}
              className={`p-4 border-b border-base-200 cursor-pointer transition-colors ${selectedId === 3 ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-base-200/50 border-l-4 border-l-transparent"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="w-6 rounded-full bg-neutral text-neutral-content text-[10px]">
                      伊
                    </div>
                  </div>
                  <span className="font-bold text-sm">伊藤 次郎</span>
                </div>
                <span className="text-xs text-base-content/50 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 昨日
                </span>
              </div>
              <h3 className="text-sm font-bold mb-1 truncate">動画が再生されません</h3>
              <p className="text-xs text-base-content/60 line-clamp-2">
                社内ネットワークから接続していますが、STEP2の動画だけがローディングのまま動きません。
              </p>
              <div className="mt-2 text-[10px] text-primary font-medium bg-primary/10 inline-block px-2 py-0.5 rounded">
                情報セキュリティ基礎
              </div>
            </div>
          </div>
        </div>

        {/* --- 右カラム：質問詳細と返信フォーム --- */}
        <div className="flex-1 bg-base-100 rounded-box shadow-sm border border-base-200 flex flex-col overflow-hidden min-w-0 hidden md:flex">
          {/* 詳細のヘッダー（コンテキスト情報） */}
          <div className="p-5 border-b border-base-200 bg-base-100 shrink-0">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mb-2">ハロー効果の具体例について</h2>
                <div className="flex items-center gap-4 text-sm text-base-content/70">
                  <span className="flex items-center gap-1 font-medium text-primary">
                    <ExternalLink className="w-4 h-4" /> 【年次】コンプライアンス研修
                  </span>
                  <span>レクチャー: STEP0. 評価制度理解</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  color="warning"
                  className="badge-sm bg-warning/20 text-warning-content border-none"
                >
                  未回答
                </Badge>
              </div>
            </div>
          </div>

          {/* チャット履歴エリア（DaisyUIのchatコンポーネント活用） */}
          <div className="flex-1 overflow-y-auto p-6 bg-base-200/30">
            {/* 受講者からの質問内容 */}
            <div className="chat chat-start mb-4">
              <div className="chat-image avatar placeholder">
                <div className="w-10 rounded-full bg-warning text-warning-content">山</div>
              </div>
              <div className="chat-header text-xs opacity-60 mb-1">
                山田 太郎 <time>今日 10:24</time>
              </div>
              {/* 長文でも読みやすいように、吹き出しにプロース(文章)スタイルを当てる */}
              <div className="chat-bubble chat-bubble-secondary text-secondary-content text-sm leading-relaxed max-w-[80%]">
                お疲れ様です。
                <br />
                <br />
                動画の3:45あたりで説明されている「ハロー効果」について質問です。
                <br />
                「営業成績が良いからといって、協調性も高いと錯覚してしまう」という例がありましたが、これ以外に、評価者が無意識にやってしまいがちなハロー効果の典型例はありますでしょうか？
                <br />
                <br />
                次回の評価面談の参考にしたいと考えています。よろしくお願いいたします。
              </div>
            </div>

            {/* （もし過去にやり取りがあればここに chat-end で管理者の返信が並びます） */}
          </div>

          {/* 返信入力フォーム */}
          <div className="p-4 border-t border-base-200 bg-base-100 shrink-0">
            <div className="flex flex-col gap-3">
              <textarea
                className="textarea textarea-bordered w-full h-32 text-base resize-none"
                placeholder="山田 太郎さんへ返信を入力..."
              ></textarea>
              <div className="flex justify-between items-center">
                <span className="text-xs text-base-content/50 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  返信は受講者のSlackにも通知されます。
                </span>
                <div className="flex gap-2">
                  {/* 返信だけしてステータスを未解決のままにするボタン */}
                  <Button
                    color="ghost"
                    className="text-primary border border-primary hover:bg-primary hover:text-white"
                  >
                    返信のみ
                  </Button>
                  {/* 返信と同時に「解決済み」にするボタン（よく使われる） */}
                  <Button color="primary">
                    <Check className="w-4 h-4 mr-1" /> 返信して解決済みにする
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
