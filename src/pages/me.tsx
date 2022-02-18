import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { Container } from '@app/core/components/layout/Container'
import { Layout } from '@app/core/components/common/Layout'
import { OwnFines } from '@features/my-fines/components/OwnFines'

const MyFines: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <Layout>
      <Layout.Space>
        {status === 'loading' ? (
          <Container>
            <span>Loading...</span>
          </Container>
        ) : session ? (
          <OwnFines />
        ) : (
          <Container>
            <h2 className="inline border border-purple-9 px-6 py-3 font-semibold">
              You are not signed in.{' '}
              <span aria-label="emoji upside down face">🙃</span>
            </h2>
          </Container>
        )}
      </Layout.Space>
    </Layout>
  )
}

export default MyFines
