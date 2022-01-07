import { ITEMS_PER_PAGE } from '@config/constants'
import { useUnpaidFines } from '@features/admin/hooks/useUnpaidFines'
import type { ExtendedNextPage } from '@pages/_app'
import { appRouter } from '@server/appRouter'
import { createContext } from '@server/context'
import { createSSGHelpers } from '@trpc/react/ssg'
import { GetStaticProps } from 'next'
import { transformer } from '@server/types'

const AdminFines: ExtendedNextPage = () => {
  const { fines } = useUnpaidFines({ page: 0, perPage: ITEMS_PER_PAGE })

  console.log(fines)

  return null
}

AdminFines.requireAuth = true

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  })

  await ssg.fetchQuery('fines.unpaid', { take: ITEMS_PER_PAGE, skip: 0 })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

export default AdminFines
