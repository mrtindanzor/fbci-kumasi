import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { SignInPage } from "@/screens/auth"

export const Route = createFileRoute("/__protected/dashboard/__auth/signin")({
	component: SignInPage,
	head: () => ({
		meta: generateMetaData({
			title: "Sign In",
			description: "Sign in to your FBCI account.",
			path: "dashboard/signin",
		}),
	}),
})
