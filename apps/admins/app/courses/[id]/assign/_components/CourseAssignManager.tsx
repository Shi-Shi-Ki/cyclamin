"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { Building2, User, Search, Check, X, Users } from "lucide-react"
import { Button, Badge } from "@repo/ui"
import { AssignListItem } from "./AssignListItem"
import { Group, Individual } from "../_types/type"
import { GroupMemberSelectModal } from "./GroupMemberSelectModal"

// --- モックデータ（500人規模を想定して数名追加） ---
const AVAILABLE_USERS: Individual[] = [
  { id: "u-1", name: "鈴木 一郎", dept: "営業本部 第1営業部", initial: "鈴" },
  { id: "u-2", name: "佐藤 花子", dept: "営業本部 第2営業部", initial: "佐" },
  { id: "u-5", name: "高橋 健太", dept: "営業本部 第1営業部", initial: "高" },
  { id: "u-3", name: "山田 太郎", dept: "開発本部 UIチーム", initial: "山" },
  { id: "u-4", name: "田中 次郎", dept: "開発本部 バックエンド", initial: "田" },
]

const AVAILABLE_GROUPS: Group[] = [
  { id: "g-1", name: "全社（すべての社員）", count: 5200 },
  {
    id: "g-2",
    name: "営業本部",
    count: 850,
    members: [
      { id: "u-1", name: "鈴木 一郎", dept: "営業本部 第1営業部", initial: "鈴" },
      { id: "u-2", name: "佐藤 花子", dept: "営業本部 第2営業部", initial: "佐" },
      { id: "u-5", name: "高橋 健太", dept: "営業本部 第1営業部", initial: "高" },
    ],
  },
  {
    id: "g-3",
    name: "開発本部",
    count: 400,
    members: [
      { id: "u-3", name: "山田 太郎", dept: "開発本部 UIチーム", initial: "山" },
      { id: "u-4", name: "田中 次郎", dept: "開発本部 バックエンド", initial: "田" },
    ],
  },
  { id: "g-4", name: "経営企画室", count: 120 },
]

