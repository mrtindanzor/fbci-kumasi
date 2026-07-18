import type { UserAccountType } from "./user.contract.types"

export function useAuthenticatedUser(): UserAccountType {
  //   const __user = useUserStore((s) => s.user)

  return {
    name: "Mr. Tindanzor Simon",
    email: "ktindanzor@gmail.com",
    roles: ["admin"],
  }
  // if (!user) throw new Error("User not authenticated")

  // return user
}
