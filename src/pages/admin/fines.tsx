import type { GetStaticProps, NextPage } from 'next'
import { ITEMS_PER_PAGE } from '@config/constants'
import { appRouter } from '@server/appRouter'
import { createContext } from '@server/context'
import { createSSGHelpers } from '@trpc/react/ssg'
import { transformer } from '@server/types'
import { useUnpaidFines } from '@features/admin/hooks/useUnpaidFines'

const AdminFines: NextPage = () => {
  const { fines } = useUnpaidFines({ page: 0, perPage: ITEMS_PER_PAGE })

  return null
}

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
