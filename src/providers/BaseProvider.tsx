import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useEffect, useState } from "react"
import { useAuthStore } from "@/features/auth"
import { useNavigate } from "@/shared/hooks/useNavigate"

export function BaseProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  const router = useNavigate()

  useEffect(() => {
    void isLoggedIn
    router.refresh()
  }, [router, isLoggedIn])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
