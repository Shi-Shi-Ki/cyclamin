import { Button } from "@repo/ui"
import { AlertCircle, MessageSquare } from "lucide-react"

export const AlertSections = () => {
  return (
    <div className="flex flex-col gap-3 mb-8">
      {/* 1つ目のアラート */}
      <div className="alert alert-error shadow-sm bg-error/10 border-error/20 text-error-content py-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-error shrink-0" />
          <span className="text-sm font-bold text-base-content/70">
            コンプライアンス研修の期限切れユーザーが 12名 います。
          </span>
        </div>
        <Button
          size="sm"
          className="bg-error text-white border-none hover:bg-error/80 h-8 min-h-0 shrink-0"
        >
          一括催促を送る
        </Button>
      </div>

      {/* 2つ目のアラート */}
      <div className="alert alert-warning shadow-sm bg-warning/10 border-warning/20 text-warning-content py-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-warning shrink-0" />
          <span className="text-sm font-bold text-base-content/70">
            受講者からの新しい質問（未回答）が 3件 あります。
          </span>
        </div>
        <Button
          size="sm"
          className="bg-warning text-warning-content border-none hover:bg-warning/80 h-8 min-h-0 shrink-0"
        >
          内容を確認
        </Button>
      </div>
    </div>
  )
}

AlertSections.displayName = "AlertSections"
