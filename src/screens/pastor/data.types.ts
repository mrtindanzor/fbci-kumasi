export type PastorData = {
	name: string
	title: string
	quote: string
	biography: string[]
	stats: {
		label: string
		value: string
	}[]
	timeline: {
		period: string
		title: string
		description: string
		icon: string
	}[]
	credentials: {
		icon: string
		text: string
	}[]
}
