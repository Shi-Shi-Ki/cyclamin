// app/admin/page.tsx
"use client";

import dynamic from "next/dynamic";

// SSRを無効化してコンポーネントを読み込む
const SurveyCreatorWidget = dynamic(
  () => import("../components/SurveyCreatorWidget"),
  { ssr: false },
);

export default function AdminPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">研修作成画面 (運営用)</h1>
        <a
          href="/training"
          target="_blank"
          className="bg-blue-500 px-4 py-2 rounded text-sm hover:bg-blue-600"
        >
          受講者ページを別タブで開く ➡
        </a>
      </div>
      <div className="flex-1">
        {/* クライアントサイドでのみレンダリングされる */}
        <SurveyCreatorWidget />
      </div>
    </div>
  );
}
