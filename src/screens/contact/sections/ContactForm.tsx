import { useContact } from "@/features/contact"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { FieldError } from "@/shared/ui/primitives/FieldError"
import { Input } from "@/shared/ui/primitives/Input"
import { SocialMediaLinks } from "@/shared/ui/SocialMediaLinks"

const SUBJECTS = [
	"General Inquiry",
	"HACWA Admissions",
	"Prayer Request",
	"Giving & Donations",
]

export function ContactForm() {
	const {
		onSubmit,
		register,
		formState: { errors },
		setValue,
	} = useContact({
		defaultValues: {
			subject: SUBJECTS[0],
		},
	})

	return (
		<section className="section-gap">
			<AnimatePosition variants={slideUp}>
				<div className="text-center mt-12">
					<h3 className="font-headline font-semibold text-primary mb-4 text-lg">
						Follow Our Journey
					</h3>
					<div className="mx-auto mb-5 w-fit">
						<SocialMediaLinks />
					</div>
				</div>
			</AnimatePosition>
			<div className="container-app max-w-2xl mx-auto">
				<AnimatePosition variants={slideUp}>
					<div className="bg-surface rounded-2xl border border-outline-variant p-8 md:p-12">
						<h2 className="text-2xl font-headline font-bold text-primary mb-6">
							Send a Message
						</h2>

						<form className="grid gap-6" onSubmit={onSubmit}>
							<div className="grid sm:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-on-surface mb-1"
									>
										Full Name
									</label>
									<Input
										id="name"
										placeholder="John Doe"
										{...register("name")}
									/>
									<FieldError message={errors.name?.message} />
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-on-surface mb-1"
									>
										Email Address
									</label>
									<Input
										id="email"
										type="email"
										placeholder="example@gmail.com"
										{...register("email")}
									/>
									<FieldError message={errors.email?.message} />
								</div>
							</div>
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-on-surface mb-1"
								>
									Phone Number
								</label>
								<Input
									id="phone"
									type="phone"
									placeholder="020-000-0000"
									{...register("phone")}
								/>
								<FieldError message={errors.phone?.message} />
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
									onChange={(e) => setValue("subject", e.target.value)}
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
									{...register("message")}
									placeholder="I'm interested in..."
									className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-secondary transition-colors resize-none"
								/>
								<FieldError message={errors.message?.message} />
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