export function CourseAssignManager() {
  const [searchMode, setSearchMode] = useState<"group" | "individual">("group")

  // カートの状態
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([
    {
      id: "g-3",
      name: "開発本部",
      count: 400,
      members: [
        { id: "u-3", name: "山田 太郎", dept: "開発本部 UIチーム", initial: "山" },
        { id: "u-4", name: "田中 次郎", dept: "開発本部 バックエンド", initial: "田" },
      ],
    },
  ]) // 経営企画室を追加済みとする
  const [selectedUsers, setSelectedUsers] = useState<Individual[]>([])

  // ★ モーダルの状態管理
  const [activeModalGroup, setActiveModalGroup] = useState<Group | null>(null)
  const [modalSearchText, setModalSearchText] = useState("")

  // 合計人数の計算
  const totalCount = useMemo(() => {
    return selectedGroups.reduce((sum, g) => sum + g.count, 0) + selectedUsers.length
  }, [selectedGroups, selectedUsers])

  // アクションハンドラー
  const handleAddGroup = (group: Group) => setSelectedGroups((prev) => [...prev, group])
  const handleRemoveGroup = (id: string) =>
    setSelectedGroups((prev) => prev.filter((g) => g.id !== id))
  const handleAddUser = (user: Individual) => setSelectedUsers((prev) => [...prev, user])
  const handleRemoveUser = (id: string) =>
    setSelectedUsers((prev) => prev.filter((u) => u.id !== id))

  return (
    <div className="space-y-6">
      {/* 1. サマリーヘッダー */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">受講者アサイン</h2>
        </div>
        <div className="bg-primary/10 text-primary px-5 py-3 rounded-xl border border-primary/20 flex items-center gap-3">
          <Users className="w-6 h-6" />
          <div className="flex flex-col">
            <span className="text-xs font-bold opacity-80">現在のアサイン対象</span>
            <span className="text-lg font-bold leading-none">
              約 {totalCount.toLocaleString()} 名
            </span>
          </div>
        </div>
      </div>

      {/* 2. メインコンテンツ（左右分割） */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* 左側：検索・セレクター */}
        <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden flex flex-col h-150">
          <div className="flex border-b border-base-200 bg-base-200/30">
            <TabButton
              active={searchMode === "group"}
              onClick={() => setSearchMode("group")}
              icon={<Building2 className="w-4 h-4" />}
              label="部署・グループで追加"
            />
            <TabButton
              active={searchMode === "individual"}
              onClick={() => setSearchMode("individual")}
              icon={<User className="w-4 h-4" />}
              label="個別ユーザーで追加"
            />
          </div>

          <div className="p-4 border-b border-base-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
              <input
                type="text"
                placeholder="検索..."
                className="input input-sm input-bordered w-full pl-9 bg-base-100"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
            {searchMode === "group"
              ? AVAILABLE_GROUPS.map((group) => {
                  return (
                    <AssignListItem
                      key={group.id}
                      item={group}
                      selectedItems={selectedGroups}
                      onSelectMember={() => {
                        setActiveModalGroup(group)
                        setModalSearchText("")
                      }}
                      onAdd={() => handleAddGroup(group)}
                    />
                  )
                })
              : /* 個人モードの描画 */
                AVAILABLE_USERS.map((user) => {
                  return (
                    <AssignListItem
                      key={user.id}
                      item={user}
                      selectedItems={selectedUsers}
                      onAdd={() => handleAddUser(user)}
                    />
                  )
                })}
          </div>
        </div>

        {/* 右側：確定リスト */}
        <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden flex flex-col h-150">
          <div className="p-4 border-b border-base-200 bg-base-200/20 flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <Check className="w-5 h-5 text-success" /> アサイン確定リスト
            </h3>
            <Button
              size="sm"
              color="ghost"
              className="text-error text-xs"
              onClick={() => {
                setSelectedGroups([])
                setSelectedUsers([])
              }}
            >
              すべてクリア
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            <SelectedSection
              label="選択中の部署・グループ"
              icon={<Building2 className="w-3 h-3" />}
            >
              <div className="flex flex-wrap gap-2">
                {selectedGroups.map((g) => (
                  <Badge
                    key={g.id}
                    className="badge-lg bg-base-200 border-base-300 gap-2 py-4 pl-3 pr-1"
                  >
                    <span className="text-sm font-medium">{g.name}</span>
                    <button
                      onClick={() => handleRemoveGroup(g.id)}
                      className="btn btn-xs btn-circle btn-ghost"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </SelectedSection>
            {selectedGroups.length > 0 && selectedUsers.length > 0 && (
              <div className="divider my-0"></div>
            )}
            <SelectedSection label="選択中の個別ユーザー" icon={<User className="w-3 h-3" />}>
              <div className="flex flex-col gap-2">
                {selectedUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-2 bg-base-200/50 rounded-lg border border-base-200"
                  >
                    <span className="text-sm font-medium">{u.name}</span>
                    <button
                      onClick={() => handleRemoveUser(u.id)}
                      className="btn btn-xs btn-square btn-ghost"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </SelectedSection>
          </div>
        </div>
      </div>

      {/* ====================================================
          ★ グループメンバー選択モーダル
      ==================================================== */}
      <GroupMemberSelectModal
        onClose={() => setActiveModalGroup(null)}
        activeModalGroup={activeModalGroup}
        modalSearchText={modalSearchText}
        onChange={(e) => setModalSearchText(e.target.value)}
        selectedUsers={selectedUsers}
        selectedGroups={selectedGroups}
        handleRemoveUser={handleRemoveUser}
        handleAddUser={handleAddUser}
      />
    </div>
  )
}

// --- 内部用サブコンポーネント ---
function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-bold flex justify-center items-center gap-2 border-b-2 transition-colors ${active ? "border-primary text-primary bg-base-100" : "border-transparent text-base-content/60 hover:bg-base-200"}`}
    >
      {icon} {label}
    </button>
  )
}

function SelectedSection({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className="text-xs font-bold text-base-content/60 mb-3 flex items-center gap-1">
        {icon} {label}
      </h4>
      {children}
    </div>
  )
}
