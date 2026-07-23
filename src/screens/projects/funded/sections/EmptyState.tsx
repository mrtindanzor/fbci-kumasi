export function EmptyState() {
  return (
    <section className="section-gap">
      <div className="container-app">
        <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl md:text-6xl text-outline mb-4">
            check_circle
          </span>
          <p className="text-lg font-headline font-semibold text-primary mb-1">
            All Projects Unfunded
          </p>
          <p className="text-sm">
            All current missions projects have not been fully supported. Check
            back later for funded projects.
          </p>
        </div>
      </div>
    </section>
  )
}
