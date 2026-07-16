import type { cva } from "class-variance-authority"

type CvaReturnType = ReturnType<typeof cva>

export type ExtractVariantsTypes<T extends CvaReturnType> =
	Parameters<T>[1] extends {
		variants: infer V
	}
		? {
				[K in keyof V]?: keyof V[K]
			}
		: Record<string, never>
