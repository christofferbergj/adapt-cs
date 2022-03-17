import * as Tabs from '@radix-ui/react-tabs'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { useState } from 'react'

import { useUser } from '@hooks/useUser'

import { Container } from '@app/core/components/layout/Container'
import { useOwnUnpaidFines } from '@features/my-fines/hooks/useOwnUnpaidFines'
import { Overview } from '@app/core/components/elements/Overview'
import { Avatar } from '@app/core/components/elements/Avatar'
import dayjs from 'dayjs'
import { FineStatus } from '@app/fines/components/FineStatus'
import { FineActions } from '@features/my-fines/components/FineActions'

type Tabs = 'your-unpaid-fines' | 'overview'

type Trigger = {
  title: string
  type: Tabs
}

export const LatestFines = () => {
  const [activeTab, setActiveTab] = useState<Tabs>('your-unpaid-fines')
  const { user } = useUser()

  const { fines } = useOwnUnpaidFines({ userId: user?.id })

  const triggers: Trigger[] = [
    {
      title: 'Your unpaid fines',
      type: 'your-unpaid-fines',
    },
    {
      title: 'Overview',
      type: 'overview',
    },
  ]

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as Tabs)}
    >
      <Container size="md">
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
      </Container>

      <Container>
        <div className="mt-8 lg:mt-14">
          <Tabs.Content value="your-unpaid-fines">
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
                          {dayjs(fine.updatedAt).format('DD.MM.YYYY - HH:mm')}
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
            ) : null}
          </Tabs.Content>

          <Tabs.Content value="overview">
            <span>View not implemented 😭</span>
          </Tabs.Content>
        </div>
      </Container>
    </Tabs.Root>
  )
}
