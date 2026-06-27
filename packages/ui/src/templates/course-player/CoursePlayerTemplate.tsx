"use client"

import { useState, useMemo, useEffect } from "react"
import { Model } from "survey-core"
import "survey-core/survey-core.min.css"
import "survey-core/i18n/japanese"
import "./survey-daisyui-patch.css"

import { CoursePlayerLayout } from "./CoursePlayerLayout"
import { VideoContent } from "./contents/VideoContent"
import { ArticleContent } from "./contents/ArticleContent"
import { TestContent } from "./contents/TestContent"
import { StandardSidebar } from "./sidebars/StandardSidebar"
import { MixedSidebar } from "./sidebars/MixedSidebar"

import { useTheme } from "next-themes"
import { LayeredDarkPanelless, DefaultLight } from "survey-core/themes"

// ==========================================
// ★ 1. カリキュラム（目次）用の型定義
// ==========================================
export type LectureType = "video" | "test" | "article" | "mixed"

export interface LectureItem {
  id: string
  title: string
  type: LectureType
  isCompleted?: boolean
}

export interface SectionItem {
  id: string
  title: string
  lectures: LectureItem[]
}

// ==========================================
// ★ 2. Propsの定義（外部のPageコンポーネントから受け取るものすべて）
// ==========================================
export interface CoursePlayerTemplateProps {
  // コンテンツ情報
  courseTitle?: string
  lectureTitle?: string
  isPreview?: boolean
  type?: LectureType
  contentUrl?: string
  description?: React.ReactNode | string
  requireVideoCompletion?: boolean
  surveyJson?: any
  sections?: SectionItem[]
  currentLectureId?: string
  onSelectLecture?: (lectureId: string) => void
}

// ==========================================
// ★ 3. コンポーネント本体
// ==========================================
export const CoursePlayerTemplate = ({
  courseTitle = "評価制度理解",
  lectureTitle = "STEP0. 評価制度理解",
  isPreview,
  type = "mixed",
  contentUrl,
  description = "ここにレクチャーの説明文が入ります...",
  requireVideoCompletion = false,
  surveyJson,
  sections = [],
  currentLectureId,
  onSelectLecture,
}: CoursePlayerTemplateProps) => {
  // ----------------------------------------
  // 状態管理
  // ----------------------------------------
  const [isMounted, setIsMounted] = useState(false)
  const [isVideoFinished, setIsVideoFinished] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // ==========================================
  // ★ 現在表示しているレクチャーのデータを特定する
  // ==========================================
  const currentLecture = useMemo(() => {
    for (const sec of sections) {
      const lec = sec.lectures.find((l) => l.id === currentLectureId)
      if (lec) return lec
    }
    return null
  }, [sections, currentLectureId])

  // ==========================================
  // ★ レクチャーが切り替わった時、すでに完了済み(isCompleted)ならチェックを入れる
  // ==========================================
  useEffect(() => {
    if (currentLecture && currentLecture.isCompleted) {
      setIsVideoFinished(true)
    } else {
      setIsVideoFinished(false) // 未完了の場合はリセット
    }
  }, [currentLecture])

  const { resolvedTheme } = useTheme()

  // ----------------------------------------
  // SurveyJS モデルの初期化
  // ----------------------------------------
  const survey = useMemo(() => {
    if (!surveyJson) return null
    const model = new Model(surveyJson)
    model.showNavigationButtons = false
    model.showTitle = false
    model.showPageTitles = false

    model.onUpdateQuestionCssClasses.add((_, options) => {
      const classes = options.cssClasses
      const type = options.question.getType()
      if (classes.mainRoot) classes.mainRoot += " pb-6 mb-6 border-b border-base-200"
      if (classes.title) classes.title += " label-text font-bold text-base mb-2 block"
      if (classes.description) classes.description += " text-sm text-base-content/70 mb-4 block"
      if (classes.requiredText) classes.requiredText += " text-error ml-1"
      if (type === "text") {
        if (classes.root) classes.root = "input input-primary"
      } else if (type === "comment") {
        if (classes.root) classes.root = "textarea textarea-primary"
      }
    })

    if (resolvedTheme === "dark") {
      model.applyTheme(LayeredDarkPanelless)
    } else {
      model.applyTheme(DefaultLight)
    }

    return model
  }, [surveyJson, resolvedTheme])

  // ----------------------------------------
  // 送信／次へ ボタンのアクション
  // ----------------------------------------
  const handleCustomSubmit = () => {
    if ((type === "test" || type === "mixed") && survey) {
      survey.completeLastPage()
    } else {
      alert("次のレクチャーへ進みます。")
    }
  }

  // ----------------------------------------
  // 左カラム（メイン）の出し分け
  // ----------------------------------------
  const renderMainContent = () => {
    switch (type) {
      case "video":
      case "mixed":
        return (
          <VideoContent
            contentUrl={contentUrl}
            courseTitle={courseTitle}
            isPreview={isPreview}
            onVideoEnd={() => setIsVideoFinished(true)}
          />
        )
      case "article":
        return <ArticleContent contentUrl={contentUrl} />
      case "test":
        return <TestContent survey={survey} isMounted={isMounted} />
    }
  }

  // ----------------------------------------
  // 右カラム（サイドバー）の出し分け
  // ★ ここで、受け取った目次用のPropsを子コンポーネントに渡す！
  // ----------------------------------------
  const renderSidebar = () => {
    switch (type) {
      case "mixed":
        return (
          <MixedSidebar
            lectureTitle={lectureTitle}
            courseTitle={courseTitle}
            isPreview={isPreview}
            description={description}
            survey={survey}
            isMounted={isMounted}
            onSubmit={handleCustomSubmit}
            sections={sections}
            currentLectureId={currentLectureId}
            onSelectLecture={onSelectLecture}
          />
        )
      default:
        return (
          <StandardSidebar
            lectureTitle={lectureTitle}
            courseTitle={courseTitle}
            isPreview={isPreview}
            description={description}
            type={type}
            requireVideoCompletion={requireVideoCompletion}
            isVideoFinished={isVideoFinished}
            setIsVideoFinished={setIsVideoFinished}
            onSubmit={handleCustomSubmit}
            sections={sections}
            currentLectureId={currentLectureId}
            onSelectLecture={onSelectLecture}
          />
        )
    }
  }

  // ----------------------------------------
  // 最終的なレイアウトの組み立て
  // ----------------------------------------
  return (
    <CoursePlayerLayout
      isDarkBg={type === "video" || type === "mixed"}
      mainContent={renderMainContent()}
      sidebar={renderSidebar()}
    />
  )
}
