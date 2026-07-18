import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import type { UseImageUpload } from "@/features/images"
import type { Project } from "@/features/project"
import { projectInputValidator } from "@/features/project"
import { Button } from "@/shared/ui/primitives/button"
import { FieldError } from "@/shared/ui/primitives/FieldError"
import { Input } from "@/shared/ui/primitives/Input"
import { Label } from "@/shared/ui/primitives/Label"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { Textarea } from "@/shared/ui/primitives/Textarea"
import { ImageUploadField } from "./ImageUploadField"

export type ProjectFormInput = z.input<typeof projectInputValidator>
export type ProjectFormOutput = z.output<typeof projectInputValidator>

type ProjectFormProps = {
  initialValues?: Project
  onSubmit: (data: ProjectFormOutput) => Promise<void> | void
  uploads: UseImageUpload<readonly ("hero" | "gallery")[]>
}

export function ProjectForm({
  initialValues,
  onSubmit,
  uploads,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectInputValidator),
    defaultValues: initialValues
      ? {
          title: initialValues.title,
          story: initialValues.story,
          image: initialValues.image,
          galleryImages: initialValues.galleryImages,
          videoUrl: initialValues.videoUrl,
          goal: initialValues.goal,
          status: initialValues.status,
          completionDate: initialValues.completionDate,
          paymentLink: initialValues.paymentLink,
          funded: initialValues.funded,
        }
      : undefined,
  })

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data as ProjectFormOutput))}
      className="space-y-8"
    >
      <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
        <h2 className="font-headline text-lg text-on-surface">
          Primary Identity
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            <FieldError message={errors.title?.message} />
          </div>
          <div>
            <Label htmlFor="story">Story</Label>
            <Textarea id="story" rows={6} {...register("story")} />
            <FieldError message={errors.story?.message} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
        <h2 className="font-headline text-lg text-on-surface">
          Media & Visuals
        </h2>
        <div className="mt-4 space-y-6">
          <ImageUploadField
            label="Project Image"
            slot="hero"
            uploads={uploads}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input id="videoUrl" {...register("videoUrl")} />
              <FieldError message={errors.videoUrl?.message} />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                {...register("status")}
                className="h-11 w-full rounded-xl border border-outline-variant bg-surface px-4 text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              >
                <option value="ongoing">Ongoing</option>
                <option value="funded">Funded</option>
              </select>
              <FieldError message={errors.status?.message} />
            </div>
            <div>
              <Label htmlFor="completionDate">Completion Date</Label>
              <Input id="completionDate" {...register("completionDate")} />
              <FieldError message={errors.completionDate?.message} />
            </div>
          </div>

          <ImageUploadField
            label="Gallery Images"
            slot="gallery"
            uploads={uploads}
          />
        </div>
      </section>

      <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
        <h2 className="font-headline text-lg text-on-surface">
          Financial Parameters
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="goal">Goal ($)</Label>
            <Input
              id="goal"
              type="number"
              {...register("goal", { valueAsNumber: true })}
            />
            <FieldError message={errors.goal?.message} />
          </div>
          <div>
            <Label htmlFor="funded">Funded ($)</Label>
            <Input
              id="funded"
              type="number"
              {...register("funded", { valueAsNumber: true })}
            />
            <FieldError message={errors.funded?.message} />
          </div>
          <div>
            <Label htmlFor="paymentLink">Payment Link</Label>
            <Input id="paymentLink" {...register("paymentLink")} />
            <FieldError message={errors.paymentLink?.message} />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
          {initialValues ? "Save Changes" : "Create Project"}
        </Button>
      </div>
    </form>
  )
}
