"use client"

import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FileText, GripVertical, HelpCircle, MonitorPlay, Trash2, Video } from "lucide-react"
import Link from "next/link"
import { Button } from "@repo/ui"
import { Lecture } from "../types/schema"

interface ISortableLectureItem {
  lecture: Lecture
  sectionId: string
}

// ==========================================
// 2. 子：レクチャーのドラッグ要素
// ==========================================
export const SortableLectureItem = ({ lecture, sectionId }: ISortableLectureItem) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lecture.id,
    // ★ ポイント: ドラッグされているのが「レクチャー」であることを明記する
    data: { type: "Lecture", sectionId },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
    opacity: isDragging ? 0.4 : 1,
  }

  const getIcon = () => {
    switch (lecture.type) {
      case "video":
        return <Video className="w-4 h-4 text-primary" />
      case "test":
        return <HelpCircle className="w-4 h-4 text-secondary" />
      case "mixed":
        return <MonitorPlay className="w-4 h-4 text-info" />
      default:
        return <FileText className="w-4 h-4 text-accent" />
    }
  }
  const getBgColor = () => {
    switch (lecture.type) {
      case "video":
        return "bg-primary/10"
      case "test":
        return "bg-secondary/10"
      case "mixed":
        return "bg-info/10"
      default:
        return "bg-accent/10"
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 rounded-lg group border transition-colors bg-base-100 ${
        isDragging
          ? "border-primary shadow-lg"
          : "border-transparent hover:border-base-200 hover:bg-base-200/50 mt-1"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* レクチャー用の掴むハンドル */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-base-content/20 hover:text-base-content/50"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <div className={`w-8 h-8 rounded flex items-center justify-center ${getBgColor()}`}>
          {getIcon()}
        </div>
        <div>
          <div className="font-medium text-sm">{lecture.title}</div>
          <div className="text-xs text-base-content/50 mt-0.5">{lecture.typeLabel}</div>
        </div>
      </div>
      <div className="hidden group-hover:flex items-center gap-2">
        {lecture.type == "test" ? (
          <Link href="/courses/1/edit/question" target="_blank">
            <Button size="sm" color="ghost">
              編集
            </Button>
          </Link>
        ) : (
          <Button size="sm" color="ghost">
            編集
          </Button>
        )}
        <Button size="sm" color="ghost" className="btn-square text-error">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

SortableLectureItem.displayName = "SortableLectureItem"
