"use client";

import React, { useEffect, useState } from "react";
import { Model, Serializer } from "survey-core";
import { Survey } from "survey-react-ui";

// ▼ 1. CSSは V1 (安定版) を使用
import "survey-core/survey-core.min.css";
import "survey-core/i18n/japanese";

// カスタムプロパティ定義
Serializer.addProperty("survey", {
  name: "videoUrl",
  type: "string",
  category: "general",
});
Serializer.addProperty("survey", {
  name: "slideUrl",
  type: "string",
  category: "general",
});
Serializer.addProperty("question", { name: "score", type: "number" });

export default function TrainingPage() {
  const [surveyModel, setSurveyModel] = useState<Model | null>(null);
  const [mediaType, setMediaType] = useState<"video" | "slide" | null>(null);
  const [mediaSource, setMediaSource] = useState<string>("");
  const [resultScore, setResultScore] = useState({ earned: 0, max: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const [surveyJsonData, setSurveyJsonData] = useState<any>(null);

  useEffect(() => {
    const jsonString = localStorage.getItem("mock_survey_json");

    if (jsonString) {
      const surveyJson = JSON.parse(jsonString);
      setSurveyJsonData(surveyJson);

      const model = new Model(surveyJson);
      model.locale = "ja";

      model.onComplete.add((sender) => {
        // --- 1. スコア計算 ---
        let earnedPoints = 0;
        let maxPoints = 0;

        sender.getAllQuestions().forEach((question) => {
          if (
            question.correctAnswer === undefined ||
            question.correctAnswer === null
          )
            return;
          const points = question.score || 1;
          maxPoints += points;
          if (question.isAnswerCorrect()) {
            earnedPoints += points;
          }
        });
        setResultScore({ earned: earnedPoints, max: maxPoints });

        // --- 2. 表示用モデルの作成 ---
        const reviewModel = new Model(surveyJson);
        reviewModel.data = sender.data;
        reviewModel.locale = "ja";
        reviewModel.mode = "display";
        reviewModel.questionsOnPageMode = "singlePage";

        // ▼▼▼ 追加: HTMLタグを有効にするための魔法のコード ▼▼▼
        reviewModel.onTextMarkdown.add((sender, options) => {
          // これにより、descriptionやtitleに含まれるHTMLタグがブラウザで解釈されるようになります
          options.html = options.text;
        });
        // ▲▲▲ 追加ここまで ▲▲▲

        // --- 3. テキスト書き換えロジック ---
        reviewModel.getAllQuestions().forEach((question) => {
          const isCorrect = question.isAnswerCorrect();

          if (isCorrect) {
            question.title = `✅ ${question.title}`;
          } else {
            question.title = `❌ ${question.title}`;

            let correctText = question.correctAnswer;
            if (Array.isArray(correctText)) {
              correctText = correctText.join(", ");
            }

            const currentDesc = question.description
              ? `${question.description}<br/>`
              : "";
            // Tailwindのクラスを含むHTML文字列をセット
            question.description = `${currentDesc}<span class="text-red-600 font-bold">【正解】: ${correctText}</span>`;
          }
        });

        setSurveyModel(reviewModel);
        setIsCompleted(true);
      });

      if (surveyJson.slideUrl) {
        setMediaType("slide");
        setMediaSource(surveyJson.slideUrl);
      } else if (surveyJson.videoUrl) {
        setMediaType("video");
        setMediaSource(surveyJson.videoUrl);
      }

      setSurveyModel(model);
    }
  }, []);

  const handleRetake = () => {
    if (surveyJsonData) {
      window.location.reload();
    }
  };

  if (!surveyModel) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="h-screen flex flex-col">
      <header
        className={`h-16 text-white flex items-center justify-between px-6 shadow-md z-10 transition-colors duration-500 ${isCompleted ? "bg-green-700" : "bg-indigo-900"}`}
      >
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg">
            {surveyModel.title || "研修課題"}
          </h1>
          {isCompleted && (
            <span className="bg-white text-green-800 px-3 py-1 rounded-full font-bold text-sm">
              結果: {resultScore.earned} / {resultScore.max} 点
            </span>
          )}
        </div>
        {isCompleted && (
          <button
            onClick={handleRetake}
            className="bg-white text-green-800 px-4 py-2 rounded shadow hover:bg-gray-100 font-bold text-sm"
          >
            もう一度受ける ↻
          </button>
        )}
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/3 bg-black flex items-center justify-center relative p-4">
          {mediaType === "video" && (
            <iframe
              className="w-full aspect-video shadow-2xl border border-gray-700 rounded-lg"
              src={`https://www.youtube.com/embed/${mediaSource}`}
              title="Video"
              frameBorder="0"
              allowFullScreen
            />
          )}
          {mediaType === "slide" && (
            <iframe
              className="w-full aspect-video shadow-2xl border border-gray-700 rounded-lg bg-white"
              src={mediaSource}
              title="Slide"
              frameBorder="0"
              allowFullScreen
              allow="autoplay"
            />
          )}
        </div>
        <div className="md:w-2/3 overflow-y-auto bg-gray-50 border-l border-gray-200">
          <div className="p-8 max-w-4xl mx-auto">
            {isCompleted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                <h3 className="font-bold mb-2">お疲れ様でした！</h3>
                <p>
                  回答の送信が完了しました。各設問の正誤を確認してください。
                </p>
              </div>
            )}
            <Survey model={surveyModel} />
          </div>
        </div>
      </div>
    </div>
  );
}
