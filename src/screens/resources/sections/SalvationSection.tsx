import { Download } from "lucide-react"
import { DOWNLOADS } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function SalvationSection() {
  return (
    <section className="section-gap bg-surface-container">
      <div className="container-app max-w-4xl mx-auto text-center">
        <AnimatePosition variants={slideUp}>
          <span className="material-symbols-outlined text-5xl md:text-6xl text-secondary mb-5 block">
            favorite
          </span>

          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
            Are You Saved? (Booklet)
          </h2>

          <div className="text-on-surface-variant max-w-2xl mx-auto space-y-4 mb-8">
            <p>
              Do you want to learn how to go to Heaven? Or do you want a great
              resource to assist you in helping someone else understand the
              gospel?
            </p>
            <p>
              This is the PDF file for what we at our church call our 'Salvation
              Booklet.' It is a fifteen-page booklet that we have written
              ourselves. Just click the button below to view and download the
              booklet for free!
            </p>
          </div>

          <Link
            href={DOWNLOADS.salvationBooklet}
            download
            target="_blank"
            rel="noopener noreferrer"
            variant="gold"
            size="lg"
            className="gap-2 text-sm"
          >
            <Download className="size-5" />
            Download Salvation Booklet (PDF)
          </Link>

          <p className="text-xs text-on-surface-variant mt-4">
            PDF Format · Free Access
          </p>
        </AnimatePosition>
      </div>
    </section>
  )
}
