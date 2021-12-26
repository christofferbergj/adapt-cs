import superjson from 'superjson'

import { createRouter } from '@server/createRouter'
import { fineTypesRouter } from '@server/routers/fine-types'
import { finesRouter } from '@server/routers/fines'
import { usersRouter } from '@server/routers/users'

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  .merge('fineTypes.', fineTypesRouter)
  .merge('fines.', finesRouter)
  .merge('users.', usersRouter)

export type AppRouter = typeof appRouter
