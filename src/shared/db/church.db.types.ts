export type ServiceTime = {
	day: string
	time: string
}

export type ChurchInfo = {
	name: string
	tagline: string
	description: string
	address: {
		gpa: string
		poBox: string
	}
	phone: string
	serviceTimes: ServiceTime[]
	socials: {
		facebook: string
		youtube: string
		email: string
	}
	giving: string
	pastor: {
		name: string
		image: string
		profile: [/*title */ string, /*url*/ string]
		role: string
	}
	donationLink: string
}
