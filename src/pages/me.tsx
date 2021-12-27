import { useSession } from 'next-auth/react'

import type { ExtendedNextPage } from '@pages/_app'

import { Container } from '@components/layout/Container'
import { OwnFinesOverview } from '@components/pages/me/OwnFinesOverview'

const Me: ExtendedNextPage = () => {
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
          <h2 className="inline px-6 py-3 font-semibold border border-purple-9">
            You are not signed in.{' '}
            <span aria-label="emoji upside down face">🙃</span>
          </h2>
        </Container>
      )}
    </>
  )
}

Me.requireAuth = true

export default Me
