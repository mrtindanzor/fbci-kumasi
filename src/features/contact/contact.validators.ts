import z from "zod"

export const contactFormValidator = z.object(
  {
    name: z.string("Invalid name format!").min(1, "Name is required!"),
    email: z
      .email("Invalid email format!")
      .trim()
      .nonempty("Email is required!"),
    phone: z.string("Invalid phone number format!").default(""),
    subject: z.string("Invalid subject format!").default(""),
    message: z.string("Invalid message format!").min(1, "Message is required!"),
  },
  { error: "Fill out all required fields!" },
)
