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
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <header className="border-b border-gray-6">
      <Container>
        <div className="flex items-center justify-between py-6">
          <Link href="/">
            <a className="px-3 py-2 text-sm font-bold border border-purple-6 hover:border-purple-7 rounded transition-colors hover:cursor-default">
              Adapt CS{' '}
              <span className="ml-2" aria-label="gun emoji">
                🔫
              </span>
            </a>
          </Link>

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

        <div className="flex items-center justify-between -mb-px text-sm">
          <div className="flex">
            {links.map(({ href, title, isDisabled }, i) => {
              return (
                <Link href={href} key={i}>
                  <a
                    className={clsx(
                      'font-medium px-3 py-5 whitespace-nowrap leading-none border-b transition-colors',
                      {
                        'opacity-40 pointer-events-none': isDisabled,
                        'hover:border-gray-8 border-transparent':
                          router.pathname !== href,
                        'border-purple-9 font-semibold':
                          router.pathname === href,
                      }
                    )}
                  >
                    {title}
                  </a>
                </Link>
              )
            })}
          </div>
        </div>
      </Container>
    </header>
  )
}