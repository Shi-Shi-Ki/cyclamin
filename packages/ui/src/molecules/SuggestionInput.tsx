"use client"

import React, { useEffect, useRef, useState } from "react"
import { Menu, MenuItem } from "./Menu"
import { TextInput } from "../atoms/TextInput"
import { Button } from "../atoms/Button"
import { cn } from "../../../common/src/util"

export interface ISuggestionElement {
  id: string
  value: string
}

export interface ISuggestionInput extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onChange" | "onSelect"
> {
  TextInputComponent: React.ElementType
  ButtonComponent: React.ElementType
  suggestions: ISuggestionElement[]
  isLoading?: boolean
  label?: React.ReactNode
  textInputProps?: Omit<React.ComponentProps<typeof TextInput>, "value" | "onChange">
  buttonInputProps?: React.ComponentProps<typeof Button>
  enteredValue?: string
  onChange?: (value: string) => void
  onSelect?: (selectedItem: ISuggestionElement) => void
}

export const SuggestionInput = React.forwardRef<HTMLDivElement, ISuggestionInput>(
  (
    {
      className,
      TextInputComponent,
      ButtonComponent,
      suggestions,
      isLoading,
      label,
      textInputProps,
      buttonInputProps,
      enteredValue,
      onChange,
      onSelect,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(enteredValue)
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // 入力値が変わった時の処理
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      if (onChange) {
        onChange(value) // 親に変更を通知（親側でディバウンス処理を行う）
      }
      setIsOpen(value.length > 0)
    }

    // 候補から選択した時の処理
    const handleSelect = (suggestionElement: ISuggestionElement) => {
      setInputValue(suggestionElement.value)
      setIsOpen(false) // リストを閉じる
      // if (onChange) {
      //   onChange(suggestionElement.value)
      // }
      if (onSelect) {
        onSelect(suggestionElement)
      }
    }

    // 外側をクリックしたらリストを閉じる処理
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)

      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
      setInputValue(enteredValue)
    }, [enteredValue])

    return (
      <>
        <div className={cn("form-control w-full relative", className)} ref={wrapperRef} {...props}>
          {label && (
            <label className="label">
              <span className="label-text font-bold">{label}</span>
            </label>
          )}
          <TextInputComponent
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => {
              if (inputValue && inputValue.length > 0) {
                setIsOpen(true)
              }
            }}
            {...textInputProps}
          />
          {isOpen && (isLoading || suggestions.length > 0) && (
            <Menu className="absolute top-full left-0 z-[100] w-full p-2 mt-1 shadow-2xl bg-base-100 rounded-box border border-base-300 max-h-48 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-sm text-base-content/50">
                  <span className="loading loading-spinner loading-sm"></span> 検索中...
                </div>
              ) : (
                suggestions.length > 0 &&
                suggestions.map((suggestion, idx) => (
                  <MenuItem key={`suggestion_${idx}`}>
                    <ButtonComponent
                      value={suggestion.id}
                      onClick={() => handleSelect(suggestion)}
                      {...buttonInputProps}
                    >
                      {suggestion.value}
                    </ButtonComponent>
                  </MenuItem>
                ))
              )}
            </Menu>
          )}
        </div>
      </>
    )
  }
)
SuggestionInput.displayName = "SuggestionInput"
