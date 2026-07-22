import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useFileImpUpload } from "@/features/files"
import { useImageImpUpload } from "@/features/images"
import { apiRoutes } from "@/shared/routes"
import type {
  Conference,
  ConferenceInput,
  ConferenceResource,
  RetrieveSelectedFile,
} from "../conference.contract.types"
import { conferenceQueryKey } from "../conference.queries"
import { conferenceInputValidator } from "../conference.validators"
import { useConferenceService } from "./useConferenceService"

export function useConferenceMutation(initialConference?: Conference) {
  const [success, setSuccess] = useState(false)
  const qc = useQueryClient()
  const fileRetrievers = useRef<Map<string, RetrieveSelectedFile>>(new Map())
  const [forceSubmission, setForceSubmission] = useState(false)

  const { id: conferenceId, ...defaultConference } =
    initialConference ?? ({} as Conference)
  const { register, handleSubmit, control, formState, reset } =
    useForm<ConferenceInput>({
      resolver: zodResolver(conferenceInputValidator),
      defaultValues: defaultConference
        ? {
            ...defaultConference,
            resources: defaultConference?.resources ?? [],
            poster: defaultConference?.poster ?? "",
            closingMessage: defaultConference?.closingMessage ?? "",
          }
        : undefined,
    })
  const conferenceService = useConferenceService()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "resources",
  })

  const imageUploads = useImageImpUpload({
    slots: {
      poster: {
        multiple: false,
        maxImageSizeInMB: 10,
        images: initialConference?.poster
          ? [{ url: initialConference.poster }]
          : [],
      },
    },
    presignedUrlEndpoint: apiRoutes.images.conferences.path,
  })

  const fileUploads = useFileImpUpload({
    slots: {
      resources: {
        multiple: true,
        limit: 10,
        maxFileSizeInMB: 20,
        batchDelete: true,
      },
    },
    presignedUrlEndpoint: apiRoutes.files.conferences.path,
  })

  const retrieveSelectedFiles = useCallback(
    (indexWithId: string, retrieve: RetrieveSelectedFile) => {
      if (!fileRetrievers.current.has(indexWithId))
        fileRetrievers.current.set(indexWithId, retrieve)
    },
    [],
  )

  const removeRetriever = useCallback((indexWithId: string) => {
    fileRetrievers.current.delete(indexWithId)
  }, [])

  const { mutate } = useMutation({
    mutationFn: ({ data, id }: { data: ConferenceInput; id?: string }) =>
      id ? conferenceService.update(id, data) : conferenceService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: conferenceQueryKey })
      setSuccess(true)
    },
  })

  const seedCollectedFiles = useCallback(() => {
    const selectors = [...fileRetrievers.current.entries()]
    const selectedFiles = selectors
      .sort((a, b) => {
        const [aId] = a
        const [bId] = b

        const aIndex = Number(aId.split("-")[0])
        const bIndex = Number(bId.split("-")[0])

        return aIndex - bIndex
      })
      .flatMap(([, get]) => get.getUploads())
    fileUploads.seed(selectedFiles)

    setForceSubmission(true)
  }, [fileUploads])

  const onSubmit = handleSubmit(async (data) => {
    if (!forceSubmission) {
      seedCollectedFiles()
      return
    }
    setForceSubmission(false)

    const posterResults = await imageUploads.uploadAll()
    const posterUrl =
      posterResults.poster?.completed[0]?.url ?? initialConference?.poster ?? ""

    /*
        Get the file retrievers indexWithId keys to use to upload the files
    */
    const selected = [...fileRetrievers.current.keys()]
    const fileResults = await fileUploads.uploadPartial(
      selected as "resources" /* Cast to resources to match the shape of this uploader*/[],
    )

    const uploaded = Object.values(fileResults)

    let hasFailures = 0

    for (const upload of uploaded) {
      const failed = upload?.errors

      if (failed && failed.length > 0) {
        hasFailures++
        failed.forEach((file) => {
          const updater = fileRetrievers.current.get(file.slotKey)
          console.log({ file, updater })
          updater?.updateState(file)
        })
      }
    }

    if (hasFailures) return

    const uploadedFiles = Object.values(uploaded)
      .flatMap((upload) => upload?.completed)
      .filter((upload) => upload !== undefined)

    const fileLookup = new Map(
      uploadedFiles.map((file, index) => [index, file]),
    )

    const resources = data.resources.map(
      (resource, index): ConferenceResource => {
        const file = fileLookup.get(index)

        return {
          ...resource,
          file: file?.url ?? resource.file,
          type: resource.type ?? "pdf",
          id: resource.id ?? file?.id ?? crypto.randomUUID(),
        }
      },
    )

    mutate({
      id: conferenceId,
      data: {
        ...data,
        poster: posterUrl,
        resources,
      },
    })
  })

  useEffect(() => {
    if (initialConference) {
      reset({
        ...initialConference,
        resources: initialConference?.resources ?? [],
        poster: initialConference?.poster ?? "",
        closingMessage: initialConference?.closingMessage ?? "",
      })
    }
  }, [initialConference, reset])

  useEffect(() => {
    if (!forceSubmission) return

    onSubmit()
  }, [forceSubmission, onSubmit])

  useEffect(() => {
    if (!success) return

    const timeoutId = setTimeout(() => setSuccess(false), 4_000)

    return () => clearTimeout(timeoutId)
  }, [success])

  return {
    register,
    control,
    formState,
    fields,
    append,
    remove,
    onSubmit,
    imageUploads,
    fileUploads,
    retrieveSelectedFiles,
    removeRetriever,
    success,
  }
}

export function useUpdateConference() {
  const qc = useQueryClient()
  const service = useConferenceService()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<ConferenceInput>
    }) => service.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: conferenceQueryKey })
      qc.invalidateQueries({ queryKey: ["conference", id] })
    },
  })
}

export function useDeleteConference() {
  const qc = useQueryClient()
  const service = useConferenceService()

  return useMutation({
    mutationFn: (id: string) => service.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: conferenceQueryKey })
    },
  })
}
