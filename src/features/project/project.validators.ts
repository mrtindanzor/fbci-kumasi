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

export const projectFiltersValidator = z.object({
	status: z.enum(["funded", "ongoing"]).optional(),
	page: z.number().min(1).optional(),
	limit: z.number().min(1).optional(),
})
