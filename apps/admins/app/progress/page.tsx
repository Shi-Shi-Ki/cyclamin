import * as React from "react"
import { Button } from "@repo/ui/atoms/Button"
import { Badge } from "@repo/ui/atoms/Badge"
import { Search, Mail, Download, MoreHorizontal } from "lucide-react"
import Container from "@repo/ui/organisms/Container"

export default function ProgressTrackingPage() {
  return (
    // 管理画面の王道：画面全体の高さを固定し、中身だけスクロールさせる(h-screen overflow-hidden)
    <Container className="max-w-6xl py-8">
      {/* コンテンツ本体 */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        {/* 1. ツールバー（検索・フィルター・一括操作） */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          {/* 左側：検索とフィルター */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
              <input
                type="text"
                placeholder="氏名やコース名で検索..."
                className="input input-bordered w-full sm:w-64 pl-9 bg-base-100"
              />
            </div>
            <select
              className="select select-bordered bg-base-100 w-full sm:w-auto"
              defaultValue="a0"
            >
              <option value="a0">部署で絞り込む</option>
              <option value="a1">営業部</option>
              <option value="a2">開発部</option>
              <option value="a3">人事部</option>
            </select>
            <select
              className="select select-bordered bg-base-100 w-full sm:w-auto"
              defaultValue="b0"
            >
              <option value="b0">ステータス</option>
              <option value="b1">未着手 (期限切れ)</option>
              <option value="b2">進行中</option>
              <option value="b3">完了</option>
            </select>
          </div>

          {/* 右側：一括操作アクション */}
          <div className="flex items-center gap-2">
            <Button color="ghost" className="bg-base-100 border-base-200">
              <Download className="w-4 h-4 mr-2" /> CSV出力
            </Button>
            {/* 人事が一番使いたい「一括催促ボタン」 */}
            <Button color="primary">
              <Mail className="w-4 h-4 mr-2" /> 選択したユーザーに催促 (2)
            </Button>
          </div>
        </div>

        {/* 2. データテーブル（DaisyUIの table クラスの真骨頂） */}
        <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* テーブルヘッダー */}
            <thead className="bg-base-200/50 text-base-content/70 text-sm">
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox checkbox-sm" />
                  </label>
                </th>
                <th>受講者情報</th>
                <th>対象コース</th>
                <th>ステータス</th>
                <th>進捗率</th>
                <th>最終アクセス</th>
                <th className="text-center">操作</th>
              </tr>
            </thead>

            {/* テーブルボディ（データ） */}
            <tbody>
              {/* サンプル1: 期限切れ（最も目立たせる） */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="w-8 rounded-full bg-neutral text-neutral-content">
                        <span>鈴</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">鈴木 一郎</div>
                      <div className="text-xs opacity-60">営業部 第1課</div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">【年次】コンプライアンス研修</td>
                <td>
                  <Badge color="error" className="badge-sm">
                    未着手 (期限超過)
                  </Badge>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <progress
                      className="progress progress-error w-16"
                      value="0"
                      max="100"
                    ></progress>
                    <span className="text-xs font-bold text-error">0%</span>
                  </div>
                </td>
                <td className="text-sm opacity-70">-</td>
                <th className="text-center">
                  <Button size="sm" color="ghost" className="btn-square">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </th>
              </tr>

              {/* サンプル2: 進行中（あと少しで終わる人） */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="w-8 rounded-full bg-neutral text-neutral-content">
                        <span>佐</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">佐藤 花子</div>
                      <div className="text-xs opacity-60">開発部 フロントエンドG</div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">【年次】コンプライアンス研修</td>
                <td>
                  <Badge color="accent" className="badge-sm">
                    進行中
                  </Badge>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <progress
                      className="progress progress-accent w-16"
                      value="75"
                      max="100"
                    ></progress>
                    <span className="text-xs font-bold text-accent">75%</span>
                  </div>
                </td>
                <td className="text-sm opacity-70">2時間前</td>
                <th className="text-center">
                  <Button size="sm" color="ghost" className="btn-square">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </th>
              </tr>

              {/* サンプル3: 完了（手がかからない優秀な層） */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox checkbox-sm" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="w-8 rounded-full bg-neutral text-neutral-content">
                        <span>田</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">田中 次郎</div>
                      <div className="text-xs opacity-60">人事部 採用担当</div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">新任マネージャー向け 基礎講座</td>
                <td>
                  <Badge color="ghost" className="badge-sm bg-base-200">
                    完了
                  </Badge>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <progress
                      className="progress progress-success w-16"
                      value="100"
                      max="100"
                    ></progress>
                    <span className="text-xs font-bold text-success">100%</span>
                  </div>
                </td>
                <td className="text-sm opacity-70">2026/05/01</td>
                <th className="text-center">
                  <Button size="sm" color="ghost" className="btn-square">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </th>
              </tr>
            </tbody>
          </table>

          {/* ペジネーション（フッター） */}
          <div className="p-4 border-t border-base-200 flex justify-between items-center text-sm text-base-content/70">
            <span>全 1,245 件中 1-3 件を表示</span>
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm bg-base-200">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
