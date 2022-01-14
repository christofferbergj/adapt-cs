import type { GetStaticProps, NextPage } from 'next'
import dayjs from 'dayjs'

import { getSSGHelpers } from '@server/ssg'

import { usePendingFines } from '@features/admin/hooks/usePendingFines'

import { Container } from '@app/core/components/layout/Container'
import { Overview } from '@app/core/components/elements/Overview'
import { Avatar } from '@app/core/components/elements/Avatar'
import { Layout } from '@app/core/components/common/Layout'
import { AuthGuard } from '@app/core/components/common/AuthGuard'
import { FineStatus } from '@app/fines/components/FineStatus'
import { FineActions } from '@features/admin/components/FineActions'

const AdminFines: NextPage = () => {
  const { fines } = usePendingFines()

  return (
    <AuthGuard requireAdmin>
      <Layout>
        <Layout.Space>
          <Container className="relative">
            {fines && fines.length > 0 ? (
              <div>
                <Overview>
                  <Overview.Header>
                    <span className="basis-52">Bødetager</span>
                    <span className="basis-36">Bøde</span>
                    <span className="basis-36">Dato</span>
                    <span className="flex-1">Pris</span>
                    <span className="flex-1">Status</span>
                    <span className="flex-1">Handlinger</span>
                  </Overview.Header>

                  {fines.map((fine) => (
                    <Overview.Row key={fine.id}>
                      <Overview.Name>
                        <Avatar
                          name={fine.owner.name}
                          imageUrl={fine.owner.avatar}
                          size="sm"
                        />
                        <span>{fine.owner.name}</span>
                      </Overview.Name>

                      <Overview.Fee>
                        <span>{fine.title}</span>
                      </Overview.Fee>

                      <Overview.Date>
                        <span>
                          {dayjs(fine.createdAt).format('DD.MM.YYYY - HH:mm')}
                        </span>
                      </Overview.Date>

                      <Overview.Price>
                        <span>{fine.price} kr.</span>
                      </Overview.Price>

                      <Overview.Status>
                        <FineStatus status={fine.status} />
                      </Overview.Status>

                      <Overview.Actions>
                        <FineActions fine={fine} />
                      </Overview.Actions>
                    </Overview.Row>
                  ))}
                </Overview>
              </div>
            ) : (
              'There are no more pending fines 🎉'
            )}
          </Container>
        </Layout.Space>
      </Layout>
    </AuthGuard>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const ssg = await getSSGHelpers()

  await ssg.fetchQuery('fines.pending')

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

export default AdminFines
