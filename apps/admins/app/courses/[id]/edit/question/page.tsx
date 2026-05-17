"use client"

import dynamic from "next/dynamic"

// SSRを無効化してコンポーネントを読み込む
const SurveyCreatorWidget = dynamic(() => import("@repo/ui/templates/SurveyCreatorWidget"), {
  ssr: false,
})

export default function CourseEditQuestionPage() {
  return <SurveyCreatorWidget />
}
