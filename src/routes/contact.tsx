import { createFileRoute } from "@tanstack/react-router"
import { ContactPage } from "@/screens/contact"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/contact")({
	component: ContactPage,
	head: () => ({
		title: `Contact Us | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `Get in touch with ${BRANDING.name}. Reach out for prayer requests, inquiries, or spiritual guidance.`,
			},
		],
	}),
})
