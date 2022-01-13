import * as trpc from '@trpc/server'
import type { Context } from '@server/context'

/**
 * Helper function to create a router with context
 */
export function createRouter() {
  return trpc.router<Context>()
}
