// packages/ui/src/templates/course-player/sidebars/MixedSidebar.tsx

import { useState } from "react"
import { Button } from "../../../atoms/Button"
import { Survey } from "survey-react-ui"
import {
  HelpCircle,
  Send,
  List,
  FileText,
  PlayCircle,
  CheckSquare,
  FileText as FileTextIcon,
  MonitorPlay,
} from "lucide-react"
import { SectionItem, LectureType } from "../CoursePlayerTemplate"
import { Badge } from "../../../atoms/Badge"

interface MixedSidebarProps {
  lectureTitle: string
  courseTitle: string
  isPreview?: boolean
  description?: any
  survey: any
  isMounted: boolean
  onSubmit: () => void
  sections?: SectionItem[]
  currentLectureId?: string
  onSelectLecture?: (lectureId: string) => void
}

export const MixedSidebar = ({
  lectureTitle,
  courseTitle,
  isPreview,
  description = "",
  survey,
  isMounted,
  onSubmit,
  sections = [],
  currentLectureId,
  onSelectLecture,
}: MixedSidebarProps) => {
  const [activeTab, setActiveTab] = useState("quiz")

  // レクチャーのタイプに応じてアイコンを切り替えるヘルパー
  const getLectureIcon = (type: LectureType, isCompleted?: boolean, isCurrent?: boolean) => {
    // 完了済みの場合は一律でチェックアイコンにするなどのUI調整も可能
    if (isCompleted) {
      // return <CheckSquare className="w-5 h-5 text-success flex-shrink-0" />
    }

    const baseClass = "w-5 h-5 flex-shrink-0 "
    // 現在選択中のものはアイコンの色を変える
    const colorClass = isCurrent ? "text-primary-content" : "text-base-content/60"

    switch (type) {
      case "video":
        return <PlayCircle className={`${baseClass} ${colorClass}`} />
      case "article":
        return <FileTextIcon className={`${baseClass} ${colorClass}`} />
      case "test":
        return <HelpCircle className={`${baseClass} ${colorClass}`} />
      case "mixed":
        return <MonitorPlay className={`${baseClass} ${colorClass}`} />
      default:
        return <FileTextIcon className={`${baseClass} ${colorClass}`} />
    }
  }

  // ★ 進行度（全体の完了率）の計算
  const calculateProgress = () => {
    if (!sections || sections.length === 0) return { percent: 0, text: "0/0" }

    let totalLectures = 0
    let completedLectures = 0

    sections.forEach((section) => {
      section.lectures.forEach((lecture) => {
        totalLectures++
        if (lecture.isCompleted) completedLectures++
      })
    })

    if (totalLectures === 0) return { percent: 0, text: "0/0" }
    const percent = Math.round((completedLectures / totalLectures) * 100)
    return { percent, text: `${completedLectures}/${totalLectures}` }
  }

  const progress = calculateProgress()

  return (
    <>
      <div role="tablist" className="tabs tabs-bordered pt-2 px-2 bg-base-100 flex-shrink-0">
        <a
          role="tab"
          className={`tab ${activeTab === "toc" ? "tab-active font-bold text-primary" : ""}`}
          onClick={() => setActiveTab("toc")}
        >
          <List className="w-4 h-4 mr-1.5" /> 目次
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "quiz" ? "tab-active font-bold text-primary" : ""}`}
          onClick={() => setActiveTab("quiz")}
        >
          <HelpCircle className="w-4 h-4 mr-1.5" /> テスト
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "desc" ? "tab-active font-bold text-primary" : ""}`}
          onClick={() => setActiveTab("desc")}
        >
          <FileText className="w-4 h-4 mr-1.5" /> 説明
        </a>
      </div>

      <div className="overflow-y-auto flex-1 bg-base-100 pb-20">
        {/* ==========================================
            ★ 目次タブの内容（動的出力）
        ========================================== */}
        {activeTab === "toc" && (
          <div className="p-4 animate-in fade-in duration-200">
            {/* 進捗バー */}
            <div className="mb-4 p-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold">全体の進捗</span>
                <span className="font-bold text-primary">{progress.text} 完了</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value={progress.percent}
                max={100}
              ></progress>
            </div>

            {/* カリキュラムリスト */}
            <ul className="menu w-full p-0 gap-1 text-base-content">
              {sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <li className="menu-title text-sm font-semibold mt-2">{section.title}</li>
                  {section.lectures.map((lecture) => {
                    const isCurrent = lecture.id === currentLectureId

                    return (
                      <li key={lecture.id}>
                        {/* 選択中のレクチャーは背景色を変更 */}
                        <a
                          className={`flex gap-3 ${isCurrent ? "active bg-primary text-primary-content" : "hover:bg-base-200"}`}
                          onClick={() => {
                            // 同じものをクリックした時は何もしない
                            if (!isCurrent && onSelectLecture) {
                              onSelectLecture(lecture.id)
                            }
                          }}
                        >
                          {getLectureIcon(lecture.type, lecture.isCompleted, isCurrent)}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{lecture.title}</span>
                          </div>
                        </a>
                      </li>
                    )
                  })}
                </div>
              ))}
            </ul>
          </div>
        )}

        {/* ==========================================
            テストタブの内容（変更なし）
        ========================================== */}
        {activeTab === "quiz" && (
          <div className="animate-in fade-in duration-200">
            <div className="p-6 pb-0">
              <p className="text-sm text-base-content/70">
                動画を視聴しながら、以下の設問に回答してください。
              </p>
            </div>
            <div className="p-6 text-base-content [&_.sv_container]:!p-0 [&_.sv_body]:!border-none [&_.sv_main]:!bg-transparent [&_.sd-root-modern]:!bg-transparent [&_.sd-container-modern]:!bg-transparent [&_.sd-page]:!bg-transparent [&_.sd-element]:!bg-transparent [&_.sd-question]:!bg-transparent [&_.sd-title]:!text-base-content [&_.sd-description]:!text-base-content/70 [&_.sd-item__control-label]:!text-base-content">
              {isMounted && <Survey model={survey} />}
            </div>
          </div>
        )}
      </div>

      {activeTab === "quiz" && (
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-base-200 bg-base-100 z-10">
          <Button color="primary" className="w-full" onClick={onSubmit}>
            <Send className="w-4 h-4 mr-2" /> 回答を送信して次へ
          </Button>
        </div>
      )}

      {/* ==========================================
                  ★ タブ2: 説明
              ========================================== */}
      {activeTab === "desc" && (
        <div className="animate-in fade-in duration-200 flex flex-col h-full">
          <div className="p-6 border-b border-base-200 bg-base-100/50 shrink-0">
            <h2 className="text-lg font-bold mb-2">{lectureTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {isPreview && (
                <Badge className="bg-warning text-warning-content border-none">プレビュー</Badge>
              )}
              <Badge className="bg-primary/10 text-primary border-none">{courseTitle}</Badge>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-base-content/60" /> 説明
            </h3>
            <div className="prose prose-sm text-base-content/80 whitespace-pre-wrap">
              {description}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
