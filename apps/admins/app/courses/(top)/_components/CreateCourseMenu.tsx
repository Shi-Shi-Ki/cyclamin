"use client"

import { Button, Form, Modal, SuggestionInput, TextInput, Validation } from "@repo/ui"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { CreateCourseRecode, createCourseSchema } from "../../../actions/course/create/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Asterisk, Plus } from "lucide-react"
import React from "react"

export interface CreateCourseMenu {}

export const CreateCourseMenu = () => {
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
  } = useForm<CreateCourseRecode>({
    resolver: zodResolver(createCourseSchema),
  })

  const sourceCourseNameValue = watch("sourceCourseName")

  const onClose = (isStateAction: boolean) => {
    setIsModalOpen(isStateAction)
    reset()
  }

  const onSubmit = (data: CreateCourseRecode) => {
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
    <>
      <div className="flex items-center justify-between mb-6">
        <Button color="primary" size="sm" onClick={() => onClose(true)}>
          <Plus className="w-4 h-4 mr-1" /> 新規コース作成
        </Button>
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
    </>
  )
}

CreateCourseMenu.displayName = "CreateCourseMenu"
