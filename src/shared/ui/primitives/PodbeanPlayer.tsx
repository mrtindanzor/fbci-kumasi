type PlayerProps = { src: string }
export function Player({ src }: PlayerProps) {
	return (
		<iframe
			title="Podbean Player"
			src={src}
			width="100%"
			height="315"
			allowFullScreen
		/>
	)
}
