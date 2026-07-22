import z from "zod"

export const projectValidator = z
  .object(
    {
      id: z
        .string("Please enter a valid project ID")
        .min(1, "Project ID is required"),
      title: z.string("Please enter a valid title").min(1, "Title is required"),
      story: z.string("Please enter a valid story").min(1, "Story is required"),
      image: z
        .string("Please provide a valid image URL")
        .min(1, "A project image is required"),
      galleryImages: z.array(
        z.string("Please provide a valid image URL"),
        "Gallery images must be an array of URLs",
      ),
      videoUrl: z.string("Please provide a valid video URL"),
      funded: z
        .number("Please enter a valid funded amount")
        .min(0, "Funded amount cannot be negative"),
      goal: z
        .number("Please enter a valid goal amount")
        .min(1, "Goal must be at least $1"),
      status: z.enum(["funded", "ongoing"], "Please select a valid status"),
      completionDate: z
        .string("Please enter a valid completion date")
        .min(1, "Completion date is required"),
      paymentLink: z.string("Please provide a valid payment link"),
    },
    { error: "Please fill in all required fields" },
  )
  .refine((data) => data.funded <= data.goal, {
    message: "Funded amount cannot exceed the goal",
    path: ["funded"],
  })

export const projectInputValidator = z
  .object(
    {
      title: z.string("Please enter a valid title").min(1, "Title is required"),
      story: z.string("Please enter a valid story").min(1, "Story is required"),
      image: z.string("Please provide a valid image URL"),
      galleryImages: z.array(
        z.string("Please provide a valid image URL"),
        "Gallery images must be an array of URLs",
      ),
      videoUrl: z.string("Please provide a valid video URL"),
      goal: z
        .number("Please enter a valid goal amount")
        .min(1, "Goal must be at least $1"),
      status: z.enum(["funded", "ongoing"], "Please select a valid status"),
      completionDate: z.string("Please enter a valid completion date"),
      paymentLink: z.string("Please provide a valid payment link"),
      funded: z
        .number("Please enter a valid funded amount")
        .nonnegative("Funded amount cannot be negative"),
    },
    { error: "Please fill in all required fields" },
  )
  .refine((data) => data.funded <= data.goal, {
    message: "Funded amount cannot exceed the goal",
    path: ["funded"],
  })

export const projectFiltersValidator = z.object({
  status: z
    .enum(["funded", "ongoing"], "Please select a valid status")
    .optional(),
  page: z
    .number("Please enter a valid page number")
    .min(1, "Page must be at least 1")
    .optional(),
  limit: z
    .number("Please enter a valid limit")
    .min(1, "Limit must be at least 1")
    .optional(),
})
