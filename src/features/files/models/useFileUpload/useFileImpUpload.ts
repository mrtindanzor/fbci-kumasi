import { useCallback, useLayoutEffect, useState } from "react"
import { tryCatch } from "@/shared/utils/tryCatch"
import type {
  ErrorFilePayload,
  FileStates,
  PreviewFileProps,
  RawFilePayload,
  RemoveFileProps,
  SlotConfig,
} from "../../files.contracts.types"
import { useFileService } from "../../files.useFileService"
import type {
  PendingDeletion,
  PresignedUrlEndpoint,
  UploadingComplete,
  UploadProgressMap,
  Uploads,
  UseFileUpload,
} from "./useFileUpload.types"
import { getCacheFromSlots } from "./utils/getCache"
import { groupUploadFiles } from "./utils/groupUploadFiles"
import { handleSelectedFiles } from "./utils/handleSelectedFiles"
import { handleUpload } from "./utils/handleUpload"
import { rehydratePresignedResults } from "./utils/rehydratePresignedResults"
import { resetProgress } from "./utils/resetProgress"
import { resolveUploadedFiles } from "./utils/resolveUploadedFiles"

export function useFileImpUpload<
  T extends Record<string, SlotConfig>,
  Path extends string,
>({
  slots,
  presignedUrlEndpoint,
}: {
  slots: T
  presignedUrlEndpoint: PresignedUrlEndpoint<Path>
}): UseFileUpload<readonly (keyof T & string)[]> {
  const fileService = useFileService()
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

  const seed = useCallback((uploads: Uploads) => {
    setUploads(uploads)
  }, [])

  const preview = useCallback(
    (key: keyof T): PreviewFileProps[] => {
      const selectedPreviews = uploads.filter((file) => file.slotKey === key)

      return selectedPreviews.map((file): PreviewFileProps => {
        const fileName = file.state === "uploaded" ? "" : file.file.name

        if (file.state === "uploaded")
          return { ...file, fileName: file.url.split("/").pop() ?? "" }
        if (file.state === "raw")
          return {
            url: file.previewUrl,
            state: "raw",
            id: file.id,
            fileName,
          }

        if (file.state === "uploading")
          return {
            url: file.previewUrl,
            state: "uploading",
            id: file.id,
            progress: progress?.[file.id] ?? null,
            fileName,
          }

        return {
          url: file.previewUrl,
          state: "error",
          reason: file.reason,
          invalidFormat: file.invalidFormat,
          exceedsSize: file.exceedsSize,
          id: file.id,
          fileName,
        }
      })
    },
    [uploads, progress],
  )

  const removeFile = useCallback(
    async <State extends FileStates>(payload: RemoveFileProps<State>) => {
      const slotKey = uploads.find((f) => f.id === payload.id)?.slotKey

      setUploads((uploads) => uploads.filter((file) => file.id !== payload.id))

      if (payload.state === "uploaded" && slotKey) {
        const isBatchDelete = slots[slotKey]?.batchDelete
        if (!isBatchDelete) {
          await tryCatch(fileService.removeFile(payload.url))
          return
        }

        setPendingDeletion((batches) => {
          if (!batches) return { [slotKey as keyof T]: new Set([payload.id]) }
          const ids = batches[slotKey] ?? new Set()

          return { ...batches, [slotKey as keyof T]: ids.add(payload.id) }
        })
      }
    },
    [fileService, slots, uploads],
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

      const selectedIds = selectedFiles.map((file) => file.id)

      setUploads((uploads) => {
        return uploads.map((file) => {
          if (
            (file.state !== "error" && file.state !== "raw") ||
            !selectedIds.includes(file.id)
          )
            return file

          return {
            ...file,
            state: "uploading",
            previewUrl: URL.createObjectURL(file.file),
          }
        })
      })

      const presignedUrls = await fileService.getSignUrls(
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
          return fileService.uploadFile(payload)
        },
        onUploadProgress(fileId, totalUploadedInPercentange) {
          setProgress((progress) => ({
            ...progress,
            [fileId]: totalUploadedInPercentange,
          }))
        },
      })

      const lookup = new Map(uploaded.map((file) => [file.id, file]))
      setUploads((uploads) => {
        return uploads.map((file) => {
          const hasFile = lookup.get(file.id)
          if (!hasFile) return file

          if (hasFile.state === "error") return hasFile

          const { id, uuid, ...rest } = hasFile
          return { ...rest, id: uuid }
        })
      })

      const updated = uploaded.map((upload) => {
        const hasFile = lookup.get(upload.id)
        if (!hasFile) return upload

        if (hasFile.state === "error") return hasFile

        const { id, uuid, ...rest } = hasFile
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
    [presignedUrlEndpoint, fileService],
  )

  const uploadOne = useCallback(
    async (key: keyof T, id: string) => {
      const slotKey = key as string

      const selectedFile = uploads.find(
        (file): file is ErrorFilePayload | RawFilePayload =>
          ((file.state === "error" &&
            !file.exceedsSize &&
            !file.invalidFormat) ||
            file.state === "raw") &&
          file.id === id,
      )

      if (!selectedFile) return

      const newUploads = [selectedFile]

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
        uploads.filter((file) => !keys.includes(file.slotKey)),
      )
    },
    [],
  )

  const deleteFiles = useCallback(
    async <Selected extends (keyof T & string)[]>(keys: Selected) => {
      if (!pendingDeletion) return
      const selected: string[] = []

      for (const slotKey of keys) {
        const files = [...(pendingDeletion[slotKey] ?? [])]
        files.forEach((file) => {
          selected.push(file)
        })
      }

      await Promise.all(
        selected.map(async (url) => fileService.removeFile(url)),
      )
    },
    [pendingDeletion, fileService],
  )

  useLayoutEffect(() => {
    return () => {
      uploads.forEach((file) => {
        if (file.state !== "uploaded") URL.revokeObjectURL(file.previewUrl)
      })
    }
  }, [uploads])

  return {
    select,
    preview,
    removeFile,
    deleteFiles,
    uploadAll,
    uploadPartial,
    resetAll,
    resetPartial,
    uploadOne,
    getUploads: () => uploads,
    seed,
  }
}
