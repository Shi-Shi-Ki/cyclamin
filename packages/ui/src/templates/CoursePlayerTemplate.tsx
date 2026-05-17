"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@repo/ui/atoms/Button"
import { Badge } from "@repo/ui/atoms/Badge"
import { HelpCircle, Send, List, FileText, CheckSquare, PlayCircle } from "lucide-react"

// ==========================================
// ★ 1. SurveyJS 関連のインポート
// ==========================================
import { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.min.css"
import "survey-core/i18n/japanese"

import "./survey-daisyui-patch.css"

// ==========================================
// ★ 2. モック用 JSON データ（APIから取得する想定）
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

interface CoursePlayerTemplateProps {
  courseTitle?: string
  isPreview?: boolean
}

export const CoursePlayerTemplate = ({
  courseTitle = "評価制度理解",
  isPreview,
}: CoursePlayerTemplateProps) => {
  const [activeTab, setActiveTab] = useState("quiz")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // ==========================================
  // ★ 3. SurveyJS モデルの初期化とDaisyUI化
  // ==========================================
  const survey = useMemo(() => {
    const model = new Model(mockSurveyJson)
    model.showNavigationButtons = false
    model.showTitle = false
    model.showPageTitles = false

    // daisyUIのクラスを「+=」で安全に追加し、フォームをdaisyUIデザインにする
    model.onUpdateQuestionCssClasses.add((_, options) => {
      const classes = options.cssClasses
      const type = options.question.getType()

      // ★ 修正1: 質問全体の「外枠」は mainRoot です！ここに下線を引きます。
      if (classes.mainRoot) classes.mainRoot += " pb-6 mb-6 border-b border-base-200"
      if (classes.title) classes.title += " label-text font-bold text-base mb-2 block"
      if (classes.description) classes.description += " text-sm text-base-content/70 mb-4 block"
      if (classes.requiredText) classes.requiredText += " text-error ml-1"

      // ★ 修正2: テキスト系の「入力フォーム自体」は root です！
      if (type === "text") {
        if (classes.root) classes.root = "input input-primary"
      }
      // 複数行テキストエリア
      else if (type === "comment") {
        if (classes.root) classes.root = "textarea textarea-primary"
      }
      // ドロップダウンをdaisyUIの input-bordered 風にする
      else if (type === "dropdown" || type === "tagbox") {
        // 入力枠のコンテナ：標準クラスを活かしたまま、daisyUIの枠線と光彩をドッキング（高さは自動調整）
        if (classes.control) {
          classes.control =
            " input input-primary w-full h-auto py-1 flex items-center bg-base-100 text-base-content"
        }
        // 文字入力フィールド：背景を透明にして枠線の邪魔をしないようにする
        if (classes.filterStringInput) {
          classes.filterStringInput = " bg-transparent text-base-content"
        }
      }
    })

    model.onComplete.add((sender) => {
      console.log("回答データ:", sender.data)
      alert("回答を送信しました！")
    })
    return model
  }, [])

  // JSONから動画IDを取り出す
  const videoId = mockSurveyJson.videoUrl

  // 自作の送信ボタンが押された時の処理
  const handleCustomSubmit = () => survey.completeLastPage()

  return (
    <main className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-base-200">
      {/* ==========================================
          左カラム：動画エリア
      ========================================== */}
      <div className="flex-1 flex flex-col bg-black relative">
        <div className="flex-1 flex items-center justify-center relative w-full aspect-video lg:aspect-auto">
          {videoId ? (
            <iframe
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-center text-white/80">
              <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-80" />
              <span className="font-medium text-lg">動画プレイヤー</span>
            </div>
          )}
        </div>
        <div className="bg-base-300/10 text-white p-4 border-t border-white/10 flex justify-between items-center hidden md:flex">
          <div>
            {isPreview && (
              <Badge className="bg-warning text-warning-content border-none mb-1 mr-2">
                プレビュー
              </Badge>
            )}
            <Badge className="bg-primary/20 text-primary border-none mb-1">STEP0</Badge>
            <h2 className="font-bold">{courseTitle}</h2>
          </div>
          <div className="text-sm opacity-60">再生時間: 15:00</div>
        </div>
      </div>

      {/* ==========================================
          右カラム：タブ付きマルチエリア
      ========================================== */}
      <div className="w-full lg:w-[450px] xl:w-[500px] bg-base-100 flex-shrink-0 flex flex-col border-l border-base-200 h-full relative">
        {/* タブヘッダー */}
        <div role="tablist" className="tabs tabs-bordered pt-2 px-2 bg-base-100 flex-shrink-0">
          <a
            role="tab"
            className={`tab ${activeTab === "toc" ? "tab-active font-bold text-primary" : ""}`}
            onClick={() => setActiveTab("toc")}
          >
            <List className="w-4 h-4 mr-1.5" /> 目次
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "quiz" ? "tab-active font-bold text-primary" : ""}`}
            onClick={() => setActiveTab("quiz")}
          >
            <HelpCircle className="w-4 h-4 mr-1.5" /> テスト
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "material" ? "tab-active font-bold text-primary" : ""}`}
            onClick={() => setActiveTab("material")}
          >
            <FileText className="w-4 h-4 mr-1.5" /> 資料
          </a>
        </div>

        {/* コンテンツエリア */}
        <div className="overflow-y-auto flex-1 bg-base-100 pb-20">
          {/* 目次タブ省略 (そのまま) */}
          {activeTab === "toc" && (
            <div className="p-4 animate-in fade-in duration-200">
              {/* 既存の目次コード */}
              <div className="mb-4 p-2">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-bold">全体の進捗</span>
                  <span className="font-bold text-primary">1/3 完了</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={33}
                  max={100}
                ></progress>
              </div>
              <ul className="menu w-full p-0 gap-1 text-base-content">
                <li className="menu-title text-sm font-semibold mt-2">第1章：評価制度について</li>
                <li>
                  <a className="flex gap-3 active bg-primary text-primary-content">
                    <PlayCircle className="w-5 h-5 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">STEP0. 評価制度理解</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="flex gap-3 hover:bg-base-200">
                    <CheckSquare className="w-5 h-5 text-base-content/30 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">理解度テスト（必須）</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* -------------------------------------
              ★ 5. タブ2: 理解度テスト（SurveyJS）
          ------------------------------------- */}
          {activeTab === "quiz" && (
            <div className="animate-in fade-in duration-200">
              <div className="p-6 pb-0">
                <p className="text-sm text-base-content/70">
                  動画を視聴しながら、以下の設問に回答してください。
                </p>
              </div>

              <div
                className="
                p-6 text-base-content 
                [&_.sv_container]:!p-0 [&_.sv_body]:!border-none
                [&_.sv_main]:!bg-transparent [&_.sd-root-modern]:!bg-transparent 
                [&_.sd-container-modern]:!bg-transparent [&_.sd-page]:!bg-transparent
                [&_.sd-element]:!bg-transparent [&_.sd-question]:!bg-transparent
                [&_.sd-title]:!text-base-content [&_.sd-description]:!text-base-content/70
                [&_.sd-item__control-label]:!text-base-content
              "
              >
                {isMounted ? (
                  <Survey model={survey} />
                ) : (
                  <div className="flex justify-center items-center py-10">
                    <span className="loading loading-spinner text-primary loading-lg"></span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* -------------------------------------
            ★ 6. 送信ボタン (SurveyJS連携)
        ------------------------------------- */}
        {activeTab === "quiz" && (
          <div className="absolute bottom-0 left-0 w-full p-4 border-t border-base-200 bg-base-100 z-10">
            <Button color="primary" className="w-full" onClick={handleCustomSubmit}>
              <Send className="w-4 h-4 mr-2" /> 回答を送信して次へ
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
