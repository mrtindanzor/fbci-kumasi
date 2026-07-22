import { Check, Plus, Trash2, Upload } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import type {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFormRegister,
} from "react-hook-form"
import {
  type Conference,
  type ConferenceInput,
  type RetrieveSelectedFile,
  useConferenceMutation,
} from "@/features/conference"
import {
  type FilePayload,
  FilePicker,
  useFileImpUpload,
} from "@/features/files"
import {
  ImagePicker,
  ImagesPreview,
  type UseImageUpload,
} from "@/features/images"
import { apiRoutes } from "@/shared/routes"
import type { SetState } from "@/shared/types/utils/SetState"
import { Button } from "@/shared/ui/primitives/button"
import { FieldError } from "@/shared/ui/primitives/FieldError"
import { Input } from "@/shared/ui/primitives/Input"
import { Label } from "@/shared/ui/primitives/Label"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { Textarea } from "@/shared/ui/primitives/Textarea"
import { cn } from "@/shared/utils/cn"

type ConferenceFormProps = {
  initialValues?: Conference
}

function useConferencWorkflow() {
  const [canAddNewFile, setCanAddNewFile] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onAddField = useCallback(
    (fieldsLength: number, action: () => void) => {
      if (canAddNewFile || fieldsLength < 1) return action()
      setError(
        "Resolve all errors and select a file before adding another field.",
      )
    },
    [canAddNewFile],
  )

  useEffect(() => {
    if (!error) return
    const timeoutId = setTimeout(() => setError(null), 4_000)

    return () => clearTimeout(timeoutId)
  }, [error])

  return { onAddField, error, setCanAddNewFile }
}

