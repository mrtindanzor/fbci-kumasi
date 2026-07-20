import type { Project } from "@/features/project"
import { routes } from "@/shared/routes"
import { Link } from "@/shared/ui/primitives/button"
import { Image } from "@/shared/ui/primitives/Image"
import { cn } from "@/shared/utils/cn"

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const progress = Math.round((project.funded / project.goal) * 100)

  return (
    <li className="grid h-fit gap-4 rounded-lg bg-surface-container-lowest p-2 shadow-sm">
      <Image
        src={project.image}
        alt={project.title}
        className="h-32 w-full shrink-0 rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                project.status === "ongoing"
                  ? "bg-tertiary/10 text-tertiary"
                  : "bg-secondary/10 text-secondary",
              )}
            >
              {project.status === "ongoing" ? "ACTIVE" : "COMPLETED"}
            </span>
          </div>
          <h3 className="mt-1 font-headline text-base text-on-surface">
            {project.title}
          </h3>
          <div className="mt-2">
            <div className="flex justify-between text-xs">
              <span className="text-on-surface-variant">Progress</span>
              <span className="font-medium text-on-surface">{progress}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-container-high">
              <div
                className="h-full rounded-full bg-secondary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="mt-2 flex gap-4 text-xs text-on-surface-variant">
            <span>
              ${project.funded.toLocaleString()} / $
              {project.goal.toLocaleString()}
            </span>
            <span>{project.completionDate}</span>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Link
            href={routes.dashboard.projects.editById(project.id)}
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs"
          >
            Edit
          </Link>
        </div>
      </div>
    </li>
  )
}
