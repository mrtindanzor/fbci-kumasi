import type React from "react"
import { type ComponentProps, useRef } from "react"
import { syncTryCatch } from "@/shared/utils/tryCatch"

type FilePickerProps = {
  onSelect(files: File[]): void
  children: React.ReactNode
  multiple?: boolean
  accept?: string
} & Omit<ComponentProps<"div">, "onSelect">

export function FilePicker({
  onSelect,
  children,
  multiple,
  accept,
  ...props
}: FilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const trigger = () => inputRef.current?.click()

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: For creating resuable element to trigger uploads
    <div {...props} onClick={trigger} onKeyUp={trigger}>
      {children}
      <input
        ref={inputRef}
        onChange={(e) => {
          const selectedFiles = e.currentTarget.files
          const result = syncTryCatch(() => Array.from(selectedFiles ?? []))
          if (result.success) onSelect(result.data)

          e.currentTarget.value = ""
        }}
        hidden
        type="file"
        multiple={multiple}
        accept={accept}
      />
    </div>
  )
}
