import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { Container } from '@app/core/components/layout/Container'
import { OwnFines } from '@features/my-fines/components/OwnFines'

const MyFines: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <>
      {status === 'loading' ? (
        <Container>
          <span>Loading...</span>
        </Container>
      ) : session ? (
        <OwnFines />
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

export default MyFines
