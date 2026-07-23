import { DOWNLOADS } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

const features = [
  {
    icon: "check_circle",
    title: "Foundational Scriptures",
    description: "A collection of verses detailing the path to heaven.",
  },
  {
    icon: "check_circle",
    title: "Practical Next Steps",
    description: "Guidance on how to grow in your new faith daily.",
  },
]

export function DownloadSection() {
  return (
    <section className="section-gap">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <AnimatePosition variants={slideUp}>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
              Equip Your Journey
            </h2>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-0.5">
                    {feature.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-primary">
                      {feature.title}
                    </p>
                    <p className="text-on-surface-variant text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatePosition>

          <AnimatePosition variants={slideUp}>
            <div className="bg-surface-container rounded-2xl p-4 sm:p-8 border border-outline-variant/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-3xl text-secondary">
                  description
                </span>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider">
                    The Gift
                  </p>
                  <p className="font-headline font-semibold text-primary">
                    Official Salvation Guide
                  </p>
                </div>
              </div>

              <div className="bg-surface rounded-xl p-4 border border-outline-variant/30">
                <p className="font-semibold text-primary text-sm">
                  Salvation PDF
                </p>
                <p className="text-on-surface-variant text-xs mb-3">
                  If you died today, where would you go? Do you want to know for
                  sure you would go to Heaven if you were to die? Don't live
                  another day without getting that settled! If you are unsure of
                  where you will go, you can watch the videos below, or you can
                  get our PDF explaining how to go to Heaven by clicking the
                  button below
                </p>
                <div className="items-center gap-y-2 grid  justify-between">
                  <Link
                    variant="none"
                    size="none"
                    download
                    href={DOWNLOADS.salvationBooklet}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex gap-2 text-secondary font-semibold text-sm hover:underline"
                  >
                    <span className="material-symbols-outlined text-lg">
                      download
                    </span>
                    Download Guide
                  </Link>
                  <span className="text-xs text-on-surface-variant col-start-1 row-start-1 sm:col-start-2">
                    PDF Format • 1.3 MB • Free Access
                  </span>
                </div>
              </div>
            </div>
          </AnimatePosition>
        </div>
      </div>
    </section>
  )
}
