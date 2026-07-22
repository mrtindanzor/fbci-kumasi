import { z } from "zod"

const conferenceResourceValidator = z.object({
  id: z.string().default(""),
  title: z.string().min(1, "Resource title is required"),
  file: z.string().min(1, "Resource file URL is required"),
  type: z.string(),
  size: z.string().default(""),
})

export const conferenceInputValidator = z
  .object(
    {
      title: z
        .string("Please enter a valid title")
        .min(5, "Title must be at least 5 characters"),
      theme: z
        .string("Please enter a valid theme")
        .min(3, "Theme must be at least 3 characters"),
      shortIntro: z
        .string("Please add a short info")
        .min(1, "Short info is required"),
      startDate: z
        .string("Please enter a valid start date")
        .min(1, "Start date is required"),
      endDate: z
        .string("Please enter a valid end date")
        .min(1, "End date is required"),
      fullDescription: z.string(),
      closingMessage: z.string(),
      poster: z.string(),
      resources: z.array(conferenceResourceValidator),
    },
    { error: "Please fill in all required fields" },
  )
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Start date must be before or equal to end date",
    path: ["endDate"],
  })

export const conferenceIdValidator = z
  .string("Please provide a valid conference ID")
  .min(1, "Conference ID is required")
