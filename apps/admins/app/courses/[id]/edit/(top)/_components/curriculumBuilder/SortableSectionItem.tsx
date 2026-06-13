"use client"

import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@repo/ui"
import { Edit3, GripVertical, Trash2 } from "lucide-react"
import { AppendLectureButtonList } from "../AppendLectureButtonList"
import { SortableLectureItem } from "./SortableLectureItem"
import { Section } from "../types/schema"

interface ISortableSectionItem {
  section: Section
}

// ==========================================
// 3. 親：セクションのドラッグ要素（中に SortableContext を持つ）
// ==========================================
export const SortableSectionItem = ({ section }: ISortableSectionItem) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    // ★ ポイント: ドラッグされているのが「セクション」であることを明記する
    data: { type: "Section" },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-base-100 rounded-box shadow-sm border border-base-200 mb-6"
    >
      {/* セクションヘッダー（ここに掴むハンドルを付ける） */}
      <div className="bg-base-200/50 p-4 border-b border-base-200 flex items-center justify-between group rounded-t-2xl">
        <div className="flex items-center gap-3">
          {/* セクション用の掴むハンドル */}
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
          <Button size="sm" color="ghost" className="btn-square">
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button size="sm" color="ghost" className="btn-square text-error">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-2 pb-4">
        {/* レクチャーの並び替えコンテキスト（セクションごとに独立） */}
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

        {/* レクチャー追加ボタン */}
        <AppendLectureButtonList />
      </div>
    </div>
  )
}

SortableSectionItem.displayName = "SortableSectionItem"
