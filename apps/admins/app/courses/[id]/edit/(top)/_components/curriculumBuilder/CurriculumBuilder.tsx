"use client"

import { useId, useState, useEffect } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { SortableSectionItem } from "./SortableSectionItem"
import { Section } from "../types/schema"

interface ICurriculumBuilder {
  sections: Section[] // ★ 親から受け取る
  setSections: React.Dispatch<React.SetStateAction<Section[]>> // ★ 親から受け取る
}

// ==========================================
// 4. 大元：カリキュラムビルダー全体
// ==========================================
export const CurriculumBuilder = ({ sections, setSections }: ICurriculumBuilder) => {
  const dndId = useId()

  // ★ ポイント3: 現在編集中のセクションIDを管理する
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    // ドラッグした要素のタイプ（SectionかLectureか）を取得
    const activeType = active.data.current?.type
    const overType = over.data.current?.type

    // ① セクション同士の並び替え
    if (activeType === "Section" && overType === "Section" && active.id !== over.id) {
      setSections((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === active.id)
        const newIndex = prev.findIndex((s) => s.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }

    // ② 同じセクション内でのレクチャー同士の並び替え
    if (activeType === "Lecture" && overType === "Lecture" && active.id !== over.id) {
      const activeSectionId = active.data.current?.sectionId
      const overSectionId = over.data.current?.sectionId

      if (activeSectionId === overSectionId) {
        setSections((prev) =>
          prev.map((sec) => {
            if (sec.id === activeSectionId) {
              const oldIndex = sec.lectures.findIndex((l) => l.id === active.id)
              const newIndex = sec.lectures.findIndex((l) => l.id === over.id)
              return { ...sec, lectures: arrayMove(sec.lectures, oldIndex, newIndex) }
            }
            return sec
          })
        )
      }
    }
  }

  // ★ ポイント4: セクション追加時に自動で編集モードにする
  useEffect(() => {
    // タイトルが空のセクションがあったら、それを編集モードにする
    const newSection = sections.find((s) => s.title === "")
    if (newSection) {
      setEditingSectionId(newSection.id)
    }
  }, [sections])

  // ★ ポイント5: 編集・保存・キャンセル・削除のコールバック

  // 編集開始
  const handleEditSection = (sectionId: string) => {
    setEditingSectionId(sectionId)
  }

  // 編集内容（タイトル）の保存
  const handleSaveSectionTitle = (sectionId: string, newTitle: string) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === sectionId ? { ...sec, title: newTitle } : sec))
    )
    setEditingSectionId(null) // 編集モード終了
  }

  // 編集キャンセル
  const handleCancelEdit = () => {
    setEditingSectionId(null) // 編集モード終了
  }

  // セクションの削除
  const handleDeleteSection = (sectionId: string) => {
    setSections((prev) => prev.filter((sec) => sec.id !== sectionId))
  }

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-6">
          {sections.map((section) => (
            <SortableSectionItem
              key={section.id}
              section={section}
              isEditing={section.id === editingSectionId} // ★ 編集モードかどうかを渡す
              onEdit={handleEditSection} // ★ コールバックを渡す
              onSaveEdit={handleSaveSectionTitle} // ★ コールバックを渡す
              onCancelEdit={handleCancelEdit} // ★ コールバックを渡す
              onDelete={handleDeleteSection} // ★ コールバックを渡す
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

CurriculumBuilder.displayName = "CurriculumBuilder"
