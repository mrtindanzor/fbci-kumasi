import { useContact } from "@/features/contact"
import { CHURCH_INFO } from "@/shared/db"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button, Link } from "@/shared/ui/primitives/button"
import { FieldError } from "@/shared/ui/primitives/FieldError"
import { Input } from "@/shared/ui/primitives/Input"
import { Textarea } from "@/shared/ui/primitives/Textarea"

export function QuestionForm() {
	const {
		onSubmit,
		register,
		formState: { errors },
	} = useContact({
		defaultValues: {
			subject: "Question on How to Be Saved",
		},
	})

	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app max-w-3xl mx-auto">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-8">
						Ask a Question
					</h2>
				</AnimatePosition>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<AnimatePosition variants={slideUp} className="md:col-span-2">
						<form onSubmit={onSubmit} className="space-y-4">
							<Input placeholder="Full Name" {...register("name")} required />
							<FieldError message={errors.name?.message} />
							<Input
								type="email"
								placeholder="Email Address"
								{...register("email")}
								required
							/>
							<FieldError message={errors.email?.message} />
							<Input
								type="tel"
								placeholder="Phone Number"
								{...register("phone")}
							/>
							<FieldError message={errors.phone?.message} />
							<Textarea
								placeholder="Your Question"
								{...register("message")}
								required
								rows={4}
							/>
							<FieldError message={errors.message?.message} />
							<Button type="submit" variant="primary" className="w-full">
								Submit Inquiry
							</Button>
						</form>
					</AnimatePosition>

					<AnimatePosition variants={slideUp}>
						<div className="bg-surface rounded-2xl p-6 border border-outline-variant/30">
							<span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
								mail
							</span>
							<p className="font-semibold text-primary text-sm mb-1">
								Direct Inquiry
							</p>
							<Link
								variant="none"
								size="none"
								href={`mailto:${CHURCH_INFO.socials.email}`}
								className="text-secondary text-sm hover:underline"
							>
								{CHURCH_INFO.socials.email}
							</Link>
						</div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
