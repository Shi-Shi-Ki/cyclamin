"use client"

import * as React from "react"
import { Container } from "@repo/ui"
import { BookOpenText } from "lucide-react"
import { CourseCards } from "./_components/CourseCards"
import { CreateCourseMenu } from "./_components/CreateCourseMenu"

export default function AdminCourseSummaryPage() {
  return (
    <Container className="max-w-6xl py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BookOpenText className="w-5 h-5 opacity-60" /> コース一覧
        </h2>
        <div className="join">
          <button className="btn btn-sm join-item btn-active">すべて</button>
          <button className="btn btn-sm join-item">公開中</button>
          <button className="btn btn-sm join-item">下書き</button>
        </div>
      </div>

      <CreateCourseMenu />

      <CourseCards />
    </Container>
  )
}
