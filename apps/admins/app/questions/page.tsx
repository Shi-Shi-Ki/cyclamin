"use client"

import * as React from "react"
import { useState, useMemo, useEffect, useRef } from "react"
import { Button, Badge, Container, TextArea, TextInput, Select } from "@repo/ui"
import {
  Search,
  Clock,
  ExternalLink,
  AlertCircle,
  Check,
  MessageCircleMore,
  Paperclip,
  X,
} from "lucide-react"

// ==========================================
// ★ 1. APIレスポンスを想定した型定義
// ==========================================
type QuestionStatus = "unanswered" | "resolved"

interface Message {
  id: string
  senderType: "student" | "admin"
  senderName: string
  senderInitial: string
  avatarColorClass: string
  time: string
  content: React.ReactNode | string
  // ★ APIから返ってくるS3の画像URLを想定したプロパティを追加
  attachmentUrl?: string
}

interface QuestionRecord {
  id: string
  user: {
    name: string
    initial: string
    avatarColorClass: string
  }
  time: string
  title: string
  summary: string
  course: {
    id: string
    name: string
  }
  lectureName: string
  status: QuestionStatus
  messages: Message[]
}

// ==========================================
// ★ 2. APIから取得したと想定するモックデータ
//
// 画像はフロントからs3にアップロードしてそのURLをAPIで送る方式にする
// ==========================================
const MOCK_QUESTIONS: QuestionRecord[] = [
  {
    id: "q-1",
    user: { name: "山田 太郎", initial: "山", avatarColorClass: "bg-warning text-warning-content" },
    time: "10分前",
    title: "ハロー効果の具体例について",
    summary: "動画の3:45あたりで説明されている「ハロー効果」について質問です...",
    course: { id: "c-1", name: "【年次】コンプライアンス研修" },
    lectureName: "STEP0. 評価制度理解",
    status: "unanswered",
    messages: [
      {
        id: "m-1",
        senderType: "student",
        senderName: "山田 太郎",
        senderInitial: "山",
        avatarColorClass: "bg-warning text-warning-content",
        time: "今日 10:24",
        content:
          "動画の3:45あたりで説明されている「ハロー効果」について質問です。これ以外に、評価者が無意識にやってしまいがちな典型例はありますでしょうか？",
      },
    ],
  },
  {
    id: "q-2",
    user: { name: "佐藤 花子", initial: "佐", avatarColorClass: "bg-neutral text-neutral-content" },
    time: "2時間前",
    title: "テストの第3問が分かりません",
    summary: "資料PDFも確認したのですが、第3問の選択肢BとCの違いがよく理解できませんでした。",
    course: { id: "c-2", name: "新任マネージャー向け 基礎講座" },
    lectureName: "理解度確認テスト",
    status: "unanswered",
    messages: [
      {
        id: "m-2",
        senderType: "student",
        senderName: "佐藤 花子",
        senderInitial: "佐",
        avatarColorClass: "bg-neutral text-neutral-content",
        time: "今日 08:15",
        content:
          "資料PDFも確認したのですが、第3問の選択肢BとCの違いがよく理解できませんでした。補足説明をお願いできますでしょうか。",
      },
    ],
  },
  {
    id: "q-3",
    user: { name: "伊藤 次郎", initial: "伊", avatarColorClass: "bg-info text-info-content" },
    time: "昨日",
    title: "動画が再生されません",
    summary:
      "社内ネットワークから接続していますが、STEP2の動画だけがローディングのまま動きません。",
    course: { id: "c-3", name: "情報セキュリティ基礎" },
    lectureName: "STEP2. マルウェア対策",
    status: "unanswered",
    messages: [
      {
        id: "m-3",
        senderType: "student",
        senderName: "伊藤 次郎",
        senderInitial: "伊",
        avatarColorClass: "bg-info text-info-content",
        time: "昨日 15:30",
        content:
          "社内ネットワークから接続していますが、STEP2の動画だけがローディングのまま動きません。以下がその時の画面のスクリーンショットです。",
        // ★ S3のURLを想定したダミー画像をセット（Unsplashの画像を利用）
        attachmentUrl:
          "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400",
      },
    ],
  },
  {
    id: "q-4",
    user: { name: "高橋 健太", initial: "高", avatarColorClass: "bg-success text-success-content" },
    time: "3日前",
    title: "修了証の発行について",
    summary:
      "すべての動画を視聴しテストも合格したのですが、修了証はどこからダウンロードできますか？",
    course: { id: "c-1", name: "【年次】コンプライアンス研修" },
    lectureName: "コース全体",
    status: "resolved", // 解決済みのサンプル
    messages: [
      {
        id: "m-4",
        senderType: "student",
        senderName: "高橋 健太",
        senderInitial: "高",
        avatarColorClass: "bg-success text-success-content",
        time: "3日前 10:00",
        content:
          "すべての動画を視聴しテストも合格したのですが、修了証はどこからダウンロードできますか？",
      },
      {
        id: "m-5",
        senderType: "admin",
        senderName: "システム管理者",
        senderInitial: "管",
        avatarColorClass: "bg-primary text-primary-content",
        time: "3日前 11:30",
        content:
          "お問い合わせありがとうございます。修了証はダッシュボードの「完了したコース」タブ内にある、該当コースのメニュー（三点リーダー）からダウンロード可能です。お手数ですがご確認ください。",
      },
    ],
  },
]

