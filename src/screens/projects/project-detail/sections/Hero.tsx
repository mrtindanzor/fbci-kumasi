import type { Project } from "@/features/project"
import { routes } from "@/shared/routes"
import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Image } from "@/shared/ui/primitives/Image"

type HeroProps = {
  project: Project
}

export function Hero({ project }: HeroProps) {
  const progressPercent = Math.round((project.funded / project.goal) * 100)
  const remaining = project.goal - project.funded
  const isFunded = project.status === "funded"
  const statusLabel = isFunded ? "PROJECT FULLY FUNDED" : "NEEDS YOUR SUPPORT"
  const statusIcon = isFunded ? "auto_awesome" : "volunteer_activism"

  return (
    <section className="relative min-h-app-height pt-40 flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/20 to-primary/90" />
      </div>

      <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop pb-16 flex flex-col md:flex-row justify-between items-end gap-10">
        <AnimatePosition variants={slideInLeft} className="max-w-3xl">
          <h1 className="font-h1-mobile md:font-h1 text-h1-mobile md:text-h1 text-white mb-4">
            {project.title}
          </h1>
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-50 text-on-secondary-container font-label font-bold text-label mb-6">
            <span
              className="material-symbols-outlined text-caption"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {statusIcon}
            </span>
            {statusLabel}
          </span>
        </AnimatePosition>

        <AnimatePosition variants={slideUp} className="w-full md:w-96">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/20">
            <div className="flex justify-between items-end mb-2">
              <span className="font-h3 text-h3 text-primary">
                ${project.goal.toLocaleString()}
              </span>
              <span className="font-label text-label text-on-surface-variant">
                GOAL: ${project.goal.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-surface-container-highest h-4 rounded-full overflow-hidden mb-6">
              <div
                className="bg-secondary h-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  volunteer_activism
                </span>
                <span className="font-label text-label text-primary">
                  SUPPORTERS
                </span>
              </div>
              <span className="font-label text-label text-secondary font-bold">
                {progressPercent}% COMPLETE
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-on-surface-variant mb-8">
              <span>${project.funded.toLocaleString()} raised</span>
              {!isFunded && (
                <span>${remaining.toLocaleString()} remaining</span>
              )}
            </div>
            <Link
              href={routes.projects.projectByIdAndGive(project.id)}
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">payments</span>
              <span className="whitespace-nowrap text-sm font-semibold">
                GIVE TO THIS PROJECT
              </span>
            </Link>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
