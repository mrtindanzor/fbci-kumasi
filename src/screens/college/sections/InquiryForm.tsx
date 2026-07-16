import { useState } from "react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { Input } from "@/shared/ui/primitives/Input"

export function InquiryForm() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		program: "",
		message: "",
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Inquiry submitted:", formData)
	}

	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition
					variants={slideUp}
					className="max-w-xl mx-auto text-center"
				>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
						General Inquiry
					</h2>
					<p className="text-on-surface-variant mb-8">
						Have questions? Send us a message below.
					</p>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="max-w-xl mx-auto">
					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							placeholder="Full Name"
							value={formData.fullName}
							onChange={(e) =>
								setFormData({ ...formData, fullName: e.target.value })
							}
							required
						/>
						<Input
							type="email"
							placeholder="Email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							required
						/>
						<Input
							type="tel"
							placeholder="Phone Number"
							value={formData.phone}
							onChange={(e) =>
								setFormData({ ...formData, phone: e.target.value })
							}
						/>
						<div>
							<label className="block text-sm font-medium text-primary mb-1.5">
								Program of Interest
							</label>
							<select
								value={formData.program}
								onChange={(e) =>
									setFormData({ ...formData, program: e.target.value })
								}
								className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
							>
								<option value="">Select a program</option>
								<option value="certificate">Certificate in Ministry</option>
								<option value="diploma">Diploma in Biblical Studies</option>
								<option value="associate">Associate in Leadership</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-primary mb-1.5">
								Message
							</label>
							<textarea
								value={formData.message}
								onChange={(e) =>
									setFormData({ ...formData, message: e.target.value })
								}
								rows={4}
								className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary resize-none"
							/>
						</div>
						<Button
							type="submit"
							variant="primary"
							className="w-full"
							size="lg"
						>
							Send Inquiry
							<span className="material-symbols-outlined text-lg">send</span>
						</Button>
					</form>
				</AnimatePosition>
			</div>
		</section>
	)
}
