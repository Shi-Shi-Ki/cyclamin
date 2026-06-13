"use client"

import {
  Badge,
  Button,
  Card,
  CardActions,
  CardBody,
  CardTitle,
  useErrorModal,
  useConfirmModal,
} from "@repo/ui"
import { ChevronRight, Trash2, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const mockCourses = [
  {
    id: "101",
    title: "【年次】コンプライアンス研修 2026",
    status: "公開中",
    usersCount: 1245,
    progress: { completionRate: 68.2, notStarted: 120, inProgress: 245, completed: 880 },
  },
  {
    id: "102",
    title: "新任マネージャー向け 基礎講座",
    status: "公開中",
    usersCount: 45,
    progress: { completionRate: 82.0, notStarted: 0, inProgress: 8, completed: 37 },
  },
]

export const CourseCards = () => {
  const router = useRouter()

  const { showError } = useErrorModal()
  const { showConfirm } = useConfirmModal()

  const handleDeleteClick = (courseId: string) => {
    showConfirm(
      "確認",
      <div className="py-4 text-base-content">
        <p>本当にこのコースを削除しますか？</p>
        <p className="text-sm text-warning mt-2">
          ※ 削除したデータは元に戻せません。受講者の学習履歴も失われる可能性があります。
        </p>
      </div>,
      async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          console.log(`courseId: ${courseId}`)
          router.refresh()
        } catch (e) {
          showError("エラーテスト", "エラーの表示テストです.")
        }
      }
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockCourses.map((course, idx) => {
          return (
            <Card key={idx} variant="flat" className="bg-base-100">
              <CardBody>
                <div className="flex justify-between items-start mb-2">
                  <Badge color="primary">{course.status}</Badge>
                  <div className="flex items-center gap-1 text-sm text-base-content/50">
                    <Users className="w-4 h-4" /> {course.usersCount}名が受講中
                  </div>
                </div>
                <CardTitle className="text-xl mb-4">{course.title}</CardTitle>

                <div className="bg-base-200/50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold">完了率サマリー</span>
                    <span className="text-sm font-bold text-primary">
                      {course.progress.completionRate}%
                    </span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value="68"
                    max="100"
                  ></progress>
                  <div className="flex justify-between mt-3 text-xs opacity-70">
                    <span>未着手: {course.progress.notStarted}名</span>
                    <span>進行中: {course.progress.inProgress}名</span>
                    <span>完了: {course.progress.completed}名</span>
                  </div>
                </div>

                <CardActions className="mt-2 flex justify-between items-center w-full">
                  <Button
                    color="ghost"
                    size="sm"
                    className="text-error hover:bg-error/10"
                    onClick={() => handleDeleteClick(course.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="flex gap-2">
                    <Link href="/courses/1/edit">
                      <Button color="ghost" size="sm">
                        コースの編集
                      </Button>
                    </Link>
                    <Link href="/courses/2/assign">
                      <Button color="ghost" size="sm">
                        受講者の編集
                      </Button>
                    </Link>
                    <Link href="/progress">
                      <Button color="primary" size="sm">
                        個別進捗を確認 <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardActions>
              </CardBody>
            </Card>
          )
        })}
      </div>
    </>
  )
}

CourseCards.displayName = "CourseCards"
