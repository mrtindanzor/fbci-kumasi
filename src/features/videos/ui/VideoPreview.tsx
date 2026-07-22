import { CloudCheck, Pause, Play, RotateCw, X } from "lucide-react"
import { type ComponentProps, useEffect, useState } from "react"
import { Button } from "@/shared/ui/primitives/button"
import { Visibility } from "@/shared/ui/primitives/Visibility"
import { cn } from "@/shared/utils/cn"
import type { UseVideoUpload } from "../useVideoUpload/useVideoUpload.types"
import type { VideoUploadState } from "../videos.contracts.types"

type VideoPreviewProps = {
  videoUpload: UseVideoUpload
  onRemove: () => void
} & ComponentProps<"div">

export function VideoPreview({
  videoUpload,
  onRemove,
  ...props
}: VideoPreviewProps) {
  const active = videoUpload.preview()

  return (
    <div {...props}>
      {active?.status === "completed" && (
        <CompletedPreview
          state={active}
          onRemove={() => {
            videoUpload.remove()
            onRemove()
          }}
        />
      )}

      {(active?.status === "uploading" ||
        active?.status === "preparing" ||
        active?.status === "completing") && (
        <UploadingPreview
          state={active}
          onPause={() => videoUpload.pause()}
          onCancel={() => {
            videoUpload.cancel()
            onRemove()
          }}
        />
      )}

      {active?.status === "paused" && (
        <PausedPreview
          state={active}
          onResume={() => videoUpload.resume()}
          onCancel={() => {
            videoUpload.cancel()
            onRemove()
          }}
        />
      )}

      {active?.status === "failed" && (
        <FailedPreview
          state={active}
          onRetry={() => videoUpload.retry()}
          onRemove={() => {
            videoUpload.remove()
            onRemove()
          }}
        />
      )}

      {active?.status === "idle" && (
        <IdlePreview
          state={active}
          onRemove={() => {
            videoUpload.remove()
            onRemove()
          }}
        />
      )}

      {active?.status === "cancelled" && (
        <CancelledPreview
          onRemove={() => {
            videoUpload.remove()
            onRemove()
          }}
        />
      )}

      {active?.status === "error" && (
        <ErrorPreview
          reason={active.reason}
          onDismiss={() => videoUpload.remove()}
        />
      )}
    </div>
  )
}

function CompletedPreview({
  state,
  onRemove,
}: {
  state: Extract<VideoUploadState, { status: "completed" }>
  onRemove: () => void
}) {
  return (
    <PreviewWrapper>
      <video
        src={state.url}
        controls
        aria-label="Uploaded video preview"
        className="size-full object-cover rounded-xl"
      >
        <track kind="captions" />
      </video>
      <RemoveButton onClick={onRemove} />
      <CloudCheckBadge />
    </PreviewWrapper>
  )
}

function UploadingPreview({
  state,
  onPause,
  onCancel,
}: {
  state: Extract<
    VideoUploadState,
    { status: "uploading" | "preparing" | "completing" }
  >
  onPause: () => void
  onCancel: () => void
}) {
  const progress =
    state.status === "uploading" ? Math.round(state.progress) : null

  return (
    <PreviewWrapper>
      <video
        src={URL.createObjectURL(state.file)}
        aria-label="Video being uploaded"
        className="size-full object-cover rounded-xl"
      >
        <track kind="captions" />
      </video>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/60">
        <Visibility show={progress !== null}>
          <div className="w-3/4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-white/80">
              <span>{progress}%</span>
              {state.status === "uploading" && (
                <span>
                  {formatBytes(state.speed)}/s
                  {state.eta !== null && ` · ${formatEta(state.eta)}`}
                </span>
              )}
            </div>
          </div>
        </Visibility>
        <Visibility show={state.status === "preparing"}>
          <p className="text-sm text-white/80">Preparing upload...</p>
        </Visibility>
        <Visibility show={state.status === "completing"}>
          <p className="text-sm text-white/80">Finalizing upload...</p>
        </Visibility>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onPause}
            className="text-white hover:bg-white/20"
          >
            <Pause className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-white hover:bg-white/20"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </PreviewWrapper>
  )
}

