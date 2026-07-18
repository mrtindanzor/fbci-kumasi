import { createServerFn } from "@tanstack/react-start"
import { getCookie } from "@tanstack/react-start/server"
import { createAuthClient } from "@tindanzor/auth-client"
import { publicUrls } from "@/config/publicUrls"
import { apiRoutes, routes } from "@/shared/routes"
import type { UserAccountType } from "../user"
import type { LoginProps, SignupProps } from "./auth.contract.types"

export const getIsAuthenticated = createServerFn().handler(() => {
  return !!getCookie("auth")
})

export const redirectToSigin = createServerFn().handler(() => {
  //   throw redirect({ to: routes.auth.login });
})

export const redirectAfterAuthentication = createServerFn().handler(() => {
  //   throw redirect({ to: routes.home });
})

export type * from "./auth.contract.types"
export * from "./auth.validators"
export const {
  useAuthRefresh,
  useAuthStore,
  useLogout,
  useSignup,
  useSignin,
  useUserStore,
} = createAuthClient<UserAccountType, LoginProps, SignupProps>(
  {
    baseUrl: publicUrls.serverUri,
    endpoints: {
      login: apiRoutes.auth.login.path,
      logout: apiRoutes.auth.logout.path,
      refresh: apiRoutes.auth.refresh.path,
      register: apiRoutes.auth.signup.path,
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
