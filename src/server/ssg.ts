import { createSSGHelpers } from '@trpc/react/ssg'

import { appRouter } from '@server/appRouter'
import { createContext } from '@server/context'
import { transformer } from '@server/types'

export async function getSSGHelpers() {
  const ssgHelpers = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  })

  return ssgHelpers
}
