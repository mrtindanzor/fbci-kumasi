export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
      <span className="material-symbols-outlined text-5xl md:text-6xl text-outline mb-4">
        music_off
      </span>
      <p className="text-lg font-headline font-semibold text-primary mb-1">
        No Music Available
      </p>
      <p className="text-sm">Check back later for new albums.</p>
    </div>
  )
}
