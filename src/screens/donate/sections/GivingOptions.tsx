import { CHURCH_INFO } from "@/shared/db"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

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

					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
						<div className="bg-surface rounded-2xl border border-outline-variant p-8">
							<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
								public
							</span>
							<h3 className="font-headline font-semibold text-primary text-lg mb-2">
								United States Giving
							</h3>
							<p className="text-sm text-on-surface-variant mb-6">
								Secure international processing
							</p>
							<div className="space-y-4">
								<span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
									<span className="material-symbols-outlined text-lg">
										lock
									</span>
									Secure Donation Portal
								</span>
								<Button className="block w-full text-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
									Open Donation Form
								</Button>
							</div>
						</div>

						<div className="grid gap-6">
							<div className="bg-surface rounded-2xl border border-outline-variant p-8">
								<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
									smartphone
								</span>
								<h3 className="font-headline font-semibold text-primary text-lg mb-4">
									Mobile Money
								</h3>
								<div className="space-y-3 text-sm">
									<div>
										<p className="font-semibold text-primary">
											MTN Mobile Money
										</p>
										<p className="text-on-surface-variant">
											{CHURCH_INFO.giving}
										</p>
									</div>
									<div>
										<p className="font-semibold text-primary">Telecel Cash</p>
										<p className="text-on-surface-variant">*110#</p>
									</div>
								</div>
							</div>

							<div className="bg-surface rounded-2xl border border-outline-variant p-8">
								<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
									account_balance
								</span>
								<h3 className="font-headline font-semibold text-primary text-lg mb-4">
									Bank Transfer
								</h3>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-on-surface-variant">Bank</span>
										<span className="font-semibold text-primary">
											GCB Bank PLC
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-on-surface-variant">
											Account Number
										</span>
										<span className="font-semibold text-primary">
											1011130005423
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-on-surface-variant">Branch</span>
										<span className="font-semibold text-primary">
											Accra High Street
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
