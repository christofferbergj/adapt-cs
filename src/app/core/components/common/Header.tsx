import ContentLoader from 'react-content-loader'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'

import { Avatar } from '@app/core/components/elements/Avatar'
import { Container } from '@app/core/components/layout/Container'
import { Menu } from '@app/core/components/common/Menu'

export const Header = () => {
  const { data: session, status } = useSession()

  const user = session?.user

  return (
    <header>
      <Container>
        <div className="flex justify-between items-center py-6">
          {status === 'loading' ? (
            <ContentLoader
              id="avatar-loader"
              speed={1}
              width={36}
              height={36}
              viewBox="0 0 36 36"
              backgroundColor="hsl(244, 4.9%, 21.5%)"
              foregroundColor="hsl(245, 4.9%, 25.4%)"
            >
              <circle cx="50%" cy="50%" r="18" />
            </ContentLoader>
          ) : status === 'unauthenticated' ? (
            <button
              className="px-3 py-1 text-sm font-semibold rounded border transition-colors hover:bg-gray-4 border-gray-7 hover:border-gray-8"
              onClick={() => signIn('google')}
            >
              Sign in
            </button>
          ) : user ? (
            <Link href="/" passHref>
              <div className="flex gap-3 items-center">
                <Avatar name={user.name} imageUrl={user.avatar} />
                <span className="text-sm font-semibold mt-1">{user.name}</span>
              </div>
            </Link>
          ) : null}

          <Menu />
        </div>
      </Container>
    </header>
  )
}
