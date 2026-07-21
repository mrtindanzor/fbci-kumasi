import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ResetPasswordPage } from "@/screens/auth"

export const Route = createFileRoute(
  "/__protected/auth/dashboard/reset-password",
)({
  validateSearch: (search: Record<string, unknown>) => ({
    access: String(search.access || ""),
  }),
  component: RouteComponent,
  head: () => ({
    meta: generateMetaData({
      title: "Reset Password",
      description: "Set a new password for your FBCI account.",
      path: "auth/dashboard/reset-password",
    }),
  }),
})

function RouteComponent() {
  const { access } = Route.useSearch()

  return <ResetPasswordPage access={access} />
}
