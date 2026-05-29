import * as React from "react"
import { Container, Button } from "@repo/ui"
import { AlertCircle, Plus, Mail, Download, ChevronRight, MessageSquare, Clock } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <Container className="max-w-6xl py-8">
      {/* 1. 重要アラートセクション（最上部） */}
      <div className="flex flex-col gap-3 mb-8">
        {/* 1つ目のアラート */}
        <div className="alert alert-error shadow-sm bg-error/10 border-error/20 text-error-content py-3 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-error shrink-0" />
            <span className="text-sm font-bold text-base-content/70">
              コンプライアンス研修の期限切れユーザーが 12名 います。
            </span>
          </div>
          <Button
            size="sm"
            className="bg-error text-white border-none hover:bg-error/80 h-8 min-h-0 shrink-0"
          >
            一括催促を送る
          </Button>
        </div>

        {/* 2つ目のアラート */}
        <div className="alert alert-warning shadow-sm bg-warning/10 border-warning/20 text-warning-content py-3 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-warning shrink-0" />
            <span className="text-sm font-bold text-base-content/70">
              受講者からの新しい質問（未回答）が 3件 あります。
            </span>
          </div>
          <Button
            size="sm"
            className="bg-warning text-warning-content border-none hover:bg-warning/80 h-8 min-h-0 shrink-0"
          >
            内容を確認
          </Button>
        </div>
      </div>

      {/* 2. KPI統計サマリー (DaisyUI Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="stats shadow-sm border border-base-200 bg-base-100">
          <div className="stat px-4 py-3">
            <div className="stat-title text-xs font-bold opacity-60">総受講者数</div>
            <div className="stat-value text-2xl">5,240</div>
            <div className="stat-desc">先月比 +12%</div>
          </div>
        </div>
        <div className="stats shadow-sm border border-base-200 bg-base-100">
          <div className="stat px-4 py-3">
            <div className="stat-title text-xs font-bold opacity-60">当月アクティブ</div>
            <div className="stat-value text-2xl">1,205</div>
            <div className="stat-desc">稼働率 23%</div>
          </div>
        </div>
        <div className="stats shadow-sm border border-base-200 bg-base-100">
          <div className="stat px-4 py-3">
            <div className="stat-title text-xs font-bold opacity-60">全体平均完了率</div>
            <div className="stat-value text-2xl text-primary">64.8%</div>
            <div className="stat-desc">順調です</div>
          </div>
        </div>
        <div className="stats shadow-sm border border-base-200 bg-base-100">
          <div className="stat px-4 py-3">
            <div className="stat-title text-xs font-bold opacity-60">総学習時間</div>
            <div className="stat-value text-2xl text-secondary">428h</div>
            <div className="stat-desc">今月の全社合計</div>
          </div>
        </div>
      </div>

      {/* 3. 2カラムレイアウト（左：進行中のコース、右：クイックアクション） */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左側：進行中のメインコース (2カラム分使用) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">進行中の主要コース進捗</h2>
            <Button color="ghost" size="sm" className="text-primary">
              すべて見る
            </Button>
          </div>
          <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden">
            <table className="table w-full">
              <thead className="bg-base-200/50">
                <tr>
                  <th className="text-xs font-bold">コース名</th>
                  <th className="text-xs font-bold">進捗率</th>
                  <th className="text-xs font-bold text-right">アクション</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-base-200/30 transition-colors">
                  <td className="font-bold text-sm">【年次】コンプライアンス研修 2026</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <progress
                        className="progress progress-primary w-24"
                        value="68"
                        max="100"
                      ></progress>
                      <span className="text-xs font-bold">68%</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <Button size="sm" color="ghost" className="h-8 min-h-0 px-2">
                      進捗詳細 <ChevronRight className="w-4 h-4 ml-0.5" />
                    </Button>
                  </td>
                </tr>
                <tr className="hover:bg-base-200/30 transition-colors">
                  <td className="font-bold text-sm">情報セキュリティ基礎テスト</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <progress
                        className="progress progress-primary w-24"
                        value="42"
                        max="100"
                      ></progress>
                      <span className="text-xs font-bold">42%</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <Button size="sm" color="ghost" className="h-8 min-h-0 px-2">
                      進捗詳細 <ChevronRight className="w-4 h-4 ml-0.5" />
                    </Button>
                  </td>
                </tr>
                <tr className="hover:bg-base-200/30 transition-colors">
                  <td className="font-bold text-sm">新任マネージャー向け 基礎講座</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <progress
                        className="progress progress-primary w-24"
                        value="85"
                        max="100"
                      ></progress>
                      <span className="text-xs font-bold">85%</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <Button size="sm" color="ghost" className="h-8 min-h-0 px-2">
                      進捗詳細 <ChevronRight className="w-4 h-4 ml-0.5" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 右側：クイックアクション・最近のアクティビティ */}
        <div className="flex flex-col gap-6">
          {/* クイックアクション */}
          <div>
            <h2 className="text-lg font-bold mb-4">クイックアクション</h2>
            <div className="grid grid-cols-1 gap-2">
              <Button className="justify-start bg-base-100 border-base-200 hover:bg-base-200 text-base-content normal-case font-medium">
                <Plus className="w-4 h-4 mr-3 text-primary" /> 新規コースを作成
              </Button>
              <Button className="justify-start bg-base-100 border-base-200 hover:bg-base-200 text-base-content normal-case font-medium">
                <Mail className="w-4 h-4 mr-3 text-primary" /> 一括リマインドを送信
              </Button>
              <Button className="justify-start bg-base-100 border-base-200 hover:bg-base-200 text-base-content normal-case font-medium">
                <Download className="w-4 h-4 mr-3 text-primary" /> 成績レポートをDL (CSV)
              </Button>
            </div>
          </div>

          {/* 最近のアクティビティ（簡易ログ） */}
          <div className="bg-base-100 rounded-box border border-base-200 p-4">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 opacity-60" /> 最近のアクティビティ
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0"></div>
                <div className="text-xs">
                  <p className="font-bold">田中 次郎さんが受講完了</p>
                  <p className="opacity-60 mt-0.5">コンプライアンス研修 • 10分前</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <div className="text-xs">
                  <p className="font-bold">コースの公開設定が更新されました</p>
                  <p className="opacity-60 mt-0.5">情報セキュリティ • 2時間前</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
