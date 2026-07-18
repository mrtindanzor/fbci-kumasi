import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ContactPage } from "@/screens/contact"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/contact")({
	component: ContactPage,
	head: () => ({
		meta: generateMetaData({
			title: "Contact Us",
			description:
				"Get in touch with FBCI. Reach out for prayer requests, inquiries, or spiritual guidance.",
			path: "contact",
			images: opengraphs.select("contact"),
		}),
	}),
})
