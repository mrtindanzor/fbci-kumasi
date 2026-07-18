import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { SignUpPage } from "@/screens/auth"

export const Route = createFileRoute("/__protected/dashboard/__auth/signup")({
	component: SignUpPage,
	head: () => ({
		meta: generateMetaData({
			title: "Sign Up",
			description: "Create a FBCI account.",
			path: "dashboard/signup",
		}),
	}),
})
