export type Roles = "admin" | "user"

export interface UserAccountType {
  username: string
  email: string
  name: string
  roles: Roles[]
}
