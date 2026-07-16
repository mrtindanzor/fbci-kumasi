import { useState } from "react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { Input } from "@/shared/ui/primitives/Input"

export function QuestionForm() {
	const [form, setForm] = useState({ name: "", email: "", question: "" })

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		alert("Thank you for your question! A pastor will reach out to you soon.")
		setForm({ name: "", email: "", question: "" })
	}

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
						<form onSubmit={handleSubmit} className="space-y-4">
							<Input
								placeholder="Full Name"
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								required
							/>
							<Input
								type="email"
								placeholder="Email Address"
								value={form.email}
								onChange={(e) => setForm({ ...form, email: e.target.value })}
								required
							/>
							<textarea
								placeholder="Your Question"
								value={form.question}
								onChange={(e) => setForm({ ...form, question: e.target.value })}
								required
								rows={4}
								className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
							/>
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
							<a
								href="mailto:pastor@houseanderson.org"
								className="text-secondary text-sm hover:underline"
							>
								pastor@houseanderson.org
							</a>
						</div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
