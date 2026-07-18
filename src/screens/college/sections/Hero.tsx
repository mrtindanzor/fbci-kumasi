import { Download, Eye } from "lucide-react"
import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { BackgroundImage } from "@/shared/ui/primitives/BackgrounImage"
import { collegeData } from "../data"

export function Hero() {
	return (
		<section className="relative min-h-app-height pt-header-claim flex items-center bg-primary overflow-hidden">
			<BackgroundImage
				url="/images/hacwa-poster.avif"
				className="*:bg-center opacity-40"
			/>

			<div className="absolute inset-0 bg-linear-to-t from-primary via-primary/60 to-transparent" />

			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideUp} className="max-w-3xl">
					<img
						src="/images/hacwa-crest.avif"
						alt="HACWA College Crest"
						className="w-20 h-20 md:w-24 md:h-24 object-contain mb-8"
					/>

					<p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
						Hyles-Anderson College
					</p>

					<h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-white leading-tight mb-4">
						{BRANDING.college.name}
					</h1>

					<p className="text-lg md:text-xl text-white/70 max-w-xl mb-10">
						{collegeData.tagline}
					</p>

					<div className="flex flex-wrap gap-4">
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
				</AnimatePosition>
			</div>
		</section>
	)
}
