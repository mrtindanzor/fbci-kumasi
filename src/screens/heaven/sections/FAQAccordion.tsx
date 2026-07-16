import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

const faqs = [
	{
		question: "Is heaven real?",
		answer:
			"Yes, the Bible speaks of Heaven as a real place of eternal peace and presence with God. It is described not just as a destination, but as the culmination of our relationship with our Creator.",
	},
	{
		question: "What must I do to be saved?",
		answer:
			"Scripture teaches that salvation is a gift received through faith in Jesus Christ. It involves acknowledging our need for a savior, believing in Christ's sacrifice, and committing to follow Him.",
	},
	{
		question: "Can I lose my salvation?",
		answer:
			"We believe in the security of the believer, resting on God's promise that nothing can separate us from His love. Our assurance comes from His faithfulness, not our own perfection.",
	},
]

export function FAQAccordion() {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	return (
		<section className="section-gap">
			<div className="container-app max-w-3xl mx-auto">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-12">
						Common Questions
					</h2>
				</AnimatePosition>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<AnimatePosition key={faq.question} variants={slideUp}>
							<div className="bg-surface-container rounded-2xl border border-outline-variant/30 overflow-hidden">
								<button
									type="button"
									onClick={() =>
										setOpenIndex(openIndex === index ? null : index)
									}
									className="w-full flex items-center justify-between p-6 text-left"
								>
									<span className="font-headline font-semibold text-primary">
										{faq.question}
									</span>
									<span
										className={`material-symbols-outlined text-secondary transition-transform duration-200 ${
											openIndex === index ? "rotate-180" : ""
										}`}
									>
										expand_more
									</span>
								</button>
								<AnimatePresence>
									{openIndex === index && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.2 }}
											className="overflow-hidden"
										>
											<div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
												{faq.answer}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</AnimatePosition>
					))}
				</div>
			</div>
		</section>
	)
}
