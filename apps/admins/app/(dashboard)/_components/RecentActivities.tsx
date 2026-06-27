import { Clock } from "lucide-react"

export const RecentActivities = () => {
  return (
    <div className="bg-base-100 rounded-box border border-base-200 p-4">
      <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 opacity-60" /> 最近のアクティビティ
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-start">
          <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0"></div>
          <div className="text-xs">
            <p className="font-bold">田中 次郎さんが受講完了</p>
            <p className="opacity-60 mt-0.5">コンプライアンス研修 • 10分前</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
          <div className="text-xs">
            <p className="font-bold">コースの公開設定が更新されました</p>
            <p className="opacity-60 mt-0.5">情報セキュリティ • 2時間前</p>
          </div>
        </div>
      </div>
    </div>
  )
}

RecentActivities.displayName = "RecentActivities"
