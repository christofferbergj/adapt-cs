import * as Tabs from '@radix-ui/react-tabs'
import dayjs from 'dayjs'
import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'

import type { Fine } from '@app/fines'
import { getSSGHelpers } from '@server/ssg'
import { usePendingFines } from '@features/admin/hooks/usePendingFines'
import { useUnpaidFines } from '@features/admin/hooks/useUnpaidFines'

import { AuthGuard } from '@app/core/components/common/AuthGuard'
import { Avatar } from '@app/core/components/elements/Avatar'
import { Container } from '@app/core/components/layout/Container'
import { FineActions } from '@features/admin/components/FineActions'
import { FineStatus } from '@app/fines/components/FineStatus'
import { Layout } from '@app/core/components/common/Layout'
import { Overview } from '@app/core/components/elements/Overview'
import { AnimateSharedLayout, motion } from 'framer-motion'

type ActiveTab = Extract<Fine['status'], 'unpaid' | 'pending'>

type Trigger = {
  title: string
  type: ActiveTab
}

const triggers: Trigger[] = [
  {
    title: 'Unpaid',
    type: 'unpaid',
  },
  {
    title: 'Pending',
    type: 'pending',
  },
]

const AdminFines: NextPage = () => {
  const { fines: pending } = usePendingFines()
  const { fines: unpaid } = useUnpaidFines()

  const [activeTab, setActiveTab] = useState<ActiveTab>('unpaid')

  return (
    <AuthGuard requireAdmin>
      <Layout>
        <Layout.Space>
          <Container className="relative">
            <Tabs.Root
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as ActiveTab)}
            >
              <div className="mt-6 flex flex-col items-center px-4">
                <Tabs.List className="flex w-full rounded-full bg-gray-4 p-[6px]">
                  <AnimateSharedLayout>
                    {triggers.map(({ title, type }, i) => (
                      <Tabs.Trigger
                        key={i}
                        value={type}
                        className="relative flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold"
                      >
                        {type === activeTab && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-gray-7"
                            layoutId="tab"
                            transition={{
                              type: 'spring',
                              stiffness: 500,
                              damping: 36,
                            }}
                          />
                        )}

                        <span className="relative z-10">{title}</span>
                      </Tabs.Trigger>
                    ))}
                  </AnimateSharedLayout>
                </Tabs.List>
              </div>

              <div className="mt-8">
                <Tabs.Content value="unpaid">
                  {unpaid.length > 0 ? (
                    <div>
                      {unpaid.map((fine) => (
                        <div key={fine.id}>{fine.title}</div>
                      ))}
                    </div>
                  ) : (
                    `There are no more unpaid fines 🎉`
                  )}
                </Tabs.Content>

                <Tabs.Content value="pending">
                  {pending.length > 0 ? (
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

                        {pending.map((fine) => (
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
                                {dayjs(fine.createdAt).format(
                                  'DD.MM.YYYY - HH:mm'
                                )}
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
                    `There are no more pending fines 🎉`
                  )}
                </Tabs.Content>
              </div>
            </Tabs.Root>
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
