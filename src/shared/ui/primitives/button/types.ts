import type { LinkProps as TanstackLinkProps } from "@tanstack/react-router"
import type { VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import type { ExtractVariantsTypes } from "@/shared/types/utils/ExtractVariants"
import type { buttonVariants } from "./constants"

type ButtonVariants = VariantProps<typeof buttonVariants>

export type ButtonProps = ComponentProps<"button"> & ButtonVariants
export type PillProps = ComponentProps<"span"> & ButtonVariants
type LinkVariants = ExtractVariantsTypes<typeof buttonVariants>

export type LinkProps = ComponentProps<"a"> &
  Omit<TanstackLinkProps, "to" | "search"> & {
    isActive?: boolean
  } & LinkVariants
