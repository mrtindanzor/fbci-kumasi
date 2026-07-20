export type Roles = "admin" | "user" | "developer"

export interface UserAccountType {
  username: string
  email: string
  name: string
  roles: Roles[]
}
