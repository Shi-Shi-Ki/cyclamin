import { Button } from "@repo/ui"
import { Download, Mail, Plus } from "lucide-react"

export const QuickActions = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">クイックアクション</h2>
      <div className="grid grid-cols-1 gap-2">
        <Button className="justify-start bg-base-100 border-base-200 hover:bg-base-200 text-base-content normal-case font-medium">
          <Plus className="w-4 h-4 mr-3 text-primary" /> 新規コースを作成
        </Button>
        <Button className="justify-start bg-base-100 border-base-200 hover:bg-base-200 text-base-content normal-case font-medium">
          <Mail className="w-4 h-4 mr-3 text-primary" /> 一括リマインドを送信
        </Button>
        <Button className="justify-start bg-base-100 border-base-200 hover:bg-base-200 text-base-content normal-case font-medium">
          <Download className="w-4 h-4 mr-3 text-primary" /> 成績レポートをDL (CSV)
        </Button>
      </div>
    </div>
  )
}

QuickActions.displayName = "QuickActions"
