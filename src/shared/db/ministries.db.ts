import { routes } from "@/shared/routes"
import { BRANDING } from "../constants"

export type Ministry = {
	featured: boolean
	id: string
	name: string
	description: string
	image: string
	schedule: string[] | null
	cta: [/*title */ string, /*url*/ string][] | null
}

export const MINISTRIES: Ministry[] = [
	{
		featured: true,
		id: "tv-preaching",
		name: "TV Preaching",
		description: `God has blessed us since 2018 with the privilege of preaching on Ghana's most prominent TV station, TV3. Our program, called Fundamental Hour, airs every Sunday morning from 6:00 to 6:30 a.m.

            We have had many people contact us over the last few years to learn more or to tell us how this ministry has changed their lives. We are now on GTV.

            Have you been watching our TV program? If so, we'd love to know. You can contact us via our contact page or on any of our social media platforms.
        `,
		image: "/images/tv-preaching.avif",
		schedule: ["Sundays 6:00 - 6:30 AM"],
		cta: null,
	},
	{
		featured: true,
		id: "bible-college",
		name: "Bible and Ministry Training",
		description:
			"Hyles-Anderson College of West Africa is a Bible college run by our church. Its mission is to train men to serve God. God has blessed us with students from all over Ghana and a few other West African countries. If you are interested in enrolling or learning more, feel free to contact us via our contact page. You can also read the PDF we've made available below to learn a few more details.",
		image: "/images/bible-ministry-bg.avif",
		schedule: null,
		cta: [["Learn More", routes.college]],
	},
	{
		featured: false,
		id: "fundamental-baptist-academy",
		name: "Fundamental Baptist Academy",
		description:
			"Our church also has a Christian school. Our school covers creche all the way through SHS. We have had nine SHS students graduate with our American-standard curriculum, three of whom currently teach in our school. If you are interested in setting up an interview or learning anything more about our school, you can call us.",
		image: "/images/fba-teaching.avif",
		schedule: null,
		cta: [["Call Now", `tel:${BRANDING.fba.phone}`]],
	},
	{
		featured: true,
		id: "radio-preaching",
		name: "Radio Preaching",
		description: `
            In 2020, we were able to get on the radio. This was out of necessity because of covid-19. Now that we are back in church, God has provided the funds for us to stay on the radio. We are currently on SunSum 98.7 FM.

            On Friday evenings, a group of our Ghanaian staff drives to the station, and from 7:00 to 8:00 p.m. they preach and answer questions mainly on salvation.

            Each radio station has its own base audience. So far, we have had the privilege of preaching to the audiences of four stations for a period of time. These include Silver, Angel, Bohye, and SunSum.

            We have seen much fruit from this ministry, and we hope to continue on the radio for as long as God provides the funds.`,
		image: "/images/radio-ministry.avif",
		schedule: ["Fridays 7:00 - 8:00 PM"],
		cta: null,
	},
	{
		featured: false,
		id: "information-center-preaching",
		name: "Information Center Preaching",
		description: `An information center is a privately owned PA system ideally housed and run in a prominent area of the city (like a market). Cone shaped loudspeakers are erected on a pole outside to fill the entire area with the sound of whatever is spoken on the mics inside.

We have had the privilege of preaching on many different information centers across Kumasi. They have proven to be great media for publishing the gospel of our Lord Jesus Christ. Each week, a group of men from our church preaches in at least one somewhere in Kumasi. We have also encouraged our daughter churches to do the same.`,
		image: "/images/information-center-preaching.avif",
		schedule: null,
		cta: null,
	},
	{
		featured: false,
		id: "school-preaching",
		name: "School Preaching",
		description: `Due to covid-19 restrictions, we canceled much of our preaching in schools. However, as restrictions ease, we will resume preaching weekly in schools across Kumasi. If you are interested in having us preach at your school, please contact us.`,
		image: "/images/school-preaching.avif",
		schedule: null,
		cta: [["Call Now", `tel:${BRANDING.fba.phone}`]],
	},
	{
		featured: false,
		id: "market-preaching",
		name: "Market Preaching",
		description: `God led us to start this ministry after covid-19 prevented us from preaching in schools. Each week a group of men from our church pays a visit to a market and preaches the gospel message on a portable PA system. We have had much positive response from this ministry, and several ladies at the markets have put their faith in Christ as a result.`,
		image: "/images/market-preaching.avif",
		schedule: null,
		cta: null,
	},
	{
		featured: false,
		id: "soul-winning",
		name: "Personal Soul Winning",
		description: `Our oldest and still most productive ministry takes the form of personal evangelism. It is everyone's duty to preach the gospel. Every Saturday morning we have what we call our soul-winning meeting. Everyone is welcome. This lasts from 9:15 to 9:45 a.m. After this, we split up into groups and go across the city to win lost souls for Jesus Christ.`,
		image: "/images/personal-soul-winning.avif",
		schedule: ["Saturdays 9:15 - 9:45 AM"],
		cta: null,
	},
]

export function getMinistryById(id: string) {
	return MINISTRIES.find((m) => m.id === id)
}

export const FEATURED_MINISTRIES = MINISTRIES.filter((m) => m.featured)
