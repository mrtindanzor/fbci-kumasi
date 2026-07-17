import { Download, Eye, Image } from "lucide-react"
import { Link } from "@/shared/ui/primitives/button"
import { PdfThumbnail } from "@/shared/ui/primitives/PdfThumbnail"
import type { Lesson } from "../constants"

type LessonCardProps = {
	lesson: Lesson
}

export function LessonCard({ lesson }: LessonCardProps) {
	return (
		<li className="bg-surface rounded-xl border border-outline-variant overflow-hidden group">
			<div className="h-65 bg-surface-container overflow-hidden">
				<PdfThumbnail
					src={lesson.coverPath}
					alt={`${lesson.title} cover`}
					className="w-full h-full"
				/>
			</div>

			<div className="p-5">
				<p className="text-xs text-on-surface-variant uppercase tracking-wider font-label mb-1">
					Lesson {lesson.id}
				</p>
				<h3 className="font-headline font-semibold text-primary mb-4">
					{lesson.title}
				</h3>

				<div className="flex gap-2">
					<Link
						href={lesson.bookletPath}
						target="_blank"
						rel="noopener noreferrer"
						variant="secondary"
						size="sm"
						className="flex-1 justify-center gap-1.5"
					>
						<Eye className="size-4" />
						View
					</Link>
					<Link
						href={lesson.bookletPath}
						download
						variant="primary"
						size="sm"
						className="flex-1 justify-center gap-1.5"
					>
						<Download className="size-4" />
						Download
					</Link>
				</div>

				<Link
					href={lesson.coverPath}
					download
					target="_blank"
					rel="noopener noreferrer"
					variant="secondary"
					size="sm"
					className="w-full justify-center gap-1.5 mt-2"
				>
					<Image className="size-4" />
					Download Cover
				</Link>
			</div>
		</li>
	)
}
