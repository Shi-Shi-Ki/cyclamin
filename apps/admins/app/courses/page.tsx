"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { courseSchema, type CourseFormInputs } from "../../schema/courses/schema"
import {
  Badge,
  Button,
  Modal,
  Form,
  Validation,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardActions,
  TextInput,
  SuggestionInput,
} from "@repo/ui"
import {
  Users,
  BarChart,
  ChevronRight,
  Filter,
  Plus,
  BookOpen,
  ChartNoAxesCombined,
  Asterisk,
  Trash2,
} from "lucide-react"
import Link from "next/link"

export default function AdminCourseSummaryPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [apiSuggestions, setApiSuggestions] = useState<{ id: string; value: string }[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<CourseFormInputs>({
    resolver: zodResolver(courseSchema),
  })
  // 入力監視設定
  // const courseNameValue = watch("courseName")
  const sourceCourseNameValue = watch("sourceCourseName")

  const onClose = (isStateAction: boolean) => {
    setIsModalOpen(isStateAction)
    reset()
  }

  const onSubmit = (data: CourseFormInputs) => {
    console.log("送信データ:", data)
    alert("コースを作成しました！")
    onClose(false)
    const dummyId = 999 // dummy_id
    router.push(`/courses/${dummyId}/edit`)
  }

  // ★ ディバウンス＆APIフェッチ処理
  React.useEffect(() => {
    // 入力が空の場合はAPIを叩かずリストをクリア
    if (!sourceCourseNameValue || sourceCourseNameValue.length === 0) {
      setApiSuggestions([])
      return
    }

    setIsSearching(true)

    // setTimeoutでAPI呼び出しを遅延させる（300ms）
    const delayDebounceFn = setTimeout(async () => {
      try {
        console.log(`APIリクエスト送信: GET /api/courses/search?q=${sourceCourseNameValue}`)

        // 【本番環境のイメージ】
        // const response = await fetch(`/api/courses/search?q=${encodeURIComponent(sourceCourseNameValue)}&limit=5`)
        // const data = await response.json()
        // setApiSuggestions(data.map(item => item.name))

        // ※モック動作: 0.5秒後にダミーデータを返す
        await new Promise((resolve) => setTimeout(resolve, 500))
        const mockDb = [
          { id: "101", value: "【年次】コンプライアンス研修" },
          { id: "102", value: "【年次】情報セキュリティ研修" },
          { id: "201", value: "【新入社員】ビジネスマナー研修" },
          { id: "301", value: "【中途】評価制度理解" },
          { id: "501", value: "マネジメント基礎研修" },
        ]
        setApiSuggestions(mockDb.filter((c) => c.value.includes(sourceCourseNameValue)))
      } catch (error) {
        console.error("検索エラー:", error)
      } finally {
        setIsSearching(false)
      }
    }, 300) // 300ミリ秒間、次の入力がなければAPIを発火

    // ユーザーが300ms以内に次の文字を入力したら、前回のsetTimeoutをキャンセルする
    return () => clearTimeout(delayDebounceFn)
  }, [sourceCourseNameValue])

  // 候補が見つからない状態を判定する定数
  const isNoResults =
    sourceCourseNameValue &&
    sourceCourseNameValue.length > 0 &&
    !isSearching &&
    apiSuggestions.length === 0

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

            <CardActions className="mt-2 flex justify-between items-center w-full">
              <Button color="ghost" size="sm" className="text-error hover:bg-error/10 btn-square">
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

            <CardActions className="mt-2 flex justify-between items-center w-full">
              <Button color="ghost" size="sm" className="text-error hover:bg-error/10 btn-square">
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="flex gap-2">
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
                <Link href="/progress">
                  <Button color="primary" size="sm">
                    個別進捗を確認 <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
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
          <div className="form-control bg-base-200/50 p-4 rounded-box border border-base-200">
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
                className={"input-bordered w-full"}
                color={`${errors.courseName ? "error" : "primary"}`}
                placeholder="例: 【年次】コンプライアンス研修"
              />
            </Validation>
          </div>
          <div className="divider my-0" />
          <div className="form-control bg-base-200/50 p-4 rounded-box border border-base-200">
            <Validation message={isNoResults ? "候補が見つかりません" : ""} status="warning">
              <SuggestionInput
                label={
                  <>
                    <span className="label-text font-bold">
                      既存のコースをコピーして作成する（任意）
                    </span>
                  </>
                }
                TextInputComponent={TextInput}
                ButtonComponent={Button}
                suggestions={apiSuggestions}
                isLoading={isSearching}
                textInputProps={{
                  className: "input-bordered w-full",
                  placeholder: "過去のコースを検索...",
                }}
                buttonInputProps={{
                  className: "hover:bg-default hover:text-default-content",
                  color: "ghost",
                }}
                enteredValue={sourceCourseNameValue || ""}
                onChange={(val) => setValue("sourceCourseName", val, { shouldValidate: true })}
                onSelect={(selectedItem) => {
                  // 見た目上の名前をセット
                  setValue("sourceCourseName", selectedItem.value)
                  // ★ バックエンド送信用にIDをセット！
                  setValue("sourceCourseId", selectedItem.id)
                  // 自動入力（新規コース名が空の場合、コピーして使う場合において名前を変えて使う場合が考えられるので入力補助）
                  const courseNameValue = watch("courseName")
                  if (!courseNameValue) {
                    setValue("courseName", selectedItem.value, { shouldValidate: true })
                  }
                }}
              />
            </Validation>
            <p className="text-xs text-base-content/60 mt-2 ml-1">
              ※選択すると、設問内容や設定がすべて引き継がれます。
            </p>
          </div>
        </Form>
      </Modal>
    </Container>
  )
}
