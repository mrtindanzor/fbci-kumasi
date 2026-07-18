import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { ResetPasswordProps } from "../auth.contract.types"
import { resetPasswordValidator } from "../auth.validators"

// TODO: Integrate with backend API endpoint when available
// Expected API: POST /api/auth/reset-password
// Request body: { password: string, token: string }
// Response: { message: string }

export function useResetPassword() {
	const { register, handleSubmit, formState } = useForm<ResetPasswordProps>({
		resolver: zodResolver(resetPasswordValidator),
	})

	const onSubmit = handleSubmit(async () => {
		// TODO: Replace with actual API call
		console.log("Password reset submitted")
	})

	return { register, formState, onSubmit }
}
