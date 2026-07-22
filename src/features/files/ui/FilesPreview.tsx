import type { ComponentProps } from "react"
import type { UseFileUpload } from "../models/useFileUpload/useFileUpload.types"
import {
  ErrorFilePreview,
  NewFilePreview,
  UploadedFilePreview,
  UploadingFilePreview,
} from "./PreviewCards"

type PreviewProps<T extends readonly string[], Slot extends T[number]> = {
  slot: Slot
  uploads: UseFileUpload<T>
  buttonProps?: object
} & ComponentProps<"div">

export function FilesPreview<
  T extends readonly string[],
  Slot extends T[number],
>({ uploads, buttonProps, slot, ...props }: PreviewProps<T, Slot>) {
  return (
    <div {...props}>
      {uploads.preview(slot).map((file) => {
        switch (file.state) {
          case "raw":
            return (
              <NewFilePreview
                key={file.id}
                onRemoveFile={uploads.removeFile}
                buttonProps={buttonProps}
                url={file.url}
                id={file.id}
                fileName={file.fileName}
                state={file.state}
              />
            )
          case "uploaded":
            return (
              <UploadedFilePreview
                key={file.id}
                onRemoveFile={uploads.removeFile}
                buttonProps={buttonProps}
                url={file.url}
                id={file.id}
                fileName={file.fileName}
              />
            )
          case "error":
            return (
              <ErrorFilePreview
                key={file.id}
                retryUpload={(id) => uploads.uploadOne(slot, id)}
                onRemoveFile={uploads.removeFile}
                buttonProps={buttonProps}
                url={file.url}
                reason={file.reason}
                invalidFormat={file.invalidFormat}
                exceedsSize={file.exceedsSize}
                id={file.id}
                fileName={file.fileName}
              />
            )
          case "uploading":
            return (
              <UploadingFilePreview
                key={file.id}
                onRemoveFile={uploads.removeFile}
                buttonProps={buttonProps}
                url={file.url}
                id={file.id}
                progress={file.progress}
                fileName={file.fileName}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
