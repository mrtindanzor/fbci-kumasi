import z from "zod"

export const contactFormValidator = z.object(
  {
    name: z.string("Please enter a valid name").min(1, "Name is required"),
    email: z
      .email("Please enter a valid email address")
      .trim()
      .nonempty("Email is required"),
    phone: z.string("Please enter a valid phone number").default(""),
    subject: z.string("Please enter a valid subject").default(""),
    message: z
      .string("Please enter a valid message")
      .min(1, "Message is required"),
  },
  { error: "Please fill out all required fields" },
)
