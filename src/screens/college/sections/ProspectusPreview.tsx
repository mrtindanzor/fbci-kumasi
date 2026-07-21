import { Download, Eye } from "lucide-react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { PdfThumbnail } from "@/shared/ui/primitives/PdfThumbnail"
import { collegeData } from "../data"

export function ProspectusPreview() {
  const { prospectus } = collegeData

  return (
    <section className="section-gap bg-surface-container">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
            Official Prospectus
          </h2>
          <div className="w-8 h-0.5 bg-secondary rounded-full mb-12" />
        </AnimatePosition>

        <AnimatePosition variants={slideUp}>
          <div className="max-w-3xl mx-auto bg-surface rounded-2xl p-6 sm:p-8 border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
              <div className="w-full sm:w-48 shrink-0 rounded-xl overflow-hidden border border-outline-variant/30 bg-white">
                <PdfThumbnail
                  src={prospectus.url}
                  alt="HACWA Prospectus Preview"
                  className="w-full aspect-[3/4]"
                  width={300}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-sm text-secondary">
                    picture_as_pdf
                  </span>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider">
                    PDF Document
                  </p>
                </div>

                <h3 className="text-xl font-headline font-semibold text-primary mt-2 mb-2">
                  {prospectus.title}
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  {prospectus.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={prospectus.url}
                    target="_blank"
                    variant="primary"
                    size="md"
                    className="gap-2"
                  >
                    <Eye className="size-4" />
                    View
                  </Link>
                  <Link
                    href={prospectus.url}
                    download
                    variant="gold"
                    size="md"
                    className="gap-2"
                  >
                    <Download className="size-4" />
                    Download
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
