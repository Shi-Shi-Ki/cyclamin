"use client"

import { CoursePlayerTemplate } from "@repo/ui"
import { LectureType, SectionItem } from "@repo/ui/src/templates/course-player/CoursePlayerTemplate"
import { useEffect, useState } from "react"

// ==========================================
// ★ 1. コース全体の目次データ（初期表示時に1回だけ取得する想定）
// ==========================================
const MOCK_SECTIONS: SectionItem[] = [
  {
    id: "sec-1",
    title: "第1章：評価制度について",
    lectures: [
      { id: "lec-1", title: "STEP0. 評価制度理解（動画）", type: "video", isCompleted: true },
      { id: "lec-2", title: "理解度テスト", type: "test", isCompleted: false },
    ],
  },
  {
    id: "sec-2",
    title: "第2章：マネージャーの役割",
    lectures: [
      { id: "lec-3", title: "STEP1. 目標設定の基本", type: "mixed", isCompleted: false },
      { id: "lec-4", title: "参考資料", type: "article", isCompleted: false },
    ],
  },
]

// ==========================================
// ★ 2. レクチャーの中身データ（選択するたびにAPIから取得する想定）
// ==========================================
const mockSurveyJson = {
  locale: "ja",
  title: {
    ja: "社内研修 202602xx",
  },
  description: {
    ja: "中途採用向けの課題です",
  },
  pages: [
    {
      name: "ページ1",
      title: {
        ja: "課題の回答",
      },
      description: {
        ja: "社内研修の回答フォームです",
      },
      elements: [
        {
          type: "text",
          name: "質問1",
          title: {
            ja: "問題1",
          },
          description: {
            ja: "〜について100字以内に回答してください",
          },
          correctAnswer: "社内研修の研修用として試験的につ作成しました",
          isRequired: true,
          validators: [
            {
              type: "text",
              minLength: 10,
              maxLength: 100,
            },
          ],
          placeholder: {
            ja: "ここに回答内容を入力します",
          },
        },
        {
          type: "text",
          name: "質問2",
          title: {
            ja: "問題2",
          },
          description: {
            ja: "〜について10文字以上、200字以内に回答してください",
          },
          correctAnswer: "回答フォームについてはさまざまな形式がある",
          isRequired: true,
          validators: [
            {
              type: "text",
              minLength: 10,
              maxLength: 200,
            },
          ],
          placeholder: {
            ja: "ここに回答内容を入力します",
          },
        },
        {
          type: "tagbox",
          name: "質問3",
          title: {
            ja: "問題3",
          },
          description: {
            ja: "〜に該当するものを全て選択してください",
          },
          correctAnswer: ["Item 1", "Item 3", "Item 5"],
          isRequired: true,
          choices: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        },
        {
          type: "boolean",
          name: "質問4",
          title: {
            ja: "質問",
          },
          description: {
            ja: "この選択肢で以降の設問内容が変わります!",
          },
          isRequired: true,
          swapOrder: true,
        },
        {
          type: "checkbox",
          name: "質問5",
          visibleIf: "{質問4} = true",
          title: {
            ja: "問題5",
          },
          description: {
            ja: 'これは"はい"を選んだ人向けの質問です',
          },
          correctAnswer: ["Item 3"],
          choices: ["Item 1", "Item 2", "Item 3"],
        },
        {
          type: "rating",
          name: "質問6",
          visibleIf: "{質問4} = false",
          title: {
            ja: "問題6",
          },
          description: {
            ja: 'これは"いいえ"を選んだ人向けです',
          },
          correctAnswer: 2,
        },
        {
          type: "radiogroup",
          name: "質問7",
          choices: ["Item 1", "Item 2", "Item 3"],
        },
        {
          type: "slider",
          name: "質問8",
        },
        {
          type: "dropdown",
          name: "質問9",
          choices: ["Item 1", "Item 2", "Item 3"],
        },
        {
          type: "rating",
          name: "質問23",
          rateType: "stars",
        },
        {
          type: "rating",
          name: "質問24",
          rateType: "smileys",
        },
        {
          type: "comment",
          name: "質問25",
        },
        {
          type: "text",
          name: "質問26",
          inputType: "date",
        },
        {
          type: "text",
          name: "質問27",
          inputType: "datetime-local",
        },
      ],
    },
  ],
  showCompletePage: false,
  headerView: "advanced",
  videoUrl: "dQw4w9WgXcQ",
}
// 疑似的なAPIフェッチ関数
const fetchLectureContentMock = async (lectureId: string) => {
  console.log(`APIリクエスト: GET /api/lectures/${lectureId}`)
  await new Promise((resolve) => setTimeout(resolve, 500)) // 0.5秒のローディングをシミュレート

  // IDに応じて返す中身を変える（実際はDBからのデータ）
  if (lectureId === "lec-1") {
    return {
      type: "video" as LectureType,
      title: "STEP0. 評価制度理解（動画）",
      contentUrl: "dQw4w9WgXcQ",
    }
  } else if (lectureId === "lec-2") {
    return { type: "test" as LectureType, title: "理解度テスト", surveyJson: mockSurveyJson }
  } else if (lectureId === "lec-3") {
    return {
      type: "mixed" as LectureType,
      title: "STEP1. 目標設定の基本",
      contentUrl: "dQw4w9WgXcQ",
      surveyJson: mockSurveyJson,
    }
  } else {
    return {
      type: "article" as LectureType,
      title: "参考資料",
      contentUrl: "https://ja.wikipedia.org/wiki/React",
    }
  }
}

export default function AdminCoursePreviewPage() {
  // ★ A. 現在選択されているレクチャーのIDを管理
  const [currentLectureId, setCurrentLectureId] = useState<string>("lec-1")

  // ★ B. 現在表示すべきレクチャーの「中身」を管理
  const [lectureContent, setLectureContent] = useState<any>(null)

  // ★ C. currentLectureId が変わるたびに、中身のデータを取ってくる
  useEffect(() => {
    let isMounted = true
    const loadContent = async () => {
      setLectureContent(null) // 一旦クリアしてローディング状態にする
      const data = await fetchLectureContentMock(currentLectureId)
      if (isMounted) setLectureContent(data)
    }
    loadContent()
    return () => {
      isMounted = false
    }
  }, [currentLectureId])

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <CoursePlayerTemplate
        courseTitle="評価制度理解コース"
        isPreview={true} // プレビューモード
        // ==========================================
        // 1. 現在のレクチャーの中身（動的に変わる）
        // ==========================================
        lectureTitle={lectureContent?.title}
        type={lectureContent?.type || "video"}
        contentUrl={lectureContent?.contentUrl}
        surveyJson={lectureContent?.surveyJson}
        requireVideoCompletion={true} // デモ用に動画完了を必須にする
        // ==========================================
        // 2. 目次データと、クリック時の制御（バケツリレー）
        // ==========================================
        sections={MOCK_SECTIONS}
        currentLectureId={currentLectureId}
        onSelectLecture={(newLectureId) => {
          // サイドバーで別のレクチャーがクリックされたら、Stateを更新！
          // → useEffectが走って新しいデータがフェッチされる
          setCurrentLectureId(newLectureId)
        }}
      />
    </div>
  )
}