export function ConferenceForm({ initialValues }: ConferenceFormProps) {
  const {
    register,
    fields,
    remove,
    append,
    onSubmit,
    formState: { errors, isSubmitting },
    imageUploads,
    retrieveSelectedFiles,
    removeRetriever,
    success,
  } = useConferenceMutation(initialValues)
  const { error, onAddField, setCanAddNewFile } = useConferencWorkflow()
  console.log({ success, isSubmitting, error })

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <ConferenceIdenty register={register} errors={errors} />
      <ConferenceSchedule register={register} errors={errors} />
      <ConferencePoster imageUploads={imageUploads} />
      <ConferenceResources
        append={append}
        onAddField={onAddField}
        resources={fields}
        error={error}
        removeRetriever={removeRetriever}
        retrieveSelectedFiles={retrieveSelectedFiles}
        register={register}
        remove={remove}
        setCanAddNewFile={setCanAddNewFile}
      />

      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          variant={success ? "gold" : "primary"}
          disabled={isSubmitting || success}
          className="disabled:opacity-100"
        >
          {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
          {!success && (initialValues ? "Save Changes" : "Create Conference")}
          {success && (
            <span className="flex text-primary items-center gap-x-2">
              <Check className="size-5" />
              Saved
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}

type ConferenceIdentyProps = {
  register: UseFormRegister<ConferenceInput>
  errors: FieldErrors<ConferenceInput>
}
function ConferenceIdenty({ register, errors }: ConferenceIdentyProps) {
  return (
    <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
      <h2 className="font-headline text-lg text-on-surface flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary">
          verified_user
        </span>
        Conference Identity
      </h2>
      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="title">Conference Title</Label>
          <Input id="title" {...register("title")} />
          <FieldError message={errors.title?.message} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Input id="theme" {...register("theme")} />
            <FieldError message={errors.theme?.message} />
          </div>
        </div>

        <div>
          <Label htmlFor="fullDescription">Short Introduction</Label>
          <Textarea
            id="fullDescription"
            placeholder="The Annual Pastors' and Workers Conference..."
            rows={3}
            className="resize-y"
            {...register("shortIntro")}
          />
          <FieldError message={errors.shortInfo?.message} />
        </div>
      </div>
    </section>
  )
}

function ConferenceSchedule({ register, errors }: ConferenceIdentyProps) {
  return (
    <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
      <h2 className="font-headline text-lg text-on-surface flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary">
          calendar_today
        </span>
        Schedule & Content
      </h2>
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" {...register("startDate")} />
            <FieldError message={errors.startDate?.message} />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" {...register("endDate")} />
            <FieldError message={errors.endDate?.message} />
          </div>
        </div>
        <div>
          <Label htmlFor="fullDescription">Full Description</Label>
          <Textarea
            id="fullDescription"
            rows={8}
            {...register("fullDescription")}
          />
          <FieldError message={errors.fullDescription?.message} />
        </div>
        <div>
          <Label htmlFor="closingMessage">Closing Message</Label>
          <Textarea
            id="closingMessage"
            rows={3}
            {...register("closingMessage")}
          />
          <FieldError message={errors.closingMessage?.message} />
        </div>
      </div>
    </section>
  )
}

type ConferencePosterProps = {
  imageUploads: UseImageUpload<["poster"]>
}
function ConferencePoster({ imageUploads }: ConferencePosterProps) {
  return (
    <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
      <h2 className="font-headline text-lg text-on-surface flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary">image</span>
        Conference Poster
      </h2>
      <p className="mt-1 text-sm text-on-surface-variant">
        Recommended: 1200x1600px
      </p>
      <div className="mt-4">
        <Label>Poster Image</Label>
        <ImagePicker
          onSelect={(files) => imageUploads.select("poster", files)}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low p-6 transition-colors hover:border-secondary hover:bg-surface-container",
          )}
        >
          <Upload className="size-5 text-on-surface-variant" />
          <p className="text-sm text-on-surface-variant">
            Click to upload image
          </p>
          <p className="text-xs text-on-surface-variant/60">
            PNG, JPG, or WebP
          </p>
        </ImagePicker>
        {imageUploads.preview("poster").length > 0 && (
          <ImagesPreview
            slot="poster"
            uploads={imageUploads}
            className="mt-3 grid gap-3 *:h-50"
          />
        )}
      </div>
    </section>
  )
}

type ConferenceResourcesProps = {
  onAddField: (fieldsLength: number, action: () => void) => void
  error: string | null
  removeRetriever: (indexWithId: string) => void
  retrieveSelectedFiles(indexWithId: string, get: RetrieveSelectedFile): void
  resources: FieldArrayWithId<ConferenceInput, "resources">[]
  register: UseFormRegister<ConferenceInput>
  remove: (index: number) => void
  setCanAddNewFile: SetState<boolean>
  append: UseFieldArrayAppend<ConferenceInput>
}

function ConferenceResources({
  append,
  onAddField,
  resources,
  error,
  removeRetriever,
  retrieveSelectedFiles,
  register,
  remove,
  setCanAddNewFile,
}: ConferenceResourcesProps) {
  return (
    <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
      <h2 className="font-headline text-lg text-on-surface flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary">
          attachment
        </span>
        Conference Resources
      </h2>

      <FileUploads
        retrieveSelectedFiles={retrieveSelectedFiles}
        removeRetriever={removeRetriever}
        register={register}
        remove={remove}
        resources={resources}
        setCanAddNewFile={setCanAddNewFile}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="my-2"
        onClick={() =>
          onAddField(resources.length, () =>
            append({ title: "", file: " ", type: "pdf", id: "" }),
          )
        }
      >
        <Plus className="size-4 mr-1" />
        Add Resource
      </Button>
      <FieldError message={error ?? ""} className="mt-2" />
    </section>
  )
}

type FileUploadsProps = Pick<
  ConferenceResourcesProps,
  | "setCanAddNewFile"
  | "removeRetriever"
  | "retrieveSelectedFiles"
  | "resources"
  | "remove"
  | "register"
>

function FileUploads({
  retrieveSelectedFiles,
  resources,
  register,
  remove,
  removeRetriever,
  setCanAddNewFile,
}: FileUploadsProps) {
  return (
    <ul className="mt-4 space-y-4">
      {resources.map((resource, index) => {
        return (
          <li key={resource.id} className="grid grid-cols-[1fr_auto] gap-x-2">
            <div className="flex-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                {...register(`resources.${index}.title`)}
                placeholder="Resource title"
              />
              <FileInput
                indexWithId={`${index}-${resource.id}`}
                fileUrl={resource.file}
                removeRetriever={removeRetriever}
                retrieveSelectedFiles={retrieveSelectedFiles}
                setCanAddNewFile={
                  index === resources.length - 1 ? setCanAddNewFile : undefined
                }
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="text-error w-fit bg-surface h-12 sm:h-full hover:text-error/80"
            >
              <Trash2 className="size-4" />
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

type FileInputProps = {
  fileUrl: string | undefined
  indexWithId: string
  removeRetriever: (indexWithId: string) => void
  retrieveSelectedFiles(indexWithId: string, props: RetrieveSelectedFile): void
  setCanAddNewFile: SetState<boolean> | undefined
}

function useFileInputWorkflow({
  retrieveSelectedFiles,
  removeRetriever,
  indexWithId,
  setCanAddNewFile,
  fileUrl,
}: FileInputProps) {
  const uploads = useFileImpUpload({
    slots: {
      [indexWithId]: {
        multiple: false,
        maxFileSizeInMB: 20,
        files: fileUrl?.trim() ? [{ url: fileUrl }] : undefined,
      },
    },
    presignedUrlEndpoint: apiRoutes.files.conferences.path,
  })

  const file = useMemo(
    () => uploads.preview(indexWithId)[0],
    [uploads, indexWithId],
  )

  const updateFileState = useCallback(
    (file: FilePayload) => uploads.seed([file]),
    [uploads],
  )

  useEffect(() => {
    retrieveSelectedFiles(indexWithId, {
      updateState: updateFileState,
      getUploads: uploads.getUploads,
    })

    return () => removeRetriever(indexWithId)
  }, [
    retrieveSelectedFiles,
    removeRetriever,
    updateFileState,
    indexWithId,
    uploads,
  ])

  useEffect(() => {
    setCanAddNewFile?.(
      !!file &&
        (file.state !== "error" || !file.exceedsSize || !file.invalidFormat),
    )
  }, [setCanAddNewFile, file])

  return { uploads, file, indexWithId }
}

function FileInput(props: FileInputProps) {
  const { uploads, file, indexWithId } = useFileInputWorkflow(props)

  return (
    <>
      <FilePicker
        multiple={false}
        onSelect={(files) => {
          if (file) uploads.removeFile(file)
          uploads.select(indexWithId, files)
        }}
        className="grid grid-cols-[1fr_auto] gap-x-1"
      >
        <Input
          readOnly
          value={file?.fileName ?? "Select a document to upload"}
        />
        <Button
          type="button"
          className="w-fit rounded-md px-4 py-1.5"
          size="none"
        >
          <span>Pick</span>
        </Button>
      </FilePicker>

      <FieldError
        className="col-span-full"
        message={file?.state === "error" ? file.reason : ""}
      />
    </>
  )
}
