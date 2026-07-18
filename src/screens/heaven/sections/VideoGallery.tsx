import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Image } from "@/shared/ui/primitives/Image"

const videos = [
	{
		title: "The Foundation of Hope",
		duration: "24:15",
		description:
			"Pastor Anderson explores the biblical definition of salvation and why it is the greatest gift ever offered to humanity.",
		thumbnail: "https://picsum.photos/seed/video-hope/400/225",
	},
	{
		title: "Walking in Assurance",
		duration: "18:40",
		description:
			"A deep dive into the scriptures that provide confidence in our eternal destiny and the peace that follows.",
		thumbnail: "https://picsum.photos/seed/video-assurance/400/225",
	},
	{
		title: "A New Beginning",
		duration: "32:05",
		description:
			"Understanding the transformation that takes place when we commit our lives to Christ and join a faith community.",
		thumbnail: "https://picsum.photos/seed/video-beginning/400/225",
	},
]

export function VideoGallery() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center justify-between mb-12">
						<div>
							<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
								Watch & Listen
							</h2>
						</div>
					</div>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6"
				>
					{videos.map((video) => (
						<motion.div
							key={video.title}
							variants={slideUp}
							className="bg-surface rounded-2xl overflow-hidden border border-outline-variant/30"
						>
							<div className="relative aspect-video">
								<Image
									src={video.thumbnail}
									alt={video.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
									<span className="material-symbols-outlined text-white text-5xl">
										play_arrow
									</span>
								</div>
								<span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
									{video.duration}
								</span>
							</div>
							<div className="p-5">
								<h3 className="font-headline font-semibold text-primary mb-2">
									{video.title}
								</h3>
								<p className="text-on-surface-variant text-sm leading-relaxed">
									{video.description}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
