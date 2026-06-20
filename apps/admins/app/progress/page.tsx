"use client"

import * as React from "react"
import { Button, Badge, Container, Checkbox, Select, TextInput, Progress } from "@repo/ui"
import { Search, Mail, Download, MoreHorizontal } from "lucide-react"

// ==========================================
// ★ 1. APIレスポンスを想定した型定義
// ==========================================
type ProgressStatus = "overdue" | "in_progress" | "completed"

interface UserProgressRecord {
  id: string
  user: {
    id: string
    name: string
    initial: string
    department: string
  }
  course: {
    id: string
    name: string
  }
  status: ProgressStatus
  statusText: string
  progressPercentage: number
  lastAccess: string
  isChecked?: boolean
}

// ==========================================
// ★ 2. APIから取得したと想定するモックデータ
// ==========================================
const MOCK_API_RESPONSE: UserProgressRecord[] = [
  {
    id: "record-1",
    user: { id: "u-1", name: "鈴木 一郎", initial: "鈴", department: "営業部 第1課" },
    course: { id: "c-1", name: "【年次】コンプライアンス研修" },
    status: "overdue",
    statusText: "未着手 (期限超過)",
    progressPercentage: 0,
    lastAccess: "-",
    isChecked: true,
  },
  {
    id: "record-2",
    user: { id: "u-2", name: "佐藤 花子", initial: "佐", department: "開発部 フロントエンドG" },
    course: { id: "c-1", name: "【年次】コンプライアンス研修" },
    status: "in_progress",
    statusText: "進行中",
    progressPercentage: 75,
    lastAccess: "2時間前",
    isChecked: false,
  },
  {
    id: "record-3",
    user: { id: "u-3", name: "田中 次郎", initial: "田", department: "人事部 採用担当" },
    course: { id: "c-2", name: "新任マネージャー向け 基礎講座" },
    status: "completed",
    statusText: "完了",
    progressPercentage: 100,
    lastAccess: "2026/05/01",
    isChecked: false,
  },
]

// ★ 絞り込み用の選択肢（valueを実際のデータと一致させる）
const courseOptions = [
  { element: "コースで絞り込む", value: "all" },
  { element: "【年次】コンプライアンス研修", value: "c-1" },
  { element: "新任マネージャー向け 基礎講座", value: "c-2" },
]

const statusOptions = [
  { element: "ステータス", value: "all" },
  { element: "未着手 (期限切れ)", value: "overdue" },
  { element: "進行中", value: "in_progress" },
  { element: "完了", value: "completed" },
]

// ==========================================
// ★ 3. ステータスに応じた見た目を返すヘルパー関数
// ==========================================
const getStatusStyles = (status: ProgressStatus) => {
  switch (status) {
    case "overdue":
      return {
        badgeColor: "error" as const,
        badgeClass: "",
        progressClass: "error" as const,
        textClass: "text-error",
      }
    case "in_progress":
      return {
        badgeColor: "accent" as const,
        badgeClass: "",
        progressClass: "accent" as const,
        textClass: "text-accent",
      }
    case "completed":
      return {
        badgeColor: "ghost" as const,
        badgeClass: "bg-base-200",
        progressClass: "success" as const,
        textClass: "text-success",
      }
    default:
      return {
        badgeColor: "ghost" as const,
        badgeClass: "",
        progressClass: "ghost" as const,
        textClass: "",
      }
  }
}

