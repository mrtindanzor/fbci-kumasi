import { Upload } from "lucide-react"
import { Label } from "@/shared/ui/primitives/Label"
import { cn } from "@/shared/utils/cn"
import type { UseVideoUpload } from "../useVideoUpload/useVideoUpload.types"
import { VideoPicker } from "./VideoPicker"
import { VideoPreview } from "./VideoPreview"

type VideoUploadFieldProps = {
  label: string
  videoUpload: UseVideoUpload
  onRemove?: () => void
}

export function VideoUploadField({
  label,
  videoUpload,
  onRemove,
}: VideoUploadFieldProps) {
  const video = videoUpload.preview()
  return (
    <div>
      <Label>{label}</Label>

      {video && (
        <VideoPreview
          videoUpload={videoUpload}
          onRemove={onRemove ?? (() => {})}
          className="mt-2"
        />
      )}

      {!video && (
        <VideoPicker
          onSelect={(files) => videoUpload.select(files)}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low p-6 transition-colors hover:border-secondary hover:bg-surface-container",
          )}
        >
          <Upload className="size-5 text-on-surface-variant" />
          <p className="text-sm text-on-surface-variant">
            Click to upload video
          </p>
          <p className="text-xs text-on-surface-variant/60">
            MP4, WebM, OGG, QuickTime, AVI, or MKV · Max 500MB
          </p>
        </VideoPicker>
      )}
    </div>
  )
}
