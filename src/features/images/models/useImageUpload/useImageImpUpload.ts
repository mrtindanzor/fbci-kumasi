import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { tryCatch } from "@/shared/utils/tryCatch"
import type {
  CompressedImagePayload,
  ErrorImagePayload,
  ImageStates,
  PreviewImageProps,
  RemoveImageProps,
  SlotConfig,
} from "../../images.contracts.types"
import { useImageService } from "../../images.useImageService"
import type {
  PendingDeletion,
  PresignedUrlEndpoint,
  UploadingComplete,
  UploadProgressMap,
  Uploads,
  UseImageUpload,
} from "./useImageUpload.types"
import { getCacheFromSlots } from "./utils/getCache"
import { groupUploadFiles } from "./utils/groupUploadFiles"
import { handleImageResizing } from "./utils/handleResizing"
import { handleSelectedFiles } from "./utils/handleSelectedFiles"
import { handleUpload } from "./utils/handleUpload"
import { rehydratePresignedResults } from "./utils/rehydratePresignedResults"
import { resetProgress } from "./utils/resetProgress"
import { resolveUploadedFiles } from "./utils/resolveUploadedFiles"

export function useImageImpUpload<
  T extends Record<string, SlotConfig>,
  Path extends string,
>({
  slots,
  presignedUrlEndpoint,
}: {
  slots: T
  presignedUrlEndpoint: PresignedUrlEndpoint<Path>
}): UseImageUpload<readonly (keyof T & string)[]> {
  const imageService = useImageService()
  const [uploads, setUploads] = useState<Uploads>(getCacheFromSlots(slots))
  const [progress, setProgress] = useState<UploadProgressMap | null>(null)
  const [pendingDeletion, setPendingDeletion] =
    useState<PendingDeletion | null>(null)

  const select = useCallback(
    async (key: keyof T & string, files: File[]) => {
      if (files.length < 1) return

      const slot = slots[key]
      if (!slot) return
      setUploads((uploads) =>
        handleSelectedFiles({
          slotKey: key,
          uploads,
          files,
          slot,
        }),
      )
    },
    [slots],
  )

  const preview = useCallback(
    (key: keyof T): PreviewImageProps[] => {
      const selectedPreviews = uploads.filter((image) => image.slotKey === key)

      return selectedPreviews.map((image): PreviewImageProps => {
        if (image.state === "uploaded") return image
        if (image.state === "raw" || image.state === "compressed")
          return {
            url: image.previewImage,
            state: "compressed",
            id: image.id,
          }

        if (image.state === "uploading")
          return {
            url: image.previewImage,
            state: "uploading",
            id: image.id,
            progress: progress?.[image.id] ?? null,
          }

        return {
          url: image.previewImage,
          state: "error",
          reason: image.reason,
          invalidFormat: image.invalidFormat,
          exceedsSize: image.exceedsSize,
          id: image.id,
        }
      })
    },
    [uploads, progress],
  )

  const removeImage = useCallback(
    async <State extends ImageStates>(payload: RemoveImageProps<State>) => {
      const slotKey = uploads.find((img) => img.id === payload.id)?.slotKey

      setUploads((uploads) =>
        uploads.filter((image) => image.id !== payload.id),
      )

      if (payload.state === "uploaded" && slotKey) {
        const isBatchDelete = slots[slotKey]?.batchDelete
        if (!isBatchDelete) {
          await tryCatch(imageService.removeImage(payload.url))
          return
        }

        setPendingDeletion((batches) => {
          if (!batches) return { [slotKey as keyof T]: new Set([payload.id]) }
          const ids = batches[slotKey] ?? new Set()

          return { ...batches, [slotKey as keyof T]: ids.add(payload.id) }
        })
      }
    },
    [imageService, slots, uploads],
  )
  const upload = useCallback(
    async <Selected extends (keyof T & string)[]>(
      keys: Selected,
      uploads: Uploads,
    ) => {
      const {
        selectedFiles,
        alreadyUploaded,
        stillUploading,
        unResolvedErrors,
      } = groupUploadFiles(uploads, keys)

      const selectedIds = selectedFiles.map((image) => image.id)

      setUploads((uploads) => {
        return uploads.map((image) => {
          if (
            (image.state !== "error" && image.state !== "compressed") ||
            !selectedIds.includes(image.id)
          )
            return image

          return {
            ...image,
            state: "uploading",
            previewImage: URL.createObjectURL(image.file),
          }
        })
      })

      const presignedUrls = await imageService.getSignUrls(
        selectedFiles.map(({ file: _f, ...details }) => details),
        presignedUrlEndpoint,
      )

      const rehydratedPresignedUrls = rehydratePresignedResults(
        presignedUrls,
        selectedFiles,
      )

      const uploaded = await handleUpload({
        presigned: rehydratedPresignedUrls,
        async uploadService(payload) {
          return imageService.uploadImage(payload)
        },
        onUploadProgress(imageId, totalUploadedInPercentange) {
          setProgress((progress) => ({
            ...progress,
            [imageId]: totalUploadedInPercentange,
          }))
        },
      })

      const lookup = new Map(uploaded.map((image) => [image.id, image]))
      setUploads((uploads) => {
        return uploads.map((image) => {
          const hasImage = lookup.get(image.id)
          if (!hasImage) return image

          if (hasImage.state === "error") return hasImage

          const { id, uuid, ...rest } = hasImage
          return { ...rest, id: uuid }
        })
      })

      const updated = uploaded.map((upload) => {
        const hasImage = lookup.get(upload.id)
        if (!hasImage) return upload

        if (hasImage.state === "error") return hasImage

        const { id, uuid, ...rest } = hasImage
        return { ...rest, id: uuid }
      })
      const resolvedUploads = resolveUploadedFiles({
        uploads: [
          ...alreadyUploaded,
          ...stillUploading,
          ...unResolvedErrors,
          ...updated,
        ],
      })

      return {
        uploaded,
        resolvedUploads: resolvedUploads,
        selectedIds,
      }
    },
    [presignedUrlEndpoint, imageService],
  )

  const uploadOne = useCallback(
    async (key: keyof T, id: string) => {
      const slotKey = key as string

      const selectedImage = uploads.find(
        (image): image is ErrorImagePayload | CompressedImagePayload =>
          ((image.state === "error" &&
            !image.exceedsSize &&
            !image.invalidFormat) ||
            image.state === "compressed") &&
          image.id === id,
      )

      if (!selectedImage) return

      const newUploads = [selectedImage]

      const { selectedIds } = await upload([slotKey], newUploads)
      setProgress((progress) => resetProgress(selectedIds, progress ?? {}))
    },
    [uploads, upload],
  )

  const uploadAll = useCallback(async () => {
    const keys = Object.keys(slots)

    const { selectedIds, resolvedUploads } = await upload(keys, uploads)
    setProgress((progress) => resetProgress(selectedIds, progress ?? {}))

    return resolvedUploads as Record<keyof T, UploadingComplete | undefined>
  }, [upload, uploads, slots])

  const uploadPartial = useCallback(
    async <Selected extends (keyof T & string)[]>(keys: Selected) => {
      const { selectedIds, resolvedUploads } = await upload(keys, uploads)

      setProgress((progress) => resetProgress(selectedIds, progress ?? {}))

      return resolvedUploads as Record<
        Selected[number],
        UploadingComplete | undefined
      >
    },
    [upload, uploads],
  )

  const resetAll = useCallback(() => {
    setUploads([])
  }, [])

  const resetPartial = useCallback(
    <Selected extends (keyof T)[]>(keys: Selected) => {
      setUploads((uploads) =>
        uploads.filter((image) => !keys.includes(image.slotKey)),
      )
    },
    [],
  )

  const deleteImages = useCallback(
    async <Selected extends (keyof T & string)[]>(keys: Selected) => {
      if (!pendingDeletion) return
      const selected: string[] = []

      for (const slotKey of keys) {
        const images = [...(pendingDeletion[slotKey] ?? [])]
        images.forEach((img) => {
          selected.push(img)
        })
      }

      await Promise.all(
        selected.map(async (url) => imageService.removeImage(url)),
      )
    },
    [pendingDeletion, imageService],
  )

  useLayoutEffect(() => {
    return () => {
      uploads.forEach((image) => {
        if (image.state !== "uploaded") URL.revokeObjectURL(image.previewImage)
      })
    }
  }, [uploads])

  useEffect(() => {
    if (!uploads.some((image) => image.state === "raw")) return

    const resize = async () => {
      const images = await handleImageResizing({ uploads })
      setUploads((uploads) => {
        const lookup = new Map(images.map((image) => [image.id, image]))
        return uploads.map((image) => ({
          ...image,
          ...(lookup.get(image.id) ?? {}),
        }))
      })
    }
    resize()
  }, [uploads])

  return {
    select,
    preview,
    removeImage,
    deleteImages,
    uploadAll,
    uploadPartial,
    resetAll,
    resetPartial,
    uploadOne,
  }
}
