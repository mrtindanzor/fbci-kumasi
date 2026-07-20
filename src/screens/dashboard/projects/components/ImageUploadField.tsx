import { Upload } from "lucide-react"
import type { UseImageUpload } from "@/features/images"
import { ImagePicker, ImagesPreview } from "@/features/images"
import { Label } from "@/shared/ui/primitives/Label"
import { cn } from "@/shared/utils/cn"

type ImageUploadFieldProps = {
  label: string
  slot: "hero" | "gallery"
  uploads: UseImageUpload<readonly ("hero" | "gallery")[]>
}

export function ImageUploadField({
  label,
  slot,
  uploads,
}: ImageUploadFieldProps) {
  const hasImages = uploads.preview(slot).length > 0
  const isMultiple = slot === "gallery"

  return (
    <div>
      <Label>{label}</Label>

      <ImagePicker
        onSelect={(files) => uploads.select(slot, files)}
        multiple={isMultiple}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low transition-colors hover:border-secondary hover:bg-surface-container",
          isMultiple ? "p-4" : "p-6",
        )}
      >
        <Upload className="size-5 text-on-surface-variant" />
        <p className="text-sm text-on-surface-variant">
          {isMultiple ? "Click to add images" : "Click to upload image"}
        </p>
        <p className="text-xs text-on-surface-variant/60">PNG, JPG, or WebP</p>
      </ImagePicker>

      {hasImages && (
        <ImagesPreview
          slot={slot}
          uploads={uploads}
          className={cn(
            "mt-3 grid gap-3",
            isMultiple ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "*:h-50",
          )}
        />
      )}
    </div>
  )
}
