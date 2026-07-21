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
    password: z
      .string("Please enter a valid password")
      .min(6, "Password must be at least 6 characters"),
  },
  { error: "Please fill in all required fields" },
) satisfies z.ZodType<LoginProps>

export const signupValidator = z
  .object(
    {
      name: z
        .string("Please enter a valid name")
        .min(1, "First name is required"),
      username: z
        .string("Please enter a valid username")
        .min(1, "Username is required"),
      email: z
        .string("Please enter a valid email address")
        .email("Please enter a valid email address"),
      password: z
        .string("Please enter a valid password")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: z
        .string("Please enter a valid password")
        .min(1, "Please confirm your password"),
      access: z
        .string("Registration could not be completed.")
        .min(1, "Registration could not be completed."),
    },
    { error: "Please fill in all required fields" },
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }) satisfies z.ZodType<SignupProps>

export const forgotPasswordValidator = z.object(
  {
    email: z
      .string("Please enter a valid email address")
      .email("Please enter a valid email address"),
  },
  { error: "Please enter your email address" },
) satisfies z.ZodType<ForgotPasswordProps>

export const resetPasswordValidator = z
  .object(
    {
      password: z
        .string("Please enter a valid password")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: z
        .string("Please enter a valid password")
        .min(1, "Please confirm your new password"),
      token: z.string(),
    },
    { error: "Please fill in all required fields" },
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }) satisfies z.ZodType<ResetPasswordProps>
