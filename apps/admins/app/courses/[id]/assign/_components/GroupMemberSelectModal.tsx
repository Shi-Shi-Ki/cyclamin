import { ChangeEvent, useMemo } from "react"
import { Group, Individual } from "../_types/type"
import { Button, Modal } from "@repo/ui"
import { Search } from "lucide-react"

interface IGroupMemberSelectModal {
  onClose: () => void
  activeModalGroup: Group | null
  modalSearchText: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  selectedUsers: Individual[]
  selectedGroups: Group[]
  handleRemoveUser: (id: string) => void
  handleAddUser: (users: Individual) => void
}

export const GroupMemberSelectModal = ({
  onClose,
  activeModalGroup,
  modalSearchText,
  onChange,
  selectedUsers,
  selectedGroups,
  handleRemoveUser,
  handleAddUser,
}: IGroupMemberSelectModal) => {
  // モーダル内で表示するメンバー（検索フィルタリング）
  const filteredModalMembers = useMemo(() => {
    if (!activeModalGroup?.members) return []
    if (!modalSearchText) return activeModalGroup.members
    return activeModalGroup.members.filter((m) => m.name.includes(modalSearchText))
  }, [activeModalGroup, modalSearchText])

  return (
    <Modal
      isOpen={activeModalGroup !== null}
      onClose={onClose}
      isOutSideClose={true}
      title={`${activeModalGroup?.name} のメンバー`}
    >
      <div className="flex flex-col h-125 -mx-6 -mb-6 mt-4 border-t border-base-200">
        {/* モーダル内検索バー固定 */}
        <div className="p-4 border-b border-base-200 bg-base-100 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="氏名で絞り込み..."
              value={modalSearchText}
              onChange={onChange}
              className="input input-sm input-bordered w-full pl-9 bg-base-100"
            />
          </div>
        </div>

        {/* モーダル内メンバーリスト（スクロール） */}
        <div className="flex-1 overflow-y-auto p-4 bg-base-200/30">
          <div className="flex flex-col gap-2">
            {filteredModalMembers.length === 0 ? (
              <div className="text-center text-sm text-base-content/50 py-10">
                該当するメンバーが見つかりません。
              </div>
            ) : (
              filteredModalMembers.map((user) => {
                const isUserAdded = selectedUsers.some((u) => u.id === user.id)
                const isParentGroupAdded = selectedGroups.some((g) => g.id === activeModalGroup?.id)

                return (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-2 rounded-lg border bg-base-100 transition-colors ${isUserAdded ? "border-primary/30" : "border-base-200"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div
                          className={`w-8 rounded-full text-xs ${isUserAdded || isParentGroupAdded ? "bg-primary text-primary-content" : "bg-neutral text-neutral-content"}`}
                        >
                          {user.initial}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm">{user.name}</div>
                        <div className="text-xs text-base-content/50">{user.dept}</div>
                      </div>
                    </div>

                    {/* ステータスとアクションの切り替え */}
                    {isParentGroupAdded ? (
                      <span className="text-xs text-base-content/50 px-2">部署として追加済み</span>
                    ) : isUserAdded ? (
                      <Button
                        size="sm"
                        color="ghost"
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-primary hover:bg-error/10 hover:text-error hover:border-error border border-primary w-24 h-8 min-h-0"
                      >
                        追加済み
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        color="ghost"
                        onClick={() => handleAddUser(user)}
                        className="text-base-content/70 hover:text-primary hover:bg-primary/10 w-24 h-8 min-h-0"
                      >
                        追加
                      </Button>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
GroupMemberSelectModal.displayName = "GroupMemberSelectModal"
