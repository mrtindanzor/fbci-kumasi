import { CHURCH_INFO } from "@/shared/db"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { PaymentForm } from "@/shared/ui/primitives/PaymentForm"

export function GivingOptions() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<blockquote className="text-center max-w-2xl mx-auto mb-12">
						<p className="text-lg font-headline italic text-on-surface-variant">
							&ldquo;Every man according as he purposeth in his heart, so let
							him give; not grudgingly, or of necessity: for God loveth a
							cheerful giver.&rdquo;
						</p>
						<cite className="text-sm text-on-surface-variant mt-2 block">
							&mdash; 2 Corinthians 9:7
						</cite>
					</blockquote>
				</AnimatePosition>

				<AnimatePosition variants={slideUp}>
					<h2 className="text-2xl font-headline font-bold text-primary text-center mb-8">
						Choose Your Location
					</h2>

					<div className="grid gap-8 max-w-4xl mx-auto mb-16">
						<div id="local" className="grid gap-6">
							<div className="bg-surface rounded-2xl sm:border sm:border-outline-variant/30 py-8 px-4 sm:px-8">
								<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
									smartphone
								</span>
								<h3 className="font-headline font-semibold text-primary text-lg mb-2">
									Donating from Ghana
								</h3>
								<p className="text-sm text-on-surface-variant mb-6">
									MOMO (MTN, AirtelTigo, Telecel) or bank account
								</p>
								<p className="text-on-surface-variant">
									Dial{" "}
									<Link
										href={`tel:${CHURCH_INFO.giving}`}
										size="none"
										variant="none"
										className="p-0"
									>
										<code className="mx-1 flex items-end leading-8 border-b-2 bg-surface-container font-semibold px-2 text-lg">
											{CHURCH_INFO.giving}
										</code>
									</Link>
									and follow the prompts. If you are giving anything except
									tithe, use the reference option to state your purpose.
								</p>
							</div>
						</div>

						<div
							id="overseas"
							className="bg-neutral-50 rounded-2xl sm:border sm:border-outline-variant/30 py-8"
						>
							<div className="px-4 sm:px-8">
								<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
									public
								</span>
								<h3 className="font-headline font-semibold text-primary text-lg mb-2">
									United States Giving
								</h3>
								<p className="text-sm text-on-surface-variant mb-6">
									If you would like to donate to our ministry, you can do so
									through our mission board, Fundamental Baptist Missions
									International. <br /> They have provided us with the form
									below, so you don't need to leave our site. Simply select your
									preferences, fill in the fields, and you're good to go. Thank
									you for setting your "<b>affection on things above</b>"!
								</p>
							</div>
							<div className="space-y-4">
								<div className="px-4 sm:px-8">
									<span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
										<span className="material-symbols-outlined text-lg">
											lock
										</span>
										Secure Donation Portal
									</span>
								</div>

								<PaymentForm
									title="Give to Support Missions"
									src={CHURCH_INFO.donationLink}
									className="h-350 sm:h-250"
								/>
							</div>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
