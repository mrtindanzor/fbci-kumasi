import { ExternalLink } from "lucide-react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Player } from "@/shared/ui/primitives/PodbeanPlayer"

export function PodcastSection() {
	return (
		<section className="section-gap">
			<div className="py-8" id="sermons">
				<AnimatePosition variants={slideUp}>
					<div className="max-w-2xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
							Sermons by Our Pastor
						</h2>
						<p className="text-on-surface-variant mb-8">
							You can listen here or click the button below to listen on the
							Podbean website.
							<Link
								href="https://fbcikumasi.podbean.com/"
								target="_blank"
								rel="noopener noreferrer"
								size="sm"
								y="center"
								className="whitespace-nowrap gap-x-2 mt-4 mx-auto flex w-fit"
							>
								Go to Podbean <ExternalLink className="size-4" />
							</Link>
						</p>

						<Player src="https://45b0d593-e76f-4149-bcd8-a3755e2d03f9.htmlcomponentservice.com/get_draft?id=45b0d5_af7c353f77233bc6d92a6afb8b7cd210.html" />
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
