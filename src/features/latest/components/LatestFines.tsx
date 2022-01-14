import * as Tabs from '@radix-ui/react-tabs'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { useOwnFines } from '@features/my-fines/hooks/useOwnFines'
import { useUser } from '@hooks/useUser'

import { Container } from '@app/core/components/layout/Container'

type Tabs = 'my-fines' | 'overview'

type Trigger = {
  title: string
  type: Tabs
}

export const LatestFines = () => {
  const [activeTab, setActiveTab] = useState<Tabs>('my-fines')
  const [page, setPage] = useState(0)
  const { user } = useUser()

  const {
    fines,
    isFetching,
    isLoading,
    isPreviousData,
    meta: { hasMore, current, pageTotal, count },
    prefetchNextPage,
  } = useOwnFines({ userId: user?.id, page })

  useEffect(() => {
    if (!isFetching && hasMore) prefetchNextPage()
  }, [hasMore, isFetching, prefetchNextPage])

  const triggers: Trigger[] = [
    {
      title: 'Mine bøder',
      type: 'my-fines',
    },
    {
      title: 'Oversigt',
      type: 'overview',
    },
  ]

  return (
    <Container>
      <Tabs.Root
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as Tabs)}
      >
        <div className="flex flex-col items-center px-4 mt-6">
          <Tabs.List className="flex p-[6px] w-full rounded-full bg-gray-4">
            <AnimateSharedLayout>
              {triggers.map(({ title, type }, i) => (
                <Tabs.Trigger
                  key={i}
                  value={type}
                  className="relative flex-1 px-4 py-2 text-sm font-semibold text-center rounded-full"
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
          <Tabs.Content value="my-fines">
            {fines.map((fine) => (
              <div key={fine.id}>{fine.title}</div>
            ))}
          </Tabs.Content>

          <Tabs.Content value="overview">
            <span>Overview</span>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </Container>
  )
}
