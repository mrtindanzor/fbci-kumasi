import type React from "react"
import { type ComponentProps, useRef } from "react"
import { syncTryCatch } from "@/shared/utils/tryCatch"

type VideoPickerProps = {
  onSelect(files: File[]): void
  children: React.ReactNode
} & Omit<ComponentProps<"div">, "onSelect">

export function VideoPicker({
  onSelect,
  children,
  ...props
}: VideoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const trigger = () => inputRef.current?.click()

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: For creating reusable element to trigger uploads
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
        accept="video/mp4, video/webm, video/ogg, video/quicktime, video/x-msvideo, video/x-matroska"
      />
    </div>
  )
}
