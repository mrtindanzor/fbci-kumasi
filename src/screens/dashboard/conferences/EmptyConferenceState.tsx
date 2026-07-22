import { Calendar, Eye } from "lucide-react"
import { routes } from "@/shared/routes"
import { Link } from "@/shared/ui/primitives/button"

export function EmptyConferenceState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-surface-container p-6 mb-6">
        <Calendar className="size-12 text-on-surface-variant" />
      </div>
      <h2 className="font-headline text-2xl text-on-surface mb-2">
        No Active Conference
      </h2>
      <p className="text-on-surface-variant max-w-md mb-8">
        Create your annual conference details to publish them on the website.
        Manage schedules, speakers, and registration in one place.
      </p>
      <div className="flex gap-4">
        <Link
          href={routes.dashboard.conferences.new}
          variant="primary"
          size="sm"
        >
          <Calendar className="size-4 mr-2" />
          Create Conference
        </Link>
        <Link
          href={routes.conferences}
          variant="secondary"
          size="sm"
          target="_blank"
        >
          <Eye className="size-4 mr-2" />
          View Public Page
        </Link>
      </div>
    </div>
  )
}
