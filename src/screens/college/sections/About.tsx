import { ExternalLink } from "lucide-react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { collegeData } from "../data"

export function About() {
	return (
		<section className="section-gap">
			<div className="container-app max-w-3xl mx-auto">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
						About HACWA
					</h2>
					<div className="w-8 h-0.5 bg-secondary rounded-full mb-8" />

					<div className="space-y-4 text-on-surface-variant leading-relaxed">
						<p>
							Hyles-Anderson College of West Africa is committed to training the
							next generation of ministry leaders through rigorous biblical
							education and practical ministry training.
						</p>
						<p>
							For detailed information about our programs, courses, faculty, and
							academic schedule, please refer to the official prospectus.
						</p>
					</div>

					<a
						href={collegeData.prospectus.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 mt-8 text-secondary font-semibold hover:text-secondary/80 transition-colors duration-200"
					>
						View Full Prospectus
						<ExternalLink className="size-4" />
					</a>
				</AnimatePosition>
			</div>
		</section>
	)
}
