import { FileText, HelpCircle, MonitorPlay, Plus, Video } from "lucide-react"
import React from "react"

export const AppendLectureButtonList = () => {
  return (
    <div className="mt-3 ml-10">
      <div className="dropdown dropdown-bottom dropdown-end sm:dropdown-right sm:dropdown-bottom">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
        >
          <Plus className="w-4 h-4 mr-1" /> レクチャーを追加
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-10 menu p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-200 mt-1"
        >
          <li className="menu-title text-xs py-2">レイアウトタイプを選択</li>
          <li>
            <a className="py-3">
              <Video className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="font-medium">動画のみ</span>
              </div>
            </a>
          </li>
          <li>
            <a className="py-3">
              <FileText className="w-4 h-4 text-accent" />
              <div className="flex flex-col">
                <span className="font-medium">記事 / 説明文</span>
              </div>
            </a>
          </li>
          <li>
            <a className="py-3">
              <HelpCircle className="w-4 h-4 text-secondary" />
              <div className="flex flex-col">
                <span className="font-medium">テスト / アンケート</span>
              </div>
            </a>
          </li>
          <li>
            <a className="py-3">
              <MonitorPlay className="w-4 h-4 text-info" />
              <div className="flex flex-col">
                <span className="font-medium">動画 + テスト</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
