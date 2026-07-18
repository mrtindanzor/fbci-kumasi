export type ConferenceResource = {
	id: string
	title: string
	file: string
	type: "pdf"
	size?: string
}

export type Conference = {
	id: string
	title: string
	subtitle: string
	poster: string
	theme: string
	schedule: string
	location?: string
	description: string
	closingMessage: string
	resources: ConferenceResource[]
}
