export type ConferenceResource = {
	id: string
	title: string
	format: string
	size: string
	description: string
}

export type RegistrationTier = {
	id: string
	name: string
	price: number
	perPerson: boolean
	description: string
}
