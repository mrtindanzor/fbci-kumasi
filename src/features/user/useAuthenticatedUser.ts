import { useUserStore } from "@/features/auth"
import type { UserAccountType } from "./user.contract.types"

export function useAuthenticatedUser(): UserAccountType {
  const user = useUserStore((s) => s.user)

  if (!user) throw new Error("User not authenticated")
  return user
}
