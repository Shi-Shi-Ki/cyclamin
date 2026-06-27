// packages/ui/src/templates/course-player/sidebars/StandardSidebar.tsx
import { useState } from "react"
import { Badge } from "../../../atoms/Badge"
import { Button } from "../../../atoms/Button"
import {
  FileText,
  Send,
  CheckSquare,
  List,
  PlayCircle,
  HelpCircle,
  MonitorPlay,
} from "lucide-react"

export const StandardSidebar = ({
  lectureTitle,
  courseTitle,
  isPreview,
  description,
  requireVideoCompletion,
  isVideoFinished,
  setIsVideoFinished,
  onSubmit,
  type,
  sections = [],
  currentLectureId,
  onSelectLecture,
}: any) => {
  // ★ 初期タブを「目次」に設定
  const [activeTab, setActiveTab] = useState("toc")

  // レクチャーのタイプに応じてアイコンを切り替えるヘルパー
  const getLectureIcon = (type: string, isCompleted?: boolean, isCurrent?: boolean) => {
    const baseClass = "w-5 h-5 flex-shrink-0 "
    const colorClass = isCurrent ? "text-primary-content" : "text-base-content/60"
    switch (type) {
      case "video":
        return <PlayCircle className={`${baseClass} ${colorClass}`} />
      case "article":
        return <FileText className={`${baseClass} ${colorClass}`} />
      case "test":
        return <HelpCircle className={`${baseClass} ${colorClass}`} />
      case "mixed":
        return <MonitorPlay className={`${baseClass} ${colorClass}`} />
      default:
        return <FileText className={`${baseClass} ${colorClass}`} />
    }
  }

  // 進行度の計算
  const calculateProgress = () => {
    if (!sections || sections.length === 0) return { percent: 0, text: "0/0" }
    let total = 0,
      completed = 0
    sections.forEach((s: any) =>
      s.lectures.forEach((l: any) => {
        total++
        if (l.isCompleted) completed++
      })
    )
    if (total === 0) return { percent: 0, text: "0/0" }
    return { percent: Math.round((completed / total) * 100), text: `${completed}/${total}` }
  }

  const progress = calculateProgress()

  return (
    <>
      {/* ==========================================
          ★ タブヘッダー
      ========================================== */}
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
          className={`tab ${activeTab === "desc" ? "tab-active font-bold text-primary" : ""}`}
          onClick={() => setActiveTab("desc")}
        >
          <FileText className="w-4 h-4 mr-1.5" /> 説明
        </a>
      </div>

      <div className="overflow-y-auto flex-1 bg-base-100 pb-20">
        {/* ==========================================
            ★ タブ1: 目次
        ========================================== */}
        {activeTab === "toc" && (
          <div className="p-4 animate-in fade-in duration-200">
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

            <ul className="menu w-full p-0 gap-1 text-base-content">
              {sections.map((section: any) => (
                <div key={section.id} className="mb-4">
                  <li className="menu-title text-sm font-semibold mt-2">{section.title}</li>
                  {section.lectures.map((lecture: any) => {
                    const isCurrent = lecture.id === currentLectureId
                    return (
                      <li key={lecture.id}>
                        <a
                          className={`flex gap-3 ${isCurrent ? "active bg-primary text-primary-content" : "hover:bg-base-200"}`}
                          onClick={() => {
                            if (!isCurrent && onSelectLecture) onSelectLecture(lecture.id)
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
      </div>

      {/* ==========================================
          フッター：次へボタン・動画完了チェック
      ========================================== */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-base-200 bg-base-100 z-10">
        {requireVideoCompletion && type === "video" && (
          <div
            className={`flex items-center gap-2 mb-3 p-3 rounded-lg border ${isVideoFinished ? "bg-primary/5 border-primary/20" : "bg-base-200/50 border-transparent"}`}
          >
            <label className="flex items-center gap-2 text-sm cursor-default">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary cursor-default"
                checked={isVideoFinished}
                readOnly
              />
              <span
                className={`font-bold ${isVideoFinished ? "text-primary" : "text-base-content/60"}`}
              >
                {isVideoFinished ? "動画の視聴が完了しました" : "動画を最後まで視聴してください"}
              </span>
            </label>
          </div>
        )}
        <Button
          color="primary"
          className="w-full"
          disabled={requireVideoCompletion && type === "video" && !isVideoFinished}
          onClick={onSubmit}
        >
          {type === "test" ? (
            <>
              <Send className="w-4 h-4 mr-2" /> 回答を送信して次へ
            </>
          ) : (
            <>
              <CheckSquare className="w-4 h-4 mr-2" /> 次のレクチャーへ進む
            </>
          )}
        </Button>
      </div>
    </>
  )
}