function PausedPreview({
  state,
  onResume,
  onCancel,
}: {
  state: Extract<VideoUploadState, { status: "paused" }>
  onResume: () => void
  onCancel: () => void
}) {
  const [url, setUrl] = useState<string | null>(null)
  const progress = Math.round(state.progress)

  useEffect(() => {
    setUrl(URL.createObjectURL(state.file))

    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url, state.file])

  return (
    <PreviewWrapper>
      {url && (
        <video
          src={URL.createObjectURL(state.file)}
          aria-label="Paused video upload"
          className="size-full object-cover rounded-xl"
        >
          <track kind="captions" />
        </video>
      )}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/60">
        <div className="w-3/4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-secondary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-center text-xs text-white/80">
            Paused · {progress}%
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onResume}
            className="text-white hover:bg-white/20"
          >
            <Play className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-white hover:bg-white/20"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </PreviewWrapper>
  )
}

function FailedPreview({
  state,
  onRetry,
  onRemove,
}: {
  state: Extract<VideoUploadState, { status: "failed" }>
  onRetry: () => void
  onRemove: () => void
}) {
  return (
    <PreviewWrapper className="text-error">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/60 p-4">
        <p className="text-center text-sm text-white/80">{state.reason}</p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="text-white hover:bg-white/20"
          >
            <RotateCw className="size-4 mr-1" />
            Retry
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-white hover:bg-white/20"
          >
            <X className="size-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </PreviewWrapper>
  )
}

function IdlePreview({
  state,
  onRemove,
}: {
  state: Extract<VideoUploadState, { status: "idle" }>
  onRemove: () => void
}) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!state.file) return

    const url = URL.createObjectURL(state.file)
    setUrl(url)

    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [state.file])

  return (
    <PreviewWrapper>
      {url && (
        <video
          src={url}
          aria-label="Selected video preview"
          className="size-full object-cover rounded-xl"
          muted
        >
          <track kind="captions" />
        </video>
      )}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/40 p-4">
        <p className="text-sm text-white/90">{state.name}</p>
        <p className="text-xs text-white/70">{formatBytes(state.size)}</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-white hover:bg-white/20"
        >
          <X className="size-4 mr-1" />
          Remove
        </Button>
      </div>
    </PreviewWrapper>
  )
}

function CancelledPreview({ onRemove }: { onRemove: () => void }) {
  return (
    <PreviewWrapper>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-surface-container p-4">
        <p className="text-sm text-on-surface-variant">Upload cancelled</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-error"
        >
          <X className="size-4 mr-1" />
          Remove
        </Button>
      </div>
    </PreviewWrapper>
  )
}

function ErrorPreview({
  reason,
  onDismiss,
}: {
  reason: string
  onDismiss: () => void
}) {
  return (
    <PreviewWrapper>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-error-container p-4">
        <p className="text-center text-sm text-on-error-container">{reason}</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="text-on-error-container"
        >
          <X className="size-4 mr-1" />
          Dismiss
        </Button>
      </div>
    </PreviewWrapper>
  )
}

function CloudCheckBadge() {
  return (
    <span className="absolute bottom-1 left-1 z-20 rounded-md bg-secondary p-0.5 text-neutral-50 opacity-80">
      <CloudCheck className="size-5" />
    </span>
  )
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="primary"
      title="Remove video"
      size="sm"
      className="z-90 absolute aspect-square rounded-full top-1 right-1 p-0! bg-error text-on-error hover:bg-error/90"
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
        "relative w-full aspect-video max-h-full rounded-xl overflow-hidden bg-surface-container border border-outline-variant",
        className,
      )}
    />
  )
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`
}

function formatEta(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}m ${s}s`
}
