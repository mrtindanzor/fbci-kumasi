import { Download, Eye } from "lucide-react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { collegeData } from "../data"

export function CallToAction() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="bg-primary rounded-3xl p-10 md:p-16 text-center">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">
							Interested in Joining HACWA?
						</h2>
						<p className="text-white/60 max-w-xl mx-auto mb-8">
							Discover everything you need to know about our programs, courses,
							and admissions by viewing the official prospectus.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<a
								href={collegeData.prospectus.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 h-13 px-8 text-lg rounded-xl bg-secondary text-white hover:bg-secondary/90 transition-colors duration-200 font-body"
							>
								<Eye className="size-5" />
								View Prospectus
							</a>
							<a
								href={collegeData.prospectus.url}
								download
								className="inline-flex items-center gap-2 h-13 px-8 text-lg rounded-xl bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-colors duration-200 font-body"
							>
								<Download className="size-5" />
								Download Prospectus
							</a>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
