import type { ReactNode } from "react"

type DashboardTopbarProps = {
  title: string
  actions?: ReactNode
}

export function DashboardTopbar({ title, actions }: DashboardTopbarProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-headline text-2xl text-on-surface">{title}</h1>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}
