"use client"

import * as React from "react"
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
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  Video,
  FileText,
  HelpCircle,
  GripVertical,
  Trash2,
  Edit3,
  Plus,
  MonitorPlay,
} from "lucide-react"
import { Button } from "@repo/ui"
import Link from "next/link"

// ==========================================
// 1. データ型と初期データ
// ==========================================
export type Lecture = {
  id: string
  title: string
  type: "video" | "test" | "text" | "mixed"
  typeLabel: string
}

export type Section = {
  id: string
  title: string
  lectures: Lecture[]
}

const INITIAL_SECTIONS: Section[] = [
  {
    id: "sec-1",
    title: "第1章：評価制度について",
    lectures: [
      { id: "lec-1", title: "STEP0. 評価制度理解（動画）", type: "video", typeLabel: "動画のみ" },
      {
        id: "lec-2",
        title: "理解度テスト（全5問）",
        type: "test",
        typeLabel: "テスト / アンケート",
      },
    ],
  },
  {
    id: "sec-2",
    title: "第2章：マネージャーの役割",
    lectures: [
      { id: "lec-3", title: "STEP1. 目標設定の基本", type: "mixed", typeLabel: "動画 ＋ テスト" },
    ],
  },
]

// ==========================================
// 2. 子：レクチャーのドラッグ要素
// ==========================================
function SortableLectureItem({ lecture, sectionId }: { lecture: Lecture; sectionId: string }) {
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

// ==========================================
// 3. 親：セクションのドラッグ要素（中に SortableContext を持つ）
// ==========================================
function SortableSectionItem({ section }: { section: Section }) {
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
        <div className="mt-3 ml-10">
          <div className="dropdown dropdown-bottom dropdown-end sm:dropdown-right sm:dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
            >
              <Plus className="w-4 h-4 mr-1" /> レクチャーを追加
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[10] menu p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-200 mt-1"
            >
              <li className="menu-title text-xs py-2">レイアウトタイプを選択</li>
              <li>
                <a className="py-3">
                  <Video className="w-4 h-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">動画のみ</span>
                  </div>
                </a>
              </li>
              <li>
                <a className="py-3">
                  <FileText className="w-4 h-4 text-accent" />
                  <div className="flex flex-col">
                    <span className="font-medium">記事 / 説明文</span>
                  </div>
                </a>
              </li>
              <li>
                <a className="py-3">
                  <HelpCircle className="w-4 h-4 text-secondary" />
                  <div className="flex flex-col">
                    <span className="font-medium">テスト / アンケート</span>
                  </div>
                </a>
              </li>
              <li>
                <a className="py-3">
                  <MonitorPlay className="w-4 h-4 text-info" />
                  <div className="flex flex-col">
                    <span className="font-medium">動画 ＋ テスト</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 4. 大元：カリキュラムビルダー全体
// ==========================================
export function CurriculumBuilder() {
  const dndId = useId()
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS)

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
