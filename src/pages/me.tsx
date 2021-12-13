import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { Layout } from '@components/common/Layout'
import { OwnFinesOverview } from '@components/pages/me/OwnFinesOverview'
import { Container } from '@components/layout/Container'

const Me: NextPage = () => {
  const { data: session } = useSession()

  return (
    <Layout>
      <Layout.Space>
        {!session ? (
          <OwnFinesOverview />
        ) : (
          <Container>
            <h2 className="border border-purple-9 px-6 py-3 inline font-semibold">
              You are not signed in, idiot..{' '}
              <span aria-label="emoji upside down face">🙃</span>
            </h2>
          </Container>
        )}
      </Layout.Space>
    </Layout>
  )
}

export default Me
