import { useConference } from "@/features/conference"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { Closing } from "./sections/Closing"
import { ConferenceDescription } from "./sections/ConferenceDescription"
import { ConferenceInfo } from "./sections/ConferenceInfo"
import { ConferenceResources } from "./sections/ConferenceResources"
import { Hero } from "./sections/Hero"

export function ConferencesPage() {
  const { data: conference, isLoading } = useConference()

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </main>
    )
  }

  if (!conference) return <EmptyScreen />

  return (
    <main>
      <Hero conference={conference} />
      <ConferenceInfo conference={conference} />
      <ConferenceDescription conference={conference} />
      <ConferenceResources conference={conference} />
      <Closing conference={conference} />
    </main>
  )
}

function EmptyScreen() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold text-primary mb-4">
          No Conference Scheduled
        </h1>
        <p className="text-on-surface-variant">
          Please check back later for upcoming events.
        </p>
      </div>
    </main>
  )
}
