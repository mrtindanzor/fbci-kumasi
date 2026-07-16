import { useState } from "react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { Input } from "@/shared/ui/primitives/Input"

export function InquiryForm() {
	const [form, setForm] = useState({ name: "", email: "", message: "" })

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		alert("Thank you for your inquiry! We will get back to you soon.")
		setForm({ name: "", email: "", message: "" })
	}

	return (
		<section className="section-gap">
			<div className="container-app">
				<div className="max-w-xl mx-auto">
					<AnimatePosition variants={slideUp}>
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-4">
							Quick Inquiry
						</h2>
					</AnimatePosition>

					<AnimatePosition variants={slideUp}>
						<form onSubmit={handleSubmit} className="space-y-4 mt-8">
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
								placeholder="Message"
								value={form.message}
								onChange={(e) => setForm({ ...form, message: e.target.value })}
								required
								rows={4}
								className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
							/>
							<Button type="submit" variant="primary" className="w-full">
								Send Request
							</Button>
						</form>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
