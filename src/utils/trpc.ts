import { createReactQueryHooks } from '@trpc/react'

import { type AppRouter } from '@server/appRouter'

// Create react query hooks for trpc
export const trpc = createReactQueryHooks<AppRouter>()
