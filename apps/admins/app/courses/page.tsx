"use client"

import * as React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { courseSchema, type CourseFormInputs } from "../../schema/courses/schema"
import { Container } from "@repo/ui/organisms/Container"
import { Card, CardBody, CardTitle, CardActions } from "@repo/ui/molecules/Card"
import { Badge } from "@repo/ui/atoms/Badge"
import { Button } from "@repo/ui/atoms/Button"
import { Modal } from "@repo/ui/organisms/Modal"
import { Form } from "@repo/ui/organisms/Form"
import { Validation } from "@repo/ui/organisms/Validation"
import {
  Users,
  BarChart,
  ChevronRight,
  Filter,
  Plus,
  BookOpen,
  ChartNoAxesCombined,
  Asterisk,
} from "lucide-react"
import Link from "next/link"
import TextInput from "@repo/ui/atoms/TextInput"

export default function AdminCourseSummaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CourseFormInputs>({
    resolver: zodResolver(courseSchema),
  })

  const onClose = (isStateAction: boolean) => {
    setIsModalOpen(isStateAction)
    reset()
  }

  const onSubmit = (data: CourseFormInputs) => {
    console.log("送信データ:", data)
    alert("コースを作成しました！")
    onClose(false)
  }

  return (
    <Container className="max-w-6xl py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ChartNoAxesCombined className="w-5 h-5 opacity-60" /> コース別進捗サマリー
        </h2>
        <Button color="primary" size="sm" onClick={() => onClose(true)}>
          <Plus className="w-4 h-4 mr-1" /> 新規コース作成
        </Button>
      </div>
      {/* 1. 全体統計カード（サマリーのサマリー） */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-figure text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="stat-title font-medium text-base-content/60">公開中のコース</div>
            <div className="stat-value text-primary">12</div>
            <div className="stat-desc mt-1">2件のドラフトを編集中</div>
          </div>
        </div>
        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <Users className="w-8 h-8" />
            </div>
            <div className="stat-title font-medium text-base-content/60">総受講者数</div>
            <div className="stat-value text-secondary">2,450</div>
            <div className="stat-desc mt-1">先月比 +12%</div>
          </div>
        </div>
        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-figure text-accent">
              <BarChart className="w-8 h-8" />
            </div>
            <div className="stat-title font-medium text-base-content/60">全体完了率（平均）</div>
            <div className="stat-value text-accent">64%</div>
            <div className="stat-desc">
              <progress
                className="progress progress-accent w-full mt-2"
                value="64"
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>

      {/* 2. コース別リスト（受講者側と似たカード形式） */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Filter className="w-5 h-5 opacity-60" /> コース一覧
        </h2>
        <div className="join">
          <button className="btn btn-sm join-item btn-active">すべて</button>
          <button className="btn btn-sm join-item">公開中</button>
          <button className="btn btn-sm join-item">下書き</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* コースカード 1 */}

        <Card variant="flat" className="bg-base-100">
          <CardBody>
            <div className="flex justify-between items-start mb-2">
              <Badge color="primary">公開中</Badge>
              <div className="flex items-center gap-1 text-sm text-base-content/50">
                <Users className="w-4 h-4" /> 1,245名が受講中
              </div>
            </div>
            <CardTitle className="text-xl mb-4">【年次】コンプライアンス研修 2026</CardTitle>

            {/* 管理者用：進捗サマリー領域 */}
            <div className="bg-base-200/50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">完了率サマリー</span>
                <span className="text-sm font-bold text-primary">68.2%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value="68"
                max="100"
              ></progress>
              <div className="flex justify-between mt-3 text-xs opacity-70">
                <span>未着手: 120名</span>
                <span>進行中: 245名</span>
                <span>完了: 880名</span>
              </div>
            </div>

            <CardActions className="mt-2">
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
              {/* 先ほど作成した「進捗・成績トラッキングページ」への動線 */}
              <Button color="primary" size="sm">
                個別進捗を確認 <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardActions>
          </CardBody>
        </Card>

        {/* コースカード 2 */}
        <Card variant="flat" className="bg-base-100">
          <CardBody>
            <div className="flex justify-between items-start mb-2">
              <Badge color="primary">公開中</Badge>
              <div className="flex items-center gap-1 text-sm text-base-content/50">
                <Users className="w-4 h-4" /> 45名が受講中
              </div>
            </div>
            <CardTitle className="text-xl mb-4">新任マネージャー向け 基礎講座</CardTitle>

            <div className="bg-base-200/50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">完了率サマリー</span>
                <span className="text-sm font-bold text-primary">82.0%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value="82"
                max="100"
              ></progress>
              <div className="flex justify-between mt-3 text-xs opacity-70">
                <span>未着手: 0名</span>
                <span>進行中: 8名</span>
                <span>完了: 37名</span>
              </div>
            </div>

            <CardActions className="mt-2">
              <Link href="/courses/2/edit">
                <Button color="ghost" size="sm">
                  コースの編集
                </Button>
              </Link>
              <Link href="/courses/2/assign">
                <Button color="ghost" size="sm">
                  受講者の編集
                </Button>
              </Link>
              <Button color="primary" size="sm">
                個別進捗を確認 <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardActions>
          </CardBody>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => onClose(false)}
        title="新規コースの作成"
        // actions（フッター）に送信ボタンを配置する
        actions={
          <>
            <Button color="ghost" onClick={() => onClose(false)}>
              キャンセル
            </Button>
            {/* ★超重要テクニック★
              ボタン自体はFormの外にあるが、form="my-form-id" を指定することで
              離れた場所にあるFormを送信（Submit）できる！
            */}
            <Button color="primary" type="submit" form="create-course-form">
              作成する
            </Button>
          </>
        }
      >
        {/* ModalのchildrenとしてFormを渡す */}
        <Form
          id="create-course-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="form-control">
            <Validation message={errors.courseName?.message}>
              <TextInput
                {...register("courseName")}
                type="text"
                hintText={
                  <>
                    <Asterisk className="w-5 h-5 text-error" />
                    <span className="label-text font-bold">コース名</span>
                  </>
                }
                className={`input-bordered w-full`}
                color={`${errors.courseName ? "error" : "primary"}`}
                placeholder="例: 【年次】コンプライアンス研修"
              />
            </Validation>
          </div>
        </Form>
      </Modal>
    </Container>
  )
}
