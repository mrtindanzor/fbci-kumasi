import { createFileRoute } from "@tanstack/react-router"
import { authGuard } from "@/features/auth"
import { generateMetaData } from "@/libs/tanstack"
import { SignUpPage } from "@/screens/auth"
import { routes } from "@/shared/routes"

export const Route = createFileRoute("/__protected/auth/dashboard/signup")({
  validateSearch: (search: Record<string, unknown>) => ({
    access: String(search.access || ""),
  }),
  component: SignUpPage,
  beforeLoad: async () => {
    await authGuard.assertNotAuthenticated(routes.auth.signup, "server")
  },
  head: () => ({
    meta: generateMetaData({
      title: "Sign Up",
      description: "Create a FBCI account.",
      path: "auth/dashboard/signup",
    }),
  }),
})
