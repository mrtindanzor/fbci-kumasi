declare module "*.css?url" {
	const href: string
	export default href
}

interface ImportMetaEnv {
	readonly [key: string]: string | undefined
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
