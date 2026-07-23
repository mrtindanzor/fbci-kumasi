export function EmptyState() {
  return (
    <section className="section-gap">
      <div className="container-app">
        <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl md:text-6xl text-outline mb-4">
            volunteer_activism
          </span>
          <p className="text-lg font-headline font-semibold text-primary mb-1">
            No Active Projects
          </p>
          <p className="text-sm">
            There are no projects seeking funding at this time. Check back later
            for new missions opportunities.
          </p>
        </div>
      </div>
    </section>
  )
}