// 絞り込み用のコース選択肢
const COURSE_OPTIONS = [
  { element: "すべてのコース", value: "all" },
  { element: "【年次】コンプライアンス研修", value: "c-1" },
  { element: "新任マネージャー向け 基礎講座", value: "c-2" },
  { element: "情報セキュリティ基礎", value: "c-3" },
]

export default function QuestionsPage() {
  const records = MOCK_QUESTIONS

  // ==========================================
  // ★ State管理
  // ==========================================
  const [activeTab, setActiveTab] = useState<QuestionStatus>("unanswered")
  const [searchText, setSearchText] = useState("")
  const [filterCourse, setFilterCourse] = useState("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // ==========================================
  // ★ 添付ファイル（画像プレビュー）用の State と Ref
  // ==========================================
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ファイルが選択された時の処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // バイト数上限チェック (5MB)
    const MAX_SIZE_MB = 5
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`ファイルサイズは${MAX_SIZE_MB}MB以下にしてください。`)
      e.target.value = ""
      return
    }

    setAttachedFile(file)
    // ローカルファイルをブラウザで表示可能な一時URLに変換する
    setPreviewUrl(URL.createObjectURL(file))
  }

  // 添付ファイルを削除する処理
  const handleRemoveAttachment = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl) // メモリ解放（プロの作法）
    }
    setAttachedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // ==========================================
  // ★ 絞り込み処理
  // ==========================================
  const filteredQuestions = useMemo(() => {
    return records.filter((q) => {
      // 1. タブの切り替え (未回答 / 解決済み)
      const matchTab = q.status === activeTab
      // 2. テキスト検索 (質問タイトル or 氏名)
      const matchText =
        !searchText || q.title.includes(searchText) || q.user.name.includes(searchText)
      // 3. コースの絞り込み
      const matchCourse = filterCourse === "all" || q.course.id === filterCourse

      return matchTab && matchText && matchCourse
    })
  }, [records, activeTab, searchText, filterCourse])

  // 右ペインに表示する選択中の質問データを取得
  const selectedQuestion = useMemo(() => {
    return records.find((q) => q.id === selectedId) || null
  }, [records, selectedId])

  // 別の人を選択したら入力中のファイルをリセットする
  useEffect(() => {
    handleRemoveAttachment()
  }, [selectedId])

  // タブや絞り込みが変更された時、選択中のIDがリストになければクリアする（または先頭を選択する）
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const isSelectedStillVisible = filteredQuestions.some((q) => q.id === selectedId)
      if (!isSelectedStillVisible) {
        setSelectedId(filteredQuestions[0] ? filteredQuestions[0].id : null) // 見えなくなったらリストの先頭を自動選択
      }
    } else {
      setSelectedId(null) // リストが空なら何も選択しない
    }
  }, [filteredQuestions, selectedId])

  // 未回答の合計数を計算（バッジ表示用）
  const unansweredCount = records.filter((q) => q.status === "unanswered").length

  return (
    <Container className="max-w-7xl py-8 h-[calc(100vh-64px)] flex flex-col">
      {/* ==========================================
          ページタイトルとフィルター
      ========================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageCircleMore /> 受講者からの質問
            {unansweredCount > 0 && (
              <Badge color="error" className="ml-2">
                {unansweredCount}件の未回答
              </Badge>
            )}
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            コースに関する質問の確認と返信を行います。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
            <TextInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              color="ghost"
              placeholder="質問や氏名で検索..."
              className="w-full sm:w-64 pl-9 bg-base-100"
            />
          </div>
          {/* ★ 絞り込みボタンを廃止し、コース選択プルダウンを追加 */}
          <Select
            options={COURSE_OPTIONS}
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            color="ghost"
            className="w-full sm:w-auto bg-base-100"
          />
        </div>
      </div>

      {/* ==========================================
          メインワークスペース（2ペインレイアウト）
      ========================================== */}
      <div className="flex flex-1 gap-6 min-h-0">
        {/* --- 左カラム：質問リスト（受信トレイ） --- */}
        <div className="w-full md:w-96 bg-base-100 rounded-box shadow-sm border border-base-200 flex flex-col overflow-hidden shrink-0">
          {/* ★ タブの切り替え制御 */}
          <div className="p-2 border-b border-base-200 bg-base-200/30 flex gap-1 shrink-0">
            <button
              onClick={() => setActiveTab("unanswered")}
              className={`btn btn-sm btn-ghost flex-1 ${activeTab === "unanswered" ? "text-primary bg-primary/10" : "text-base-content/60"}`}
            >
              未回答 ({unansweredCount})
            </button>
            <button
              onClick={() => setActiveTab("resolved")}
              className={`btn btn-sm btn-ghost flex-1 ${activeTab === "resolved" ? "text-primary bg-primary/10" : "text-base-content/60"}`}
            >
              解決済み
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => setSelectedId(q.id)}
                  className={`p-4 border-b border-base-200 cursor-pointer transition-colors ${selectedId === q.id ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-base-200/50 border-l-4 border-l-transparent"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="avatar placeholder">
                        <div className={`w-6 rounded-full text-[10px] ${q.user.avatarColorClass}`}>
                          {q.user.initial}
                        </div>
                      </div>
                      <span className="font-bold text-sm">{q.user.name}</span>
                    </div>
                    <span className="text-xs text-base-content/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {q.time}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold mb-1 truncate">{q.title}</h3>
                  <p className="text-xs text-base-content/60 line-clamp-2">{q.summary}</p>
                  <div className="mt-2 text-[10px] text-primary font-medium bg-primary/10 inline-block px-2 py-0.5 rounded">
                    {q.course.name}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-base-content/50">
                該当する質問がありません。
              </div>
            )}
          </div>
        </div>

        {/* --- 右カラム：質問詳細と返信フォーム --- */}
        <div className="flex-1 bg-base-100 rounded-box shadow-sm border border-base-200 flex flex-col overflow-hidden min-w-0 md:flex">
          {selectedQuestion ? (
            <>
              {/* 詳細のヘッダー */}
              <div className="p-5 border-b border-base-200 bg-base-100 shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{selectedQuestion.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-base-content/70">
                      <span className="flex items-center gap-1 font-medium text-primary">
                        <ExternalLink className="w-4 h-4" /> {selectedQuestion.course.name}
                      </span>
                      <span>レクチャー: {selectedQuestion.lectureName}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedQuestion.status === "unanswered" ? (
                      <Badge color="warning" size="sm" className="text-warning-content border-none">
                        未回答
                      </Badge>
                    ) : (
                      <Badge color="ghost" size="sm" className="bg-base-200">
                        解決済み
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* チャット履歴エリア */}
              <div className="flex-1 overflow-y-auto p-6 bg-base-200/30">
                {selectedQuestion.messages.map((msg) => {
                  const isAdmin = msg.senderType === "admin"
                  return (
                    <div
                      key={msg.id}
                      className={`chat ${isAdmin ? "chat-end" : "chat-start"} mb-4`}
                    >
                      <div className="chat-image avatar placeholder">
                        <div className={`w-10 rounded-full ${msg.avatarColorClass}`}>
                          {msg.senderInitial}
                        </div>
                      </div>
                      <div className="chat-header text-xs opacity-60 mb-1">
                        {msg.senderName} <time>{msg.time}</time>
                      </div>
                      <div
                        className={`chat-bubble text-sm leading-relaxed max-w-[80%] ${isAdmin ? "chat-bubble-primary text-primary-content" : "chat-bubble-secondary text-secondary-content"}`}
                      >
                        {/* メッセージ本文 */}
                        {msg.content}

                        {/* ★ APIから画像URLが来ている場合は表示する */}
                        {msg.attachmentUrl && (
                          <div className="mt-3">
                            <img
                              src={msg.attachmentUrl}
                              alt="添付画像"
                              className="max-w-full rounded-lg border border-base-300 shadow-sm"
                              style={{ maxHeight: "200px" }} // 大きすぎる画像を制限
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 返信入力フォーム */}
              <div className="p-4 border-t border-base-200 bg-base-100 shrink-0">
                <div className="flex flex-col gap-3">
                  {/* ★ 添付した画像のプレビュー領域 */}
                  {previewUrl && (
                    <div className="relative w-fit">
                      <img
                        src={previewUrl}
                        alt="プレビュー"
                        className="h-24 w-auto rounded border border-base-300 object-cover shadow-sm"
                      />
                      <button
                        onClick={handleRemoveAttachment}
                        className="absolute -top-2 -right-2 btn btn-xs btn-circle btn-error text-white shadow"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <TextArea
                    placeholder={`${selectedQuestion.user.name}さんへ返信を入力...`}
                    color="neutral"
                    className="w-full h-24 resize-none"
                  />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {/* ★ 隠しファイル入力 */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png, image/gif"
                        className="hidden"
                      />
                      {/* クリップボタン */}
                      <Button
                        color="ghost"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-square text-base-content/60 hover:text-primary hover:bg-primary/10"
                        title="画像を添付"
                      >
                        <Paperclip className="w-5 h-5" />
                      </Button>

                      <span className="text-xs text-base-content/50 hidden sm:flex items-center gap-1 ml-2">
                        <AlertCircle className="w-4 h-4" />
                        返信は受講者のSlackにも通知されます。
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        color="ghost"
                        className="text-primary border border-primary hover:bg-primary hover:text-white"
                      >
                        返信のみ
                      </Button>
                      <Button color="primary">
                        <Check className="w-4 h-4 mr-1" /> 返信して解決済みにする
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // 何も選択されていない場合のプレースホルダー
            <div className="flex-1 flex flex-col items-center justify-center text-base-content/40">
              <MessageCircleMore className="w-16 h-16 mb-4 opacity-20" />
              <p>左側のリストから質問を選択してください</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
