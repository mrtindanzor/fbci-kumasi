import z from "zod"

export const projectValidator = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  story: z.string().min(1),
  image: z.string().min(1),
  galleryImages: z.array(z.string()),
  videoUrl: z.string(),
  funded: z.number().min(0),
  goal: z.number().min(1),
  status: z.enum(["funded", "ongoing"]),
  completionDate: z.string().min(1),
  paymentLink: z.string(),
})

export const projectInputValidator = z.object({
  title: z.string().min(1, "Title is required"),
  story: z.string().min(1, "Story is required"),
	image: z.string().default(""),
  galleryImages: z.array(z.string()).default([]),
  videoUrl: z.string().default(""),
  goal: z.number().min(1, "Goal must be at least $1"),
  status: z.enum(["funded", "ongoing"]).default("ongoing"),
  completionDate: z.string().min(1, "Completion date is required"),
  paymentLink: z.string().default(""),
  funded: z.number().min(0).default(0),
})

export const projectFiltersValidator = z.object({
  status: z.enum(["funded", "ongoing"]).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
})
