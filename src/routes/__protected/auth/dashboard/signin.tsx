import { createFileRoute } from "@tanstack/react-router"
import { authGuard } from "@/features/auth"
import { generateMetaData } from "@/libs/tanstack"
import { SignInPage } from "@/screens/auth"
import { routes } from "@/shared/routes"

export const Route = createFileRoute("/__protected/auth/dashboard/signin")({
  component: SignInPage,
  beforeLoad: async () => {
    await authGuard.assertNotAuthenticated(routes.auth.login, "server")
  },
  head: () => ({
    meta: generateMetaData({
      title: "Sign In",
      description: "Sign in to your FBCI account.",
      path: "auth/dashboard/signin",
    }),
  }),
})
