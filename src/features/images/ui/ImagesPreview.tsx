import type { ComponentProps } from "react"
import type { UseImageUpload } from "../models/useImageUpload/useImageUpload.types"
import {
  ErrorImagePreview,
  NewImagePreview,
  UploadedImagePreview,
  UploadingImagePreview,
} from "./PreviewCards"

type PreviewProps<T extends readonly string[], Slot extends T[number]> = {
  slot: Slot
  uploads: UseImageUpload<T>
  buttonProps?: object
} & ComponentProps<"div">

export function ImagesPreview<
  T extends readonly string[],
  Slot extends T[number],
>({ uploads, buttonProps, slot, ...props }: PreviewProps<T, Slot>) {
  return (
    <div {...props}>
      {uploads.preview(slot).map((image) => {
        switch (image.state) {
          case "raw":
          case "compressed":
            return (
              <NewImagePreview
                key={image.id}
                onRemoveImage={uploads.removeImage}
                buttonProps={buttonProps}
                url={image.url}
                id={image.id}
                state={image.state}
              />
            )
          case "uploaded":
            return (
              <UploadedImagePreview
                key={image.id}
                onRemoveImage={uploads.removeImage}
                buttonProps={buttonProps}
                url={image.url}
                id={image.id}
              />
            )
          case "error":
            return (
              <ErrorImagePreview
                key={image.id}
                retryUpload={(id) => uploads.uploadOne(slot, id)}
                onRemoveImage={uploads.removeImage}
                buttonProps={buttonProps}
                url={image.url}
                reason={image.reason}
                invalidFormat={image.invalidFormat}
                exceedsSize={image.exceedsSize}
                id={image.id}
              />
            )
          case "uploading":
            return (
              <UploadingImagePreview
                key={image.id}
                onRemoveImage={uploads.removeImage}
                buttonProps={buttonProps}
                url={image.url}
                id={image.id}
                progress={image.progress}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
