export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export type User = {
  id: string
  name: string
  email: string
  avatar: string | null
  role: UserRole
}