export default function ProgressTrackingPage() {
  const records = MOCK_API_RESPONSE

  // ==========================================
  // ★ 絞り込み用の State
  // ==========================================
  const [searchText, setSearchText] = React.useState("")
  const [filterCourse, setFilterCourse] = React.useState("all")
  const [filterStatus, setFilterStatus] = React.useState("all")

  // ==========================================
  // ★ 絞り込み処理 (filteredRecords)
  // パフォーマンスを考慮して useMemo でメモ化
  // ==========================================
  const filteredRecords = React.useMemo(() => {
    return records.filter((record) => {
      // 1. テキスト検索 (部署名 or 氏名 or コース名)
      const matchText =
        !searchText ||
        record.user.name.includes(searchText) ||
        record.user.department.includes(searchText) ||
        record.course.name.includes(searchText)

      // 2. コースの絞り込み
      const matchCourse = filterCourse === "all" || record.course.id === filterCourse

      // 3. ステータスの絞り込み
      const matchStatus = filterStatus === "all" || record.status === filterStatus

      return matchText && matchCourse && matchStatus
    })
  }, [records, searchText, filterCourse, filterStatus])

  // 選択されたIDを管理するState
  const [selectedIds, setSelectedIds] = React.useState<string[]>(
    records.filter((r) => r.isChecked).map((r) => r.id)
  )

  // ==========================================
  // ★ 「すべて選択」の処理 (表示されているレコードだけを対象にする)
  // ==========================================
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 検索で絞り込まれた結果のIDだけを抽出し、既存の選択状態とマージ（重複排除）
      const visibleIds = filteredRecords.map((record) => record.id)
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])))
    } else {
      // 絞り込まれた結果のIDだけを選択状態から除外
      const visibleIds = filteredRecords.map((record) => record.id)
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)))
    }
  }

  const handleSelectOne = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id))
    }
  }

  // 表示されている全件が選択されているかどうかの判定
  const isAllSelected =
    filteredRecords.length > 0 && filteredRecords.every((record) => selectedIds.includes(record.id))

  return (
    <Container className="max-w-6xl py-8">
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        {/* 1. ツールバー（検索・フィルター・一括操作） */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
              <TextInput
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="部署、氏名、コース名で検索..."
                color="neutral"
                className="w-full sm:w-64 pl-9 bg-base-100"
              />
            </div>
            <Select
              options={courseOptions}
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              color="neutral"
              className="select-bordered bg-base-100 w-full sm:w-auto"
            />
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              color="neutral"
              className="bg-base-100 w-full sm:w-auto"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button color="ghost" className="bg-base-100 border-base-200">
              <Download className="w-4 h-4 mr-2" /> CSV出力
            </Button>
            <Button color="primary" disabled={selectedIds.length === 0}>
              <Mail className="w-4 h-4 mr-2" /> 選択したユーザーに催促 ({selectedIds.length})
            </Button>
          </div>
        </div>

        {/* 2. データテーブル */}
        <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50 text-base-content/70 text-sm">
              <tr>
                <th>
                  <label>
                    <Checkbox size="sm" checked={isAllSelected} onChange={handleSelectAll} />
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

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => {
                  const styles = getStatusStyles(record.status)
                  const isSelected = selectedIds.includes(record.id)

                  return (
                    <tr key={record.id} className={isSelected ? "bg-base-200/50" : ""}>
                      <th>
                        <label>
                          <Checkbox
                            size="sm"
                            checked={isSelected}
                            onChange={(e) => handleSelectOne(e, record.id)}
                          />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="w-8 rounded-full bg-neutral text-neutral-content">
                              <span>{record.user.initial}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{record.user.name}</div>
                            <div className="text-xs opacity-60">{record.user.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{record.course.name}</td>
                      <td>
                        <Badge
                          color={styles.badgeColor}
                          className={`badge-sm ${styles.badgeClass}`}
                        >
                          {record.statusText}
                        </Badge>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Progress
                            max={100}
                            value={record.progressPercentage}
                            color={styles.progressClass}
                            className="w-16"
                          />
                          <span className={`text-xs font-bold ${styles.textClass}`}>
                            {record.progressPercentage}%
                          </span>
                        </div>
                      </td>
                      <td className="text-sm opacity-70">{record.lastAccess}</td>
                      <th className="text-center">
                        <Button size="sm" color="ghost" className="btn-square">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </th>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-base-content/50">
                    条件に一致するデータが見つかりませんでした。
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ペジネーション */}
          <div className="p-4 border-t border-base-200 flex justify-between items-center text-sm text-base-content/70">
            <span>
              全 {records.length} 件中 1-{filteredRecords.length} 件を表示
            </span>
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
