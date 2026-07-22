import { CloudCheck, FileText, RotateCw, X } from "lucide-react"
import type { ComponentProps } from "react"
import { Button, Pill } from "@/shared/ui/primitives/button"
import type { ButtonProps } from "@/shared/ui/primitives/button/types"
import { Visibility } from "@/shared/ui/primitives/Visibility"
import { cn } from "@/shared/utils/cn"
import type {
  FilePreviewProps,
  FileStates,
  WithFileErrorState,
  WithFileSuccessState,
  WithRawFileState,
  WithUploadingState,
} from "../files.contracts.types"

type PreviewProps<
  State extends FileStates,
  T extends { state: State; retryUpload: unknown },
> = State extends "error" ? Omit<T, "state"> : Omit<T, "state" | "retryUpload">

export function UploadedFilePreview({
  onRemoveFile,
  buttonProps,
  url,
  id,
  fileName,
}: PreviewProps<"uploaded", WithFileSuccessState<FilePreviewProps>>) {
  return (
    <PreviewWrapper>
      <div className="size-full flex flex-col items-center justify-center gap-2 p-2">
        <FileText className="size-8 text-primary" />
        <p className="text-xs text-center line-clamp-2 text-on-surface">
          {fileName}
        </p>
      </div>

      <RemoveFileButton
        {...buttonProps}
        close={() => onRemoveFile({ state: "uploaded", url, id })}
      />

      <Pill
        x="center"
        y="center"
        title="File uploaded"
        className="absolute bottom-1 left-1 p-0.5 opacity-80 bg-secondary text-white"
      >
        <CloudCheck className="size-5" />
      </Pill>
    </PreviewWrapper>
  )
}

export function NewFilePreview({
  onRemoveFile,
  buttonProps,
  id,
  state,
  fileName,
}: PreviewProps<"raw", WithRawFileState<FilePreviewProps>> & {
  state: "raw"
}) {
  return (
    <PreviewWrapper>
      <div className="size-full flex flex-col items-center justify-center gap-2 p-2">
        <FileText className="size-8 text-primary" />
        <p className="text-xs text-center line-clamp-2 text-on-surface">
          {fileName}
        </p>
      </div>

      <RemoveFileButton
        {...buttonProps}
        close={() => onRemoveFile({ state, id })}
      />
    </PreviewWrapper>
  )
}

export function ErrorFilePreview({
  onRemoveFile,
  buttonProps,
  reason,
  invalidFormat,
  id,
  exceedsSize,
  retryUpload,
  fileName,
}: PreviewProps<"error", WithFileErrorState<FilePreviewProps>>) {
  return (
    <PreviewWrapper
      title={`Error: ${reason}`}
      className="text-xs text-error flex items-end size-full text-center"
    >
      <RemoveFileButton
        {...buttonProps}
        close={() => onRemoveFile({ state: "error", id })}
      />
      <div className="absolute inset-0 z-1 flex items-end p-2 bg-linear-to-b from-surface-container-high/40 to-surface-container-high/40">
        <p className="line-clamp-3">{reason}</p>
      </div>

      {!invalidFormat && !exceedsSize && (
        <>
          <div className="size-full flex flex-col items-center justify-center gap-2 p-2">
            <FileText className="size-8 text-primary" />
            <p className="text-xs text-center line-clamp-2 text-on-surface">
              {fileName}
            </p>
          </div>
          <Button
            className="absolute z-2 left-1/2 top-1/2 rounded-xl -translate-1/2 aspect-square text-on-surface"
            type="button"
            y="center"
            title="Retry Upload"
            variant="secondary"
            onClick={() => retryUpload(id)}
          >
            <RotateCw className="size-6" />
          </Button>
        </>
      )}
    </PreviewWrapper>
  )
}

export function UploadingFilePreview({
  onRemoveFile,
  buttonProps,
  id,
  progress,
  fileName,
}: PreviewProps<"uploading", WithUploadingState<FilePreviewProps>>) {
  return (
    <PreviewWrapper title="Uploading">
      <RemoveFileButton
        {...buttonProps}
        close={() => onRemoveFile({ state: "uploading", id })}
      />

      <div className="size-full flex flex-col items-center justify-center gap-2 p-2">
        <FileText className="size-8 text-primary" />
        <p className="text-xs text-center line-clamp-2 text-on-surface">
          {fileName}
        </p>
      </div>
      <Progress progress={progress} />
    </PreviewWrapper>
  )
}

function Progress({ progress }: { progress: number | undefined | null }) {
  return (
    <Visibility show={!!progress}>
      <div className="size-full aspect-square absolute inset-0 bg-linear-to-b text-secondary from-surface-container-high/40 via-surface-container-high/50 to-surface-container-high/40 flex-place-center mx-auto bottom-2">
        <div className="relative aspect-square! size-[70%] bg-surface-container-high/30 rounded-full flex-place-center">
          <div className="absolute ease-linear inset-0 aspect-square! m-auto size-[90%] border-4 border-secondary border-l-on-surface-variant rounded-full animate-spin" />
          <p>{progress ?? 1}%</p>
        </div>
      </div>
    </Visibility>
  )
}

function RemoveFileButton({
  className,
  children,
  close,
  ...props
}: ButtonProps & { close(): void }) {
  return (
    <Button
      {...props}
      type="button"
      onClick={close}
      variant="primary"
      title="Remove file"
      size="sm"
      className={cn(
        "z-90 absolute aspect-square rounded-full top-1 right-1 p-0! bg-error text-on-error hover:bg-error/90",
        className,
      )}
    >
      <X className="size-5" />
    </Button>
  )
}

function PreviewWrapper({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "relative *:scale-90 w-auto aspect-square! rounded-xl overflow-hidden bg-surface-container border max-h-full border-outline-variant",
        className,
      )}
    />
  )
}
