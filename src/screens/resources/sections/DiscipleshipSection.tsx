import { ArrowRight, Download } from "lucide-react"
import { COMPLETE_COURSE_ZIP } from "@/screens/discipleship/constants"
import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function DiscipleshipSection() {
  return (
    <section id="discipleship-lesson-books" className="section-gap">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <AnimatePosition variants={slideUp}>
            <span className="material-symbols-outlined text-5xl md:text-6xl text-secondary mb-5 block">
              auto_stories
            </span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
              Discipleship Lesson Books
            </h2>
            <div className="space-y-4 text-on-surface-variant">
              <p>
                This 12-booklet discipleship course was created to help you
                disciple someone else and strengthen new believers in their walk
                with Christ. It is also an excellent resource for personal Bible
                study and spiritual growth.
              </p>
              <p>
                The course is divided into two levels. Level One contains four
                booklets, while Level Two contains eight additional booklets.
              </p>
              <p>
                For the best experience, we recommend downloading the complete
                course as a ZIP archive. If you only need a specific lesson, you
                can also browse and download each booklet individually.
              </p>
            </div>
          </AnimatePosition>

          <AnimatePosition variants={slideUp}>
            <div className="bg-surface-container rounded-2xl p-6 sm:p-8 border border-outline-variant/30">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-3xl text-secondary">
                  folder_zip
                </span>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider">
                    Complete Course
                  </p>
                  <p className="font-headline font-semibold text-primary">
                    12 Booklets + Covers
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={COMPLETE_COURSE_ZIP}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  size="lg"
                  className="w-full text-sm justify-center gap-2"
                >
                  <Download className="size-5" />
                  Download Complete Course (.zip)
                </Link>

                <Link
                  href={routes.resources.lessons}
                  variant="secondary"
                  size="lg"
                  className="w-full text-sm justify-center gap-2"
                >
                  Browse Individual Lessons
                  <ArrowRight className="size-5" />
                </Link>
              </div>

              <p className="text-xs text-on-surface-variant mt-4 text-center">
                ZIP Format · Free Access
              </p>
            </div>
          </AnimatePosition>
        </div>
      </div>
    </section>
  )
}
