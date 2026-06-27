"use client"

import React, { useMemo, useEffect } from "react"
import { useTheme } from "next-themes"

import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react"
import { Serializer } from "survey-core"

// ★ 1. ユーザー様が見つけた公式テーマをインポート！
import { LayeredDarkPanelless, LayeredLightPanelless } from "survey-core/themes"

import "survey-core/survey-core.min.css"
import "survey-creator-core/survey-creator-core.min.css"
import "survey-core/survey.i18n"
import "survey-creator-core/survey-creator-core.i18n"

const ALLOWED_QUESTION_TYPES = [
  "text",
  "tagbox",
  "boolean",
  "checkbox",
  "rating",
  "radiogroup",
  "slider",
  "dropdown",
  "comment",
]

export const SurveyCreatorWidget = () => {
  const { resolvedTheme } = useTheme()

  const creator = useMemo(() => {
    const options = {
      showLogicTab: true,
      isAutoSave: false,
    }
    const newCreator = new SurveyCreator(options)

    const existingItems = newCreator.toolbox.items.map((item) => item.name)
    existingItems.forEach((itemName) => {
      if (!ALLOWED_QUESTION_TYPES.includes(itemName)) {
        newCreator.toolbox.removeItem(itemName)
      }
    })

    newCreator.locale = "ja"
    newCreator.JSON = { ...JSON.parse(newCreator.text || "{}"), locale: "ja" }

    Serializer.addProperty("survey", {
      name: "videoUrl",
      type: "string",
      category: "general",
      displayName: "研修動画ID (YouTube)",
    })

    newCreator.onSurveyInstanceCreated.add((sender, options) => {
      if (options.area === "preview-tab") {
        const videoId = options.survey.videoUrl
        if (videoId) {
          const firstPage = options.survey.pages[0]
          if (firstPage) {
            const videoQuestion = Serializer.createClass("html")
            videoQuestion.name = "preview_video_player"
            videoQuestion.html = `
              <div style="background: #000; padding: 20px; text-align: center; margin-bottom: 20px; border-radius: 8px;">
                <h3 style="color: #fff; margin-bottom: 10px;">▼ 動画プレビュー</h3>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameBorder="0" allowFullScreen></iframe>
              </div>
            `
            firstPage.addElement(videoQuestion, 0)
          }
        }
      }
    })

    const savedJson = localStorage.getItem("mock_survey_json")
    if (savedJson) {
      newCreator.text = savedJson
    }

    newCreator.saveSurveyFunc = (saveNo, callback) => {
      localStorage.setItem("mock_survey_json", newCreator.text)
      callback(saveNo, true)
      alert("保存しました！受講者ページを確認してください。")
    }

    return newCreator
  }, [])

  // ==========================================
  // ★ 2. テーマの切り替えを監視して、公式の関数で適用する
  // ==========================================
  useEffect(() => {
    // ユーザー様が見つけた `applyTheme` は、なんとエディタ本体（creator）にも使えます！
    if (resolvedTheme === "dark") {
      creator.applyTheme(LayeredDarkPanelless)
    } else {
      creator.applyTheme(LayeredLightPanelless)
    }
  }, [resolvedTheme, creator])

  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  )
}

SurveyCreatorWidget.displayName = "SurveyCreatorWidget"
