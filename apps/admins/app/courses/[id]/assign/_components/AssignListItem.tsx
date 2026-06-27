import { Button } from "@repo/ui"
import { Building2, Check, Plus, Users } from "lucide-react"
import { Group, Individual } from "../_types/type"

const isGroup = (item: Group | Individual): item is Group => {
  return "count" in item
}

interface IAssignListItem {
  item: Group | Individual
  selectedItems: (Group | Individual)[]
  onSelectMember?: () => void
  onAdd: () => void
}

export const AssignListItem = ({ item, selectedItems, onSelectMember, onAdd }: IAssignListItem) => {
  const isGroupItem = isGroup(item)
  const hasMembers = isGroupItem && item.members && item.members.length > 0
  const isSelected = selectedItems.some((selected) => selected.id === item.id)

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${isSelected ? "bg-primary/5 border-primary/20" : "hover:bg-base-200/50 border-transparent group"}`}
    >
      <div className="flex items-center gap-3">
        {isGroupItem ? (
          <Building2
            className={`w-5 h-5 ${isSelected ? "text-primary" : "text-base-content/40"}`}
          />
        ) : (
          <div className="avatar placeholder">
            <div
              className={`w-8 rounded-full text-xs ${isSelected ? "bg-primary text-primary-content" : "bg-neutral text-neutral-content"}`}
            >
              {item.initial}
            </div>
          </div>
        )}
        <div>
          <div className="font-bold text-sm">{item.name}</div>
          <div className="text-xs text-base-content/50">
            {isGroupItem ? `約 ${item.count.toLocaleString()}名` : item.dept}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {hasMembers && onSelectMember && (
          <Button
            size="sm"
            color="ghost"
            onClick={onSelectMember}
            className="h-8 min-h-0 text-xs text-base-content/70"
          >
            <Users className="w-3 h-3 mr-1" /> メンバーから選ぶ
          </Button>
        )}

        {isSelected ? (
          <span className="text-xs font-bold text-primary flex items-center gap-1 w-20 justify-end">
            <Check className="w-4 h-4" /> 追加済み
          </span>
        ) : (
          <Button
            size="sm"
            color="ghost"
            onClick={onAdd}
            // 個人の場合は常に表示、グループの場合はホバー時のみ表示（元の仕様に準拠）
            className={`text-primary border border-primary hover:bg-primary hover:text-white h-8 min-h-0 w-20 ${isGroupItem ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""}`}
          >
            <Plus className="w-4 h-4 mr-1" /> 追加
          </Button>
        )}
      </div>
    </div>
  )
}

AssignListItem.displayName = "AssignListItem"
