import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function Newsletter() {
	return (
		<section className="section-gap">
			<div className="container-app max-w-2xl mx-auto text-center">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
						Stay Informed
					</h2>
					<p className="text-on-surface-variant mb-8">
						Receive notifications when new sermon series, course materials, or
						music albums are added to our library.
					</p>

					<form
						className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
						onSubmit={(e) => e.preventDefault()}
					>
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 px-4 py-3 border border-outline-variant rounded-xl bg-surface text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-secondary transition-colors"
						/>
						<button
							type="submit"
							className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
						>
							Subscribe
						</button>
					</form>
				</AnimatePosition>
			</div>
		</section>
	)
}
