import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { Input } from "@/shared/ui/primitives/Input"

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
						<Input
							type="email"
							placeholder="Enter your email"
							className="flex-1"
						/>
						<Button type="submit" variant="primary" size="md">
							Subscribe
						</Button>
					</form>
				</AnimatePosition>
			</div>
		</section>
	)
}
