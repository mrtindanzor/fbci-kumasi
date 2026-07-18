import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

const SUPPORT_AREAS = [
  {
    icon: "engineering",
    title: "Facility Maintenance",
    description:
      "Ensuring our physical campuses remain clean, safe, and functional for all students and congregants.",
  },
  {
    icon: "school",
    title: "Scholarship Fund",
    description:
      "Helping students at HACWA cover tuition and living expenses as they prepare for full-time ministry.",
  },
] as const

export function OngoingSupport() {
  return (
    <section className="section-gap bg-surface-container">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              Sustaining the Legacy: Ongoing Support
            </h2>
            <p className="text-on-surface-variant">
              While these specific project goals have been met, the mission
              continues. Ongoing support covers maintenance, staffing, and
              operational costs to ensure these facilities serve the kingdom for
              generations to come.
            </p>
          </div>
        </AnimatePosition>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          {SUPPORT_AREAS.map((area) => (
            <AnimatePosition key={area.title} variants={slideUp}>
              <div className="bg-surface rounded-xl p-6 border border-outline-variant text-center">
                <span className="material-symbols-outlined text-4xl text-secondary mb-3 block">
                  {area.icon}
                </span>
                <h3 className="font-headline font-semibold text-primary mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {area.description}
                </p>
              </div>
            </AnimatePosition>
          ))}
        </div>
      </div>
    </section>
  )
}
