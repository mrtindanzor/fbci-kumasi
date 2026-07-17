import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

const SUBJECTS = [
	"General Inquiry",
	"HACWA Admissions",
	"Prayer Request",
	"Giving & Donations",
]

export function ContactForm() {
	return (
		<section className="section-gap">
			<div className="container-app max-w-2xl mx-auto">
				<AnimatePosition variants={slideUp}>
					<div className="bg-surface rounded-2xl border border-outline-variant p-8 md:p-12">
						<h2 className="text-2xl font-headline font-bold text-primary mb-6">
							Send a Message
						</h2>

						<form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
							<div className="grid sm:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-on-surface mb-1"
									>
										Full Name
									</label>
									<input
										id="name"
										type="text"
										placeholder="Full Name"
										className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-secondary transition-colors"
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-on-surface mb-1"
									>
										Email Address
									</label>
									<input
										id="email"
										type="email"
										placeholder="Email Address"
										className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-secondary transition-colors"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-on-surface mb-1"
								>
									Subject
								</label>
								<select
									id="subject"
									className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface text-on-surface focus:outline-none focus:border-secondary transition-colors"
								>
									{SUBJECTS.map((subj) => (
										<option key={subj} value={subj}>
											{subj}
										</option>
									))}
								</select>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-on-surface mb-1"
								>
									Message
								</label>
								<textarea
									id="message"
									rows={5}
									placeholder="Message"
									className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-secondary transition-colors resize-none"
								/>
							</div>

							<button
								type="submit"
								className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
							>
								Send Message
								<span className="material-symbols-outlined text-lg">send</span>
							</button>
						</form>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
