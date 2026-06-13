"use client"

import { useId, useState } from "react"
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
  sectionRecodes: Section[]
}

// ==========================================
// 4. 大元：カリキュラムビルダー全体
// ==========================================
export const CurriculumBuilder = ({ sectionRecodes }: ICurriculumBuilder) => {
  const dndId = useId()
  const [sections, setSections] = useState<Section[]>(sectionRecodes)

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

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div>
          {sections.map((section) => (
            <SortableSectionItem key={section.id} section={section} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

CurriculumBuilder.displayName = "CurriculumBuilder"
