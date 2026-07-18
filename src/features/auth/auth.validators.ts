import { z } from "zod"
import type {
	ForgotPasswordProps,
	LoginProps,
	ResetPasswordProps,
	SignupProps,
} from "./auth.contract.types"

export const loginValidator = z.object(
	{
		username: z.string("Please enter a valid username"),
		password: z.string().min(6, "Password must be at least 6 characters"),
	},
	{ error: "Fill in the required fields!" },
) satisfies z.ZodType<LoginProps>

export const signupValidator = z
	.object({
		name: z.string().min(1, "First name is required"),
		username: z.string().min(1, "Last name is required"),
		email: z.string().email("Please enter a valid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	}) satisfies z.ZodType<SignupProps>

export const forgotPasswordValidator = z.object({
	email: z.string().email("Please enter a valid email address"),
}) satisfies z.ZodType<ForgotPasswordProps>

export const resetPasswordValidator = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	}) satisfies z.ZodType<ResetPasswordProps>
