"use client"

import React, { createContext, ReactNode, useContext, useState } from "react"
import { Modal } from "../organisms/Modal"
import { Button } from "../atoms/Button"

interface ConfirmModalContextType {
  showConfirm: (
    title: string,
    message: string | ReactNode,
    onExecute: () => void,
    onCancel?: () => void
  ) => void
}

const ConfirmModalContext = createContext<ConfirmModalContextType | undefined>(undefined)

export const ConfirmModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmContent, setConfirmContent] = useState<{
    title: string
    message: string | ReactNode
    onExecute: () => void
    onCancel?: () => void
  }>({
    title: "確認",
    message: "",
    onExecute: () => {},
  })
  const showConfirm = (
    title: string,
    message: string | ReactNode,
    onExecute: () => void,
    onCancel?: () => void
  ) => {
    setConfirmContent({ title, message, onExecute, onCancel })
    setIsOpen(true)
  }
  const handleExecute = () => {
    confirmContent.onExecute()
    setIsOpen(false)
  }
  const handleCancel = () => {
    if (confirmContent.onCancel) {
      confirmContent.onCancel()
    }
    setIsOpen(false)
  }

  return (
    <ConfirmModalContext.Provider value={{ showConfirm }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={confirmContent.title}
        actions={
          <>
            <Button color="ghost" onClick={handleCancel}>
              キャンセル
            </Button>
            <Button color="primary" onClick={handleExecute}>
              OK
            </Button>
          </>
        }
      >
        <div className="py-4 text-base-content whitespace-pre-wrap">{confirmContent.message}</div>
      </Modal>
    </ConfirmModalContext.Provider>
  )
}
ConfirmModalProvider.displayName = "ConfirmModalProvider"

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext)
  if (!context) {
    throw new Error("useErrorModal must be used within an ConfirmModalContext")
  }
  return context
}
