import { DownloadSection } from "./sections/DownloadSection"
import { FAQAccordion } from "./sections/FAQAccordion"
import { Hero } from "./sections/Hero"
import { QuestionForm } from "./sections/QuestionForm"

export function HeavenPage() {
  return (
    <main>
      <Hero />
      <DownloadSection />
      <FAQAccordion />
      <QuestionForm />
    </main>
  )
}
