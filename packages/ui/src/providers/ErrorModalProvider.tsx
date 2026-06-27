"use client"

import React, { createContext, ReactNode, useContext, useState } from "react"
import { Modal } from "../organisms/Modal"
import { Button } from "../atoms/Button"

interface ErrorModalContextType {
  showError: (title: string, message: string | ReactNode) => void
}

const ErrorModalContext = createContext<ErrorModalContextType | undefined>(undefined)

export const ErrorModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [errorContent, setErrorContent] = useState<{ title: string; message: string | ReactNode }>({
    title: "エラーが発生しました",
    message: "",
  })
  const showError = (title: string, message: string | ReactNode) => {
    setErrorContent({ title, message })
    setIsOpen(true)
  }

  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={errorContent.title}
        actions={
          <Button color="primary" onClick={() => setIsOpen(false)}>
            閉じる
          </Button>
        }
      >
        <div className="py-4 text-base-content whitespace-pre-wrap">{errorContent.message}</div>
      </Modal>
    </ErrorModalContext.Provider>
  )
}
ErrorModalProvider.displayName = "ErrorModalProvider"

export const useErrorModal = () => {
  const context = useContext(ErrorModalContext)
  if (!context) {
    throw new Error("useErrorModal must be used within an ErrorModalProvider")
  }
  return context
}
