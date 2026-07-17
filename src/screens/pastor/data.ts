import { CHURCH_INFO } from "@/shared/db"
import type { PastorData } from "./data.types"

const year = new Date().getFullYear()

export const pastorData: PastorData = {
	name: CHURCH_INFO.pastor.name,
	title: CHURCH_INFO.pastor.role,
	quote:
		"... choose you this day whom ye will serve; ... but as for me and my house, we will serve the LORD.",
	quoteReference: "Joshua 24:15",
	biography: [
		"Pastor Ted Speer and his wife, Elizabeth, were married in July of 1997. God has blessed them with five children: Kimberly, James, Rachel, Grace, and Michael.",
		"Pastor Speer grew up going to church, but he was not saved until he was twenty years old. God did an amazing work in his heart, and Pastor Speer's life was greatly changed. Upon completing his B.S. degree in Animal Science from Virginia Tech in 1994, Pastor Speer enrolled in Hyles-Anderson College, a Bible college in NW Indiana, USA. Elizabeth grew up in New Mexico and was saved as a small child. The two of them met in Bible college and were married. Elizabeth graduated with a B.S. degree in Elementary Education in 1997 while Pastor Speer graduated in 2000 with a B.S. degree in Pastoral Theology.",
		"After graduation, Pastor Speer became a teacher at Hyles-Anderson College. In 2002 he also became the Assistant Director of the Chapel Ministry of First Baptist Church of Hammond, Indiana. While serving as an assistant ministry director, he pastored his own church in Chicago, Illinois.",
		"In 2006 he became an Assistant Pastor of First Baptist Church of Hammond, Indiana, serving as the Chapel Ministry director. In this ministry he was the overseer of five inner-city churches.",
		"In 2009 the Speer family moved to Ghana and Pastor Speer became the senior pastor of Fundamental Baptist Church International, and president of Hyles-Anderson College of West Africa. In 2011 Pastor Speer was awarded an Honorary Doctorate of Humanities from his alma mater, Hyles-Anderson College of Crown Point, Indiana.",
		"Mrs. Speer faithfully serves the church as a pianist, the Sunday School teacher of Life Builders Ladies class, and Nursery worker. She is a great blessing to her husband and church family!",
		"Pastor and Mrs. Speer's oldest daughter Kimberly is serving with her husband at the Bethel Baptist Church in Washington State, USA. James and Rachel are currently attending Hyles-Anderson Bible College in Crown Point, Indiana. Grace and Michael are serving faithfully at Fundamental Baptist Church International.",
	],
	stats: [
		{ label: "Years in Ministry", value: `${year - 2000}+` },
		{ label: "Years at FBCI Ghana", value: `${year - 2009}+` },
	],
	timeline: [
		{
			period: "1994",
			title: "B.S. Animal Science",
			description:
				"Graduated from Virginia Tech with a degree in Animal Science.",
			icon: "school",
		},
		{
			period: "July 1997",
			title: "Married to Elizabeth",
			description: "Married his wife Elizabeth, who he met in Bible college.",
			icon: "favorite",
		},
		{
			period: "2000",
			title: "B.S. Pastoral Theology",
			description:
				"Graduated from Hyles-Anderson College with a degree in Pastoral Theology.",
			icon: "auto_stories",
		},
		{
			period: "2002 — 2006",
			title: "Chapel Ministry & Chicago Pastorate",
			description:
				"Served as Assistant Director of the Chapel Ministry while pastoring a church in Chicago.",
			icon: "church",
		},
		{
			period: "2006 — 2009",
			title: "Assistant Pastor at First Baptist Hammond",
			description:
				"Served as Assistant Pastor overseeing the Chapel Ministry and five inner-city churches.",
			icon: "groups",
		},
		{
			period: `2009 — Present`,
			title: `Senior Pastor — FBCI Ghana`,
			description:
				"Moved to Ghana to become Senior Pastor of Fundamental Baptist Church International and President of Hyles-Anderson College of West Africa.",
			icon: "public",
		},
		{
			period: "2011",
			title: "Honorary Doctorate of Humanities",
			description:
				"Awarded an Honorary Doctorate of Humanities from Hyles-Anderson College.",
			icon: "military_tech",
		},
	],
	credentials: [
		{
			icon: "school",
			text: "B.S. Animal Science, Virginia Tech (1994)",
		},
		{
			icon: "auto_stories",
			text: "B.S. Pastoral Theology, Hyles-Anderson College (2000)",
		},
		{
			icon: "military_tech",
			text: "Honorary Doctorate of Humanities (2011)",
		},
		{
			icon: "public",
			text: "President, Hyles-Anderson College of West Africa",
		},
	],
}
