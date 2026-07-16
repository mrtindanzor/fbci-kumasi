export type ChurchInfo = {
	name: string
	tagline: string
	description: string
	address: string
	phone: string
	email: string
	serviceTimes: {
		day: string
		time: string
		location: string
		description: string
	}[]
	socials: {
		facebook: string
		youtube: string
		email: string
	}
	giving: string
}
