import { Button } from "@repo/ui"
import { ChevronRight } from "lucide-react"

export const OngoingCourses = () => {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">進行中の主要コース進捗</h2>
        <Button color="ghost" size="sm" className="text-primary">
          すべて見る
        </Button>
      </div>
      <div className="bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden">
        <table className="table w-full">
          <thead className="bg-base-200/50">
            <tr>
              <th className="text-xs font-bold">コース名</th>
              <th className="text-xs font-bold">進捗率</th>
              <th className="text-xs font-bold text-right">アクション</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-base-200/30 transition-colors">
              <td className="font-bold text-sm">【年次】コンプライアンス研修 2026</td>
              <td>
                <div className="flex items-center gap-3">
                  <progress
                    className="progress progress-primary w-24"
                    value="68"
                    max="100"
                  ></progress>
                  <span className="text-xs font-bold">68%</span>
                </div>
              </td>
              <td className="text-right">
                <Button size="sm" color="ghost" className="h-8 min-h-0 px-2">
                  進捗詳細 <ChevronRight className="w-4 h-4 ml-0.5" />
                </Button>
              </td>
            </tr>
            <tr className="hover:bg-base-200/30 transition-colors">
              <td className="font-bold text-sm">情報セキュリティ基礎テスト</td>
              <td>
                <div className="flex items-center gap-3">
                  <progress
                    className="progress progress-primary w-24"
                    value="42"
                    max="100"
                  ></progress>
                  <span className="text-xs font-bold">42%</span>
                </div>
              </td>
              <td className="text-right">
                <Button size="sm" color="ghost" className="h-8 min-h-0 px-2">
                  進捗詳細 <ChevronRight className="w-4 h-4 ml-0.5" />
                </Button>
              </td>
            </tr>
            <tr className="hover:bg-base-200/30 transition-colors">
              <td className="font-bold text-sm">新任マネージャー向け 基礎講座</td>
              <td>
                <div className="flex items-center gap-3">
                  <progress
                    className="progress progress-primary w-24"
                    value="85"
                    max="100"
                  ></progress>
                  <span className="text-xs font-bold">85%</span>
                </div>
              </td>
              <td className="text-right">
                <Button size="sm" color="ghost" className="h-8 min-h-0 px-2">
                  進捗詳細 <ChevronRight className="w-4 h-4 ml-0.5" />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

OngoingCourses.displayName = "OngoingCourses"
