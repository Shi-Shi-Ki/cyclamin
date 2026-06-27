import * as React from "react"
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"

export type ValidationStatus = "error" | "warning" | "success" | "none"

export interface ValidationProps {
  children: React.ReactNode
  message?: string // RHFの error.message などを直接受け取る
  status?: ValidationStatus // デフォルトは "none" または errorの有無で判定
}

export const Validation = ({ children, message, status = "none" }: ValidationProps) => {
  // message があるのに status が "none" の場合は、自動的に "error" 扱いにする親切設計
  const currentStatus = message && status === "none" ? "error" : status

  // ステータスに応じた色とアイコンを決定
  const getStatusConfig = () => {
    switch (currentStatus) {
      case "error":
        return { colorClass: "text-error", Icon: AlertCircle }
      case "warning":
        return { colorClass: "text-warning", Icon: AlertTriangle }
      case "success":
        return { colorClass: "text-success", Icon: CheckCircle2 }
      default:
        return { colorClass: "text-base-content/60", Icon: null }
    }
  }

  const { colorClass, Icon } = getStatusConfig()

  return (
    <div className="form-control w-full">
      {/* 1. 入力フォーム本体（Inputなど） */}
      {children}

      {/* 2. メッセージ領域（messageが渡された時だけ描画） */}
      <div className="label py-1 pb-2">
        {message ? (
          <span className={`label-text-alt flex items-center ${colorClass}`}>
            {Icon && <Icon className="w-4 h-4 shrink-0" />}
            &nbsp;{message}
          </span>
        ) : (
          <span className="label-text-alt flex items-center">&nbsp;</span>
        )}
      </div>
    </div>
  )
}

Validation.displayName = "Validation"
