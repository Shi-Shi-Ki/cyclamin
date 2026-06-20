"use client"

import { useState } from "react" // ★ 追加
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button, TextInput, useConfirmModal } from "@repo/ui" // ★ TextInput, useConfirmModal を追加
import { Check, Edit3, GripVertical, Trash2, X } from "lucide-react" // ★ Check, X を追加
import { AppendLectureButtonList } from "../AppendLectureButtonList"
import { SortableLectureItem } from "./SortableLectureItem"
import { Section } from "../types/schema"

interface ISortableSectionItem {
  section: Section
  isEditing: boolean // ★ 親から受け取る
  onEdit: (sectionId: string) => void // ★ 親から受け取る
  onSaveEdit: (sectionId: string, newTitle: string) => void // ★ 親から受け取る
  onCancelEdit: () => void // ★ 親から受け取る
  onDelete: (sectionId: string) => void // ★ 親から受け取る
}

// ==========================================
// 3. 親：セクションのドラッグ要素
// ==========================================
export const SortableSectionItem = ({
  section,
  isEditing,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: ISortableSectionItem) => {
  const { showConfirm } = useConfirmModal() // ★ 確認モーダルフック

  // ★ ポイント6: ローカルな入力状態（確定前）を管理
  const [tempTitle, setTempTitle] = useState(section.title)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: { type: "Section" },
    disabled: isEditing, // ★ ポイント7: 編集モード中はドラッグ不可にする
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  }

  // 削除の確認と実行
  const handleDeleteClick = () => {
    showConfirm(
      "セクションの削除",
      `セクション「${section.title || tempTitle}」を削除しますか？\nセクション内のレクチャーや設問データもすべて削除されます。`,
      () => onDelete(section.id) // 親の削除関数を実行
    )
  }

  // 保存の確定
  const handleSaveClick = () => {
    if (tempTitle.trim() === "") {
      alert("セクションタイトルを入力してください。")
      return
    }
    onSaveEdit(section.id, tempTitle)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-base-100 rounded-box shadow border border-base-200"
    >
      {/* ★ ポイント8: 編集モードと表示モードの出し分け */}
      {isEditing ? (
        // ----------------------------------------
        // 編集モードヘッダー
        // ----------------------------------------
        <div className="bg-base-200/50 p-3 border-b border-base-200 flex items-center gap-2 rounded-t-2xl">
          <TextInput
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            color="primary"
            className="input-sm flex-1 bg-base-100 pl-4"
            placeholder="例: 第1章：評価制度について"
            autoFocus // 自動的にフォーカス
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              color="ghost"
              className="btn-square btn-sm text-base-content/60"
              onClick={onCancelEdit}
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              color="primary"
              className="btn-square btn-sm"
              onClick={handleSaveClick}
            >
              <Check className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      ) : (
        // ----------------------------------------
        // 表示モードヘッダー
        // ----------------------------------------
        <div className="bg-base-200/50 p-4 border-b border-base-200 flex items-center justify-between group rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-base-content/30 hover:text-base-content/60"
            >
              <GripVertical className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">{section.title}</span>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* ★ 編集ボタン */}
            <Button
              size="sm"
              color="ghost"
              className="btn-square"
              onClick={() => onEdit(section.id)}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            {/* ★ 削除ボタン（確認モーダルを呼び出す） */}
            <Button
              size="sm"
              color="ghost"
              className="btn-square text-error"
              onClick={handleDeleteClick}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* レクチャーリスト（編集モード中でも表示・編集可能） */}
      <div className="p-2 pb-4">
        <SortableContext
          items={section.lectures.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col">
            {section.lectures.map((lecture) => (
              <SortableLectureItem key={lecture.id} lecture={lecture} sectionId={section.id} />
            ))}
          </div>
        </SortableContext>

        <AppendLectureButtonList />
      </div>
    </div>
  )
}

SortableSectionItem.displayName = "SortableSectionItem"
