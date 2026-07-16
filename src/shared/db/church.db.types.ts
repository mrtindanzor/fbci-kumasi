export type ServiceTime = {
	day: string
	time: string
}

export type ChurchInfo = {
	name: string
	tagline: string
	description: string
	address: string
	phone: string
	email: string
	serviceTimes: ServiceTime[]
	socials: {
		facebook: string
		youtube: string
		email: string
	}
	giving: string
}
