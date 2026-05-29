"use client"

import { CoursePlayerTemplate } from "@repo/ui"

export default function AdminCoursePreviewPage() {
  // ※将来的にはここで DB からコースデータを取得する

  return <CoursePlayerTemplate courseTitle="評価制度理解" isPreview={false} />
}
