import { useCallback, useState } from "react"
import { publicUrls } from "@/config/publicUrls"
import { routes } from "@/shared/routes"
import { tryCatch } from "@/shared/utils/tryCatch"
import { useInviteService } from "./useInviteService"

export function useInvite() {
  const inviteService = useInviteService()
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const results = await tryCatch(
      inviteService.generateLink(`${publicUrls.appUrl}${routes.auth.signup}`),
    )

    if (results.success) {
      setGeneratedUrl(results.data)
    } else {
      setError(results.error)
    }
    setIsLoading(false)
  }, [inviteService])

  const handleGenerateNew = () => {
    setGeneratedUrl(null)
    setError(null)
  }

  return { handleGenerate, handleGenerateNew, generatedUrl, isLoading, error }
}
