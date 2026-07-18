import type { Project } from "@/features/project"

type DashboardSummaryCardsProps = {
  projects: Project[]
}

export function DashboardSummaryCards({
  projects,
}: DashboardSummaryCardsProps) {
  const totalProjects = projects.length
  const ongoing = projects.filter((p) => p.status === "ongoing").length
  const funded = projects.filter((p) => p.status === "funded").length
  const totalFunds = projects.reduce((sum, p) => sum + p.funded, 0)

  const cards = [
    { label: "Total Projects", value: totalProjects, icon: "folder" },
    { label: "Ongoing", value: ongoing, icon: "pending" },
    { label: "Completed", value: funded, icon: "check_circle" },
    {
      label: "Total Funds",
      value: `$${totalFunds.toLocaleString()}`,
      icon: "payments",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-secondary">
              {card.icon}
            </span>
          </div>
          <p className="mt-4 text-sm text-on-surface-variant">{card.label}</p>
          <p className="mt-1 text-2xl font-semibold text-on-surface">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  )
}
