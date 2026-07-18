import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { ForgotPasswordProps } from "../auth.contract.types"
import { forgotPasswordValidator } from "../auth.validators"

// TODO: Integrate with backend API endpoint when available
// Expected API: POST /api/auth/forgot-password
// Request body: { email: string }
// Response: { message: string }

export function useForgotPassword() {
  const { register, handleSubmit, formState } = useForm<ForgotPasswordProps>({
    resolver: zodResolver(forgotPasswordValidator),
  })

  const onSubmit = handleSubmit(async (data) => {
    // TODO: Replace with actual API call
    console.log("Forgot password requested for:", data.email)
  })

  return { register, formState, onSubmit }
}
