import { GivingOptions } from "./sections/GivingOptions"
import { Hero } from "./sections/Hero"
import { ImpactSection } from "./sections/ImpactSection"
import { Questions } from "./sections/Questions"

export function DonatePage() {
  return (
    <main>
      <Hero />
      <GivingOptions />
      <ImpactSection />
      <Questions />
    </main>
  )
}
