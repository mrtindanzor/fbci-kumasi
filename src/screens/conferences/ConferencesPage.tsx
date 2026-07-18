import { Closing } from "./sections/Closing"
import { ConferenceDescription } from "./sections/ConferenceDescription"
import { ConferenceInfo } from "./sections/ConferenceInfo"
import { ConferenceResources } from "./sections/ConferenceResources"
import { Hero } from "./sections/Hero"

export function ConferencesPage() {
  return (
    <main>
      <Hero />
      <ConferenceInfo />
      <ConferenceDescription />
      <ConferenceResources />
      <Closing />
    </main>
  )
}
