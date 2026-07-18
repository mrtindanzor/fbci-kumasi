"use client"

import * as pdfjsLib from "pdfjs-dist"
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import { useCallback, useEffect, useState } from "react"
import { cn } from "@/shared/utils/cn"

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

type PdfThumbnailProps = {
	src: string
	alt: string
	className?: string
	width?: number
}

export function PdfThumbnail({
	src,
	alt,
	className,
	width = 400,
}: PdfThumbnailProps) {
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const renderPage = useCallback(async () => {
		try {
			setLoading(true)
			setError(false)

			const loadingTask = pdfjsLib.getDocument({ url: src })
			const pdf = await loadingTask.promise
			const page = await pdf.getPage(1)

			const scale = width / page.getViewport({ scale: 1 }).width
			const viewport = page.getViewport({ scale })

			const canvas = document.createElement("canvas")
			const context = canvas.getContext("2d")
			if (!context) return

			canvas.width = viewport.width
			canvas.height = viewport.height

			await page.render({ canvasContext: context, viewport, canvas }).promise

			const dataUrl = canvas.toDataURL("image/jpeg", 0.8)
			setImageUrl(dataUrl)
		} catch {
			setError(true)
		} finally {
			setLoading(false)
		}
	}, [src, width])

	useEffect(() => {
		renderPage()
	}, [renderPage])

	if (loading) {
		return (
			<div
				className={cn("bg-surface-container animate-pulse rounded", className)}
			/>
		)
	}

	if (error || !imageUrl) {
		return (
			<div
				className={cn(
					"bg-surface-container flex items-center justify-center rounded",
					className,
				)}
			>
				<span className="material-symbols-outlined text-4xl text-on-surface-variant/40">
					picture_as_pdf
				</span>
			</div>
		)
	}

	return (
		<img
			src={imageUrl}
			alt={alt}
			className={cn("object-cover w-full h-full", className)}
			loading="lazy"
		/>
	)
}
