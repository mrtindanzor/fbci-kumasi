import { motion } from "framer-motion"
import { BRANDING } from "@/shared/constants"
import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

type Belief = {
	icon: string
	title: string
	description: string
	reference: string
}

const beliefs: Belief[] = [
	{
		icon: "auto_stories",
		title: "We all are sinners.",
		description: "We have all sinned and fall short of the glory of God.",
		reference: "Romans 3:23",
	},
	{
		icon: "favorite",
		title: "There is a punishment for sin.",
		description: "We deserve to die and go to Hell because of our sin.",
		reference: "Romans 6:23a, Revelation 21:8",
	},
	{
		icon: "groups",
		title: "We cannot save ourselves.",
		description: "There is nothing we can do to save ourselves",
		reference: "Titus 3:5, Ephesians 2:8-9, James 2:10",
	},
	{
		icon: "groups",
		title: "Why Jesus came to die.",
		description: "Jesus died to pay for our sins.",
		reference: "Romans 5:8",
	},
	{
		icon: "groups",
		title: "How we can be saved.",
		description:
			"We receive the gift of eternal life by faith in Christ Jesus alone.",
		reference: "Romans 3:28, Romans 6:23b, John 3:16,18,36",
	},
	{
		icon: "groups",
		title: "Eternal Security.",
		description: "Once we are saved, we are ALWAYS saved.",
		reference: "Galatians 3:26, John 5:24, Romans 4:1-8",
	},
]

const scriptureVerses = [
	"I Corinthians 3:10–15",
	"Ephesians 2:8–10",
	"Matthew 6:20",
	"I Peter 2:9",
]

export function Beliefs() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-12">
						What We Believe
					</h2>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid gap-6 max-w-5xl mx-auto"
				>
					<ul className="space-y-6">
						{beliefs.map((belief) => (
							<BeliefCard key={belief.title} {...belief} />
						))}
					</ul>
				</motion.div>

				<AnimatePosition variants={slideUp} className="max-w-5xl mx-auto">
					<div className="bg-primary rounded-2xl p-8 md:p-10 text-center text-white mt-12">
						<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
							lightbulb
						</span>
						<h3 className="text-2xl md:text-3xl font-headline font-bold mb-3">
							Want a Deeper Understanding?
						</h3>
						<p className="text-white/80 max-w-xl mx-auto mb-6">
							The Bible is clear about salvation and eternal life. Explore God's
							plan for yourself and discover the assurance that comes from
							knowing His Word.
						</p>
						<Link
							href={routes.heaven}
							variant="gold"
							size="lg"
							className="font-label"
						>
							Learn More
							<span className="material-symbols-outlined text-lg">
								arrow_forward
							</span>
						</Link>
					</div>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="max-w-5xl mx-auto mt-16">
					<h3 className="text-2xl md:text-3xl font-headline font-bold text-primary text-center mb-8">
						The Authority of God&rsquo;s Word and Christian Living
					</h3>

					<div className="grid gap-6 md:grid-cols-2">
						<div className="bg-surface rounded-2xl p-8 border border-outline-variant/30">
							<span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
								auto_stories
							</span>
							<h4 className="text-xl font-headline font-semibold text-primary mb-3">
								The Authority of God&rsquo;s Word
							</h4>
							<p className="text-on-surface-variant leading-relaxed mb-4">
								We believe the Word of God is our authority and guide for both
								our doctrine and Christian living.
							</p>
							<p className="text-on-surface-variant leading-relaxed">
								We exclusively use the <strong>King James Version</strong> of
								the Bible.
							</p>
						</div>

						<div className="bg-surface rounded-2xl p-8 border border-outline-variant/30">
							<span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
								favorite
							</span>
							<h4 className="text-xl font-headline font-semibold text-primary mb-3">
								Christian Living
							</h4>
							<p className="text-on-surface-variant leading-relaxed">
								We believe that a person is saved from Hell by{" "}
								<strong>faith alone</strong> without works. However, we also
								believe that born-again believers are to dedicate their lives to
								the service of their Saviour. Works for God have a very
								important purpose in our lives. When we live a life that is
								dedicated to Christ and His truths, we secure for ourselves
								blessings and rewards from our Heavenly Father. Christians are
								to be separated, peculiar people.
							</p>
						</div>
					</div>

					<div className="mt-6">
						<p className="text-sm font-semibold text-on-surface-variant mb-3">
							Supporting Scriptures
						</p>
						<div className="flex flex-wrap gap-2">
							{scriptureVerses.map((verse) => (
								<span
									key={verse}
									className="inline-block bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-sm font-medium"
								>
									{verse}
								</span>
							))}
						</div>
					</div>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="max-w-5xl mx-auto mt-16">
					<div className="bg-primary rounded-2xl p-8 md:p-10 text-center text-neutral-300">
						<p className="leading-relaxed max-w-2xl mx-auto mb-8">
							If you have any questions about the beliefs of {BRANDING.name}{" "}
							concerning any doctrine, we would be delighted to hear from you.
							Please don&rsquo;t hesitate to contact us.
						</p>
						<Link
							href={routes.contact}
							variant="gold"
							size="lg"
							className="font-label"
						>
							Contact Us
							<span className="material-symbols-outlined text-lg">
								arrow_forward
							</span>
						</Link>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}

function BeliefCard({ title, description, reference }: Belief) {
	return (
		<motion.li
			key={title}
			variants={slideUp}
			className="bg-surface rounded-2xl p-8 border border-outline-variant/30"
		>
			<h3 className="text-xl font-headline font-semibold text-primary mb-3">
				{title}
			</h3>
			<p className="text-on-surface-variant leading-relaxed mb-4">
				{description}
			</p>
			<p className="text-sm text-secondary font-medium">{reference}</p>
		</motion.li>
	)
}
