// app/components/SurveyCreatorWidget.tsx
"use client"; // クライアントコンポーネントとしてマーク

import React, { useMemo } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import { Serializer } from "survey-core";
import "survey-core/survey-core.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import "survey-core/survey.i18n";
import "survey-creator-core/survey-creator-core.i18n";

export default function SurveyCreatorWidget() {
  const creator = useMemo(() => {
    const options = {
      showLogicTab: true,
      isAutoSave: false,
    };
    const newCreator = new SurveyCreator(options);

    // 日本語化
    newCreator.locale = "ja";

    // ついでに、新しく作るアンケート自体のデフォルト言語も日本語にしておく
    // (これがないと、受講者画面のエラーメッセージが英語のままになることがあります)
    newCreator.JSON = {
      ...JSON.parse(newCreator.text || "{}"),
      locale: "ja",
    };

    // エディタのメニュー追加
    // SurveyJSの仕様でdefaultと同じ値はjsonには出力しない
    Serializer.addProperty("survey", {
      name: "videoUrl",
      type: "string",
      category: "general",
      displayName: "研修動画ID (YouTube)",
      //   default: "dQw4w9WgXcQ",
    });

    // プレビュー画面のカスタマイズ
    newCreator.onSurveyInstanceCreated.add((sender, options) => {
      // options.reason (非推奨) の代わりに options.area を使用します
      // プレビュータブが表示される時の area 名は "preview-tab" です
      if (options.area === "preview-tab") {
        // プレビュー用のサーベイインスタンスから動画IDを取得
        const videoId = options.survey.videoUrl;

        if (videoId) {
          const firstPage = options.survey.pages[0];

          if (firstPage) {
            // 1. HTML設問のインスタンスを作成
            const videoQuestion = Serializer.createClass("html");
            videoQuestion.name = "preview_video_player";
            videoQuestion.html = `
              <div style="background: #000; padding: 20px; text-align: center; margin-bottom: 20px; border-radius: 8px;">
                <h3 style="color: #fff; margin-bottom: 10px;">▼ 動画プレビュー (本番は左側に固定表示されます)</h3>
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/${videoId}" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            `;

            // 2. 先頭（インデックス0）に挿入
            // visibleIndexへの代入ではなく、addElementの第2引数で場所を指定します
            firstPage.addElement(videoQuestion, 0);
          }
        }
      }
    });

    const savedJson = localStorage.getItem("mock_survey_json");
    if (savedJson) {
      newCreator.text = savedJson;
    }

    newCreator.saveSurveyFunc = (
      saveNo: number,
      callback: (no: number, isSuccess: boolean) => void,
    ) => {
      const jsonString = newCreator.text;
      console.log("Saving to Mock DB (LocalStorage)...", jsonString);
      localStorage.setItem("mock_survey_json", jsonString);
      callback(saveNo, true);
      alert("保存しました！受講者ページを確認してください。");
    };

    return newCreator;
  }, []);

  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  );
}
