import { type User, UserRole } from '@domain/user/entities'

/**
 * Check if the user has an admin role
 *
 * @param user - The user to check
 *
 * @returns boolean
 */
export function hasAdminRole(user: User): boolean {
  return user.role === UserRole.Admin
}
