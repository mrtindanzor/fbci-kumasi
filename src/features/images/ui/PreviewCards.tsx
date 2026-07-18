import { CloudCheck, RotateCw, X } from "lucide-react"
import type { ComponentProps } from "react"
import { LiaCompressArrowsAltSolid } from "react-icons/lia"
import { Button, Pill } from "@/shared/ui/primitives/button"
import type { ButtonProps } from "@/shared/ui/primitives/button/types"
import { Image } from "@/shared/ui/primitives/Image"
import { Visibility } from "@/shared/ui/primitives/Visibility"
import { cn } from "@/shared/utils/cn"
import type {
  ImagePreviewProps,
  ImageStates,
  WithImageCompressedState,
  WithImageErrorState,
  WithImageSuccessState,
  WithUploadingState,
} from "../images.contracts.types"

type PreviewProps<
  State extends ImageStates,
  T extends { state: State; retryUpload: unknown },
> = State extends "error" ? Omit<T, "state"> : Omit<T, "state" | "retryUpload">

export function UploadedImagePreview({
  onRemoveImage,
  buttonProps,
  url,
  id,
}: PreviewProps<"uploaded", WithImageSuccessState<ImagePreviewProps>>) {
  return (
    <PreviewWrapper>
      <Image src={url} alt="Preview image" className="size-full" />

      <RemoveImageButton
        {...buttonProps}
        close={() => onRemoveImage({ state: "uploaded", url, id })}
      />

      <Pill
        x="center"
        y="center"
        title="Image uploaded"
        className="absolute bottom-1 left-1 p-0.5 opacity-80 bg-secondary text-white"
      >
        <CloudCheck className="size-5" />
      </Pill>
    </PreviewWrapper>
  )
}

export function NewImagePreview({
  onRemoveImage,
  buttonProps,
  url,
  id,
  state,
}: PreviewProps<
  "raw" | "compressed",
  WithImageCompressedState<ImagePreviewProps>
> & {
  state: "raw" | "compressed"
}) {
  return (
    <PreviewWrapper>
      <Image src={url} alt="Preview" className="size-full" />

      <RemoveImageButton
        {...buttonProps}
        close={() => onRemoveImage({ state, id })}
      />

      {state === "raw" && (
        <Pill
          x="center"
          y="center"
          title="Compressing image"
          className="absolute bottom-1 left-1 p-0.5 bg-surface-container-high/80 text-on-surface-variant"
        >
          <LiaCompressArrowsAltSolid className="size-5 animate-pulse" />
        </Pill>
      )}
    </PreviewWrapper>
  )
}

export function ErrorImagePreview({
  onRemoveImage,
  buttonProps,
  url,
  reason,
  invalidFormat,
  id,
  exceedsSize,
  retryUpload,
}: PreviewProps<"error", WithImageErrorState<ImagePreviewProps>>) {
  return (
    <PreviewWrapper
      title={`Error: ${reason}`}
      className="text-xs text-error flex items-end size-full text-center"
    >
      <RemoveImageButton
        {...buttonProps}
        close={() => onRemoveImage({ state: "error", id })}
      />
      <div className="absolute inset-0 z-1 flex items-end p-2 bg-linear-to-b from-surface-container-high/40 to-surface-container-high/40">
        <p className="line-clamp-3">{reason}</p>
      </div>

      {!invalidFormat && !exceedsSize && (
        <>
          <Image src={url} alt="Preview" className="aspect-square" />
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

export function UploadingImagePreview({
  onRemoveImage,
  buttonProps,
  url,
  id,
  progress,
}: PreviewProps<"uploading", WithUploadingState<ImagePreviewProps>>) {
  return (
    <PreviewWrapper title="Uploading">
      <RemoveImageButton
        {...buttonProps}
        close={() => onRemoveImage({ state: "uploading", id })}
      />

      <Image key={url} src={url} alt="Preview" className="aspect-square" />
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

function RemoveImageButton({
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
      title="Remove image"
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
