import type { UserAccountType } from "../user"

export interface LoginProps {
  username: string
  password: string
}

export type SignupProps = LoginProps &
  Omit<UserAccountType, "roles"> & {
    confirmPassword: string
  }

export interface ForgotPasswordProps {
  email: string
}

export interface ResetPasswordProps {
  password: string
  confirmPassword: string
}
