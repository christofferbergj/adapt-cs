import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { Container } from '@components/layout/Container'
import { OwnFinesOverview } from '@components/pages/me/OwnFinesOverview'

const Me: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <>
      {status === 'loading' ? (
        <Container>
          <span>Loading...</span>
        </Container>
      ) : session ? (
        <OwnFinesOverview />
      ) : (
        <Container>
          <h2 className="border border-purple-9 px-6 py-3 inline font-semibold">
            You are not signed in.{' '}
            <span aria-label="emoji upside down face">🙃</span>
          </h2>
        </Container>
      )}
    </>
  )
}

export default Me
