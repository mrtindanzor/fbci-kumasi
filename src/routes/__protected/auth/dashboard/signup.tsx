import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { SignUpPage } from "@/screens/auth"

export const Route = createFileRoute("/__protected/auth/dashboard/signup")({
  validateSearch: (search: Record<string, unknown>) => ({
    access: String(search.access || ""),
  }),
  component: SignUpPage,
  head: () => ({
    meta: generateMetaData({
      title: "Sign Up",
      description: "Create a FBCI account.",
      path: "auth/dashboard/signup",
    }),
  }),
})
