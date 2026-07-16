export type CollegeResource = {
	id: string
	title: string
	format: string
	size: string
	description: string
}

export type CollegeData = {
	name: string
	tagline: string
	stats: {
		label: string
		value: string
	}[]
}
