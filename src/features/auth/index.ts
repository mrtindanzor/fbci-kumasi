import { publicUrls } from "@/config/publicUrls"
import { apiRoutes, routes } from "@/shared/routes"
import { redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getCookie } from "@tanstack/react-start/server"
import { createAuthClient } from "@tindanzor/auth-client"
import type { UserAccountType } from "../user"
import type { LoginProps, SignupProps } from "./auth.contract.types"

export const getIsAuthenticated = createServerFn().handler(() => {
  return !!getCookie("fbci_auth")
})

export const redirectToSigin = createServerFn().handler(() => {
  throw redirect({ to: routes.auth.login })
})

export const redirectAfterAuthentication = createServerFn().handler(() => {
  throw redirect({ to: routes.dashboard.home })
})

export type * from "./auth.contract.types"
export * from "./auth.validators"
export const {
  useAuthRefresh,
  useAuthStore,
  useAuthService,
  useLogout,
  useSignup,
  useSignin,
  usePasswordReset,
  useRequestPasswordReset,
  useUserStore,
  authGuard,
} = createAuthClient<UserAccountType, LoginProps, SignupProps>(
  {
    baseUrl: publicUrls.serverUri,
    endpoints: {
      login: apiRoutes.auth.login,
      logout: apiRoutes.auth.logout,
      refresh: apiRoutes.auth.refresh,
      register: apiRoutes.auth.signup,
      resetPassword: apiRoutes.auth.resetPassword,
      requestPasswordReset: {
        ...apiRoutes.auth.forgotPassword,
        resetPageDetails: {
          url: `${publicUrls.appUrl}${routes.auth.resetPassword}`,
          queryName: "access",
        },
      },
    },
  },
  {
    protectedPaths: [routes.dashboard.home],
    authPaths: [
      routes.auth.login,
      routes.auth.signup,
      routes.auth.forgotPassword,
      routes.auth.resetPassword,
    ],
    isAuthenticatedServer: () => getIsAuthenticated(),
    onAuthenticated: () => redirectAfterAuthentication(),
    onUnauthenticated: () => redirectToSigin(),
  },
)
