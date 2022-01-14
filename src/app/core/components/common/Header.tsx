import ContentLoader from 'react-content-loader'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'

import { Avatar } from '@app/core/components/elements/Avatar'
import { Container } from '@app/core/components/layout/Container'

type Link = {
  href: string
  title: string
  isActive?: boolean
  isDisabled?: boolean
}

const links: Link[] = [
  {
    href: '/',
    title: 'Latest',
  },
  {
    href: '/statistics',
    title: 'Stats',
  },
  {
    href: '/me',
    title: 'My fines',
  },
  {
    href: '/create',
    title: 'Create fine',
  },
]

export const Header = () => {
  const { data: session, status } = useSession()

  return (
    <header className="mb-14">
      <Container>
        <div className="flex items-center justify-between py-6">
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
              className="px-3 py-1 text-sm font-semibold hover:bg-gray-4 border border-gray-7 hover:border-gray-8 rounded transition-colors"
              onClick={() => signIn('google')}
            >
              Sign in
            </button>
          ) : session?.user ? (
            <Avatar name={session.user.name} imageUrl={session.user.avatar} />
          ) : null}
        </div>
      </Container>
    </header>
  )
}
