export type Roles = "admin" | "user"

export interface UserAccountType {
	email: string
	name: string
	roles: Roles[]
}
