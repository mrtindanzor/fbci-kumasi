import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ResetPasswordPage } from "@/screens/auth"

export const Route = createFileRoute(
	"/__protected/dashboard/__auth/reset-password",
)({
	component: ResetPasswordPage,
	head: () => ({
		meta: generateMetaData({
			title: "Reset Password",
			description: "Set a new password for your FBCI account.",
			path: "dashboard/reset-password",
		}),
	}),
})
