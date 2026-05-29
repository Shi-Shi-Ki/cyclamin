"use client"

import React from "react"
import { useEffect, useRef } from "react"
import { Button } from "../atoms/Button"
import { X } from "lucide-react"

export interface IModal extends React.ComponentPropsWithRef<"dialog"> {
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
  isOutSideClose?: boolean
  title?: string
  actions?: React.ReactNode
}

export const Modal = React.forwardRef<HTMLDialogElement, IModal>(
  ({ isOpen, children, onClose, isOutSideClose, title, actions }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    // 内部のRefを、外部から渡ってきたforwardedRefにも連携する（Reactの標準機能）
    React.useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement)

    useEffect(() => {
      const dialogNode = dialogRef.current
      if (isOpen) {
        // 既に開いていなければ開く
        if (dialogNode && !dialogNode.open) {
          dialogNode.showModal()
        }
      } else {
        // 開いていれば閉じる
        if (dialogNode && dialogNode.open) {
          dialogNode.close()
        }
      }
    }, [isOpen])

    // ESCキーを押して閉じた時などに、ReactのState(isOpen)と同期させる処理
    const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
      e.preventDefault()
      onClose()
    }

    return (
      <dialog className="modal" ref={dialogRef} onCancel={handleCancel}>
        <div className="modal-box">
          <Button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            <X />
          </Button>
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          {children}
          {actions && <div className="modal-action">{actions}</div>}
        </div>
        {/* 画面の外側を押下した時に閉じるアクション */}
        {isOutSideClose && (
          <form method="dialog" className="modal-backdrop">
            <button onClick={onClose}>close</button>
          </form>
        )}
      </dialog>
    )
  }
)

Modal.displayName = "Modal"
