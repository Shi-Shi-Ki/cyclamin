// apps/users/app/courses/player/page.tsx

import * as React from "react"
// ★ 以下のインポートパスはご自身の環境に合わせて調整してください
import { Container } from "@repo/ui/organisms/Container"
import { Button } from "@repo/ui/atoms/Button"
import { Badge } from "@repo/ui/atoms/Badge"
import { CheckCircle2, PlayCircle, FileText, ChevronRight, CheckSquare } from "lucide-react"

export default function CoursePlayerPage() {
  return (
    // 画面全体の背景色を設定し、上下に余白(py-8)を持たせます
    <main className="min-h-screen bg-base-200/30 py-8">
      {/* ★ Containerを復活。受講画面用に max-w-7xl を指定して幅を広めに確保します */}
      <Container className="max-w-7xl">
        {/* コンテンツ全体をラップするFlexコンテナ (md以上で横並び) */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* ==========================================
              左カラム：目次（カリキュラム）
          ========================================== */}
          <aside className="w-full md:w-80 flex-shrink-0">
            {/* 角丸のカード型にし、スクロール追従 (sticky) させます */}
            <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden sticky top-24">
              {/* 進捗エリア */}
              <div className="p-5 border-b border-base-200 bg-base-100">
                <h2 className="font-bold text-lg leading-tight">【年次】コンプライアンス研修</h2>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-base-content/60">進捗状況</span>
                  <span className="font-bold text-primary">1/3 完了</span>
                </div>
                <progress
                  className="progress progress-primary w-full mt-2"
                  value={33}
                  max={100}
                ></progress>
              </div>

              {/* メニューリスト */}
              <ul className="menu p-3 gap-1 text-base-content bg-base-100">
                <li className="menu-title text-sm font-semibold mt-1">はじめに</li>
                <li>
                  <a className="flex gap-3 hover:bg-base-200">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">概要と説明</span>
                      <span className="text-xs text-base-content/50">2分</span>
                    </div>
                  </a>
                </li>

                <li className="menu-title text-sm font-semibold mt-4">第1章：評価制度について</li>
                <li>
                  <a className="flex gap-3 active bg-primary text-primary-content">
                    <PlayCircle className="w-5 h-5 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">STEP0. 評価制度理解</span>
                      <span className="text-xs opacity-80">15分</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="flex gap-3 hover:bg-base-200">
                    <CheckSquare className="w-5 h-5 text-base-content/30 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">理解度テスト（必須）</span>
                      <span className="text-xs text-base-content/50">全5問</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* ==========================================
              右カラム：メインコンテンツ
          ========================================== */}
          <div className="flex-1 flex flex-col gap-6">
            {/* 1. 動画プレイヤーエリア */}
            {/* bg-black と aspect-video でYouTubeらしい枠を作り、角丸で美しく見せます */}
            <div className="w-full bg-black aspect-video rounded-box shadow-sm overflow-hidden flex items-center justify-center relative">
              <div className="flex flex-col items-center justify-center text-white/80">
                <PlayCircle className="w-16 h-16 mb-2 opacity-80" />
                <span className="font-medium">動画プレイヤー（仮）</span>
              </div>
            </div>

            {/* 2. コンテンツ詳細・テキストエリア */}
            <div className="bg-base-100 rounded-box shadow-sm border border-base-200 p-6 md:p-8">
              <Badge color="primary" className="mb-4">
                第1章 - 動画
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-6">STEP0. 評価制度理解</h1>

              <div className="prose prose-base max-w-none text-base-content/80">
                <p>
                  評価制度説明資料（動画）をよく視聴し、理解度テストに備えてください。
                  動画視聴は、しっかりと内容が理解できる前提であれば、
                  <strong>倍速視聴でもOK</strong>です。
                </p>

                {/* 添付ファイルエリア */}
                <div className="bg-base-200 p-5 rounded-lg mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border border-base-300">
                  <div className="flex gap-3 items-start">
                    <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-base mt-0">評価者向けテキスト（PDF）</h3>
                      <p className="text-sm mt-1">
                        必要に応じて、各自でダウンロード・印刷をお願いします。
                      </p>
                    </div>
                  </div>
                  <Button size="sm" color="secondary" className="flex-shrink-0 w-full sm:w-auto">
                    資料をダウンロード
                  </Button>
                </div>
              </div>
            </div>

            {/* 3. アクションエリア（次へ進む） */}
            <div className="bg-base-100 rounded-box shadow-sm border border-base-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
              <span className="text-sm text-base-content/60 font-medium">
                動画を最後まで視聴すると、次のテストへ進めるようになります。
              </span>
              <Button color="primary" size="lg" className="w-full sm:w-auto flex-shrink-0">
                理解度テストへ進む <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
