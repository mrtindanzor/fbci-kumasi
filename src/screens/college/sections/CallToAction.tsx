import { Download, Eye } from "lucide-react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { collegeData } from "../data"

export function CallToAction() {
  return (
    <section className="section-gap">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">
              Interested in Joining HACWA?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Discover everything you need to know about our programs, courses,
              and admissions by viewing the official prospectus.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={collegeData.prospectus.url}
                target="_blank"
                variant="gold"
                size="lg"
                className="gap-2 text-sm w-full sm:w-fit"
              >
                <Eye className="size-5" />
                View Prospectus
              </Link>
              <Link
                href={collegeData.prospectus.url}
                download
                variant="none"
                size="lg"
                className="gap-2 w-full sm:w-fit text-sm bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-colors duration-200 font-body"
              >
                <Download className="size-5" />
                Download Prospectus
              </Link>
            </div>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
