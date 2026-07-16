import { BRANDING } from "@/shared/constants"
import type { Ministry } from "./ministries.db.types"

export const ministries: Ministry[] = [
	{
		id: "bible-college",
		name: BRANDING.college.name,
		description: "Training the next generation of spiritual leaders.",
		icon: "school",
	},
	{
		id: "kids-church",
		name: "Kids Church",
		description: "Building a strong foundation for our little ones.",
		icon: "child_care",
	},
	{
		id: "youth-ministry",
		name: "Youth Ministry",
		description: "Empowering teenagers to live with purpose.",
		icon: "groups",
	},
	{
		id: "christian-school",
		name: "Christian School",
		description: "Excellence in education with a biblical worldview.",
		icon: "menu_book",
	},
	{
		id: "charity-outreach",
		name: "Charity Outreach",
		description: "Feeding the hungry and clothing the needy.",
		icon: "favorite",
	},
	{
		id: "music-academy",
		name: "Music Academy",
		description: "Cultivating talents for creative worship.",
		icon: "music_note",
	},
	{
		id: "counseling",
		name: "Counseling",
		description: "Healing and support for life's challenges.",
		icon: "psychology",
	},
	{
		id: "missions",
		name: "Missions",
		description: "Spreading the message across global borders.",
		icon: "volunteer_activism",
	},
]

export const ministriesDetail = [
	{
		id: "bible-college",
		name: BRANDING.college.name,
		description:
			"Our Bible College offers an intensive, spiritually grounded curriculum designed to equip future leaders with deep theological knowledge and practical ministry skills. Rooted in tradition but focused on modern application, we provide a transformative educational experience.",
		cta: "Enroll Now",
		image: "https://picsum.photos/seed/bible-college/800/600",
	},
	{
		id: "christian-school",
		name: "Christian School",
		description:
			"We believe in a holistic approach to education. Our school provides a safe and nurturing environment where children grow academically, socially, and spiritually. We integrate faith into every lesson, fostering a generation of principled and compassionate citizens.",
		cta: "View Curriculum",
		image: "https://picsum.photos/seed/christian-school/800/600",
	},
	{
		id: "radio-ministry",
		name: "Radio Ministry",
		description:
			"Bringing the word to the airwaves. Our Radio Ministry reaches thousands daily with uplifting messages, worship music, and insightful talk programs. Whether you're commuting or at home, we are your constant companion in faith and inspiration.",
		cta: "Listen Live",
		icon: "radio",
		image: "https://picsum.photos/seed/radio/800/600",
	},
	{
		id: "tv-ministry",
		name: "TV Ministry",
		description:
			"Visualizing the Gospel for a global audience. Our television broadcasts bring high-quality Christian programming directly to your living room. From televised sermons to documentaries, we use modern media to share timeless truths.",
		cta: "Schedule",
		image: "https://picsum.photos/seed/tv-ministry/800/600",
	},
]
