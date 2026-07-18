import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ForgotPasswordPage } from "@/screens/auth"

export const Route = createFileRoute(
	"/__protected/dashboard/__auth/forgot-password",
)({
	component: ForgotPasswordPage,
	head: () => ({
		meta: generateMetaData({
			title: "Forgot Password",
			description: "Reset your FBCI account password.",
			path: "dashboard/forgot-password",
		}),
	}),
})
