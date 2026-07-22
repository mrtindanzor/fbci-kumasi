import { useConference } from "@/features/conference"
import { DashboardTopbar } from "@/screens/dashboard"
import { routes } from "@/shared/routes"
import { Link } from "@/shared/ui/primitives/button"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { ConferenceForm } from "./ConferenceForm"
import { EmptyConferenceState } from "./EmptyConferenceState"

export function ConferencePage() {
  const { data: conference, isLoading } = useConference()

  if (isLoading) return <Loading />

  return (
    <div className="space-y-6">
      <DashboardTopbar
        title="Annual Conference"
        actions={
          conference && (
            <Link
              href={routes.conferences}
              variant="secondary"
              size="sm"
              target="_blank"
            >
              View Public Page
            </Link>
          )
        }
      />

      <nav className="flex items-center gap-2 text-sm text-on-surface-variant">
        <Link
          href={routes.dashboard.home}
          variant="ghost"
          size="sm"
          className="h-auto px-1 py-0.5"
        >
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-on-surface">Conferences</span>
      </nav>
      <p className="text-sm text-on-surface-variant">
        Manage the current conference information displayed on the public
        website.
      </p>
      <ConferenceForm initialValues={conference ?? undefined} />
      {!conference && <EmptyConferenceState />}
      {conference && null}
    </div>
  )
}

function Loading() {
  return (
    <div className="flex justify-center py-12">
      <Spinner className="h-8 w-8" />
    </div>
  )
}
