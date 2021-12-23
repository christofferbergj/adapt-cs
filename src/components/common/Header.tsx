import ContentLoader from 'react-content-loader'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'

import { Container } from '@components/layout/Container'

type Link = {
  href: string
  title: string
  isActive?: boolean
  isAdmin?: boolean
  isDisabled?: boolean
}

const links: Link[] = [
  {
    href: '/',
    title: 'Overview',
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
    isAdmin: true,
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
          ) : session?.user?.image ? (
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
              <Image
                width={36}
                height={36}
                src={session?.user?.image}
                alt="avatar"
              />
            </div>
          ) : status === 'unauthenticated' ? (
            <button
              className="px-3 py-1 text-sm font-semibold hover:bg-gray-4 border border-gray-7 hover:border-gray-8 rounded transition-colors"
              onClick={() => signIn('google')}
            >
              Sign in
            </button>
          ) : null}
        </div>

        <div className="flex items-center justify-between -mb-px text-sm">
          <div className="flex">
            {links.map(({ href, title, isAdmin, isDisabled }, i) => {
              if (isAdmin && session?.user.role !== 'ADMIN') return null

              return (
                <Link href={href} key={i}>
                  <a
                    className={clsx(
                      'font-sm px-3 py-5 whitespace-nowrap leading-none border-b transition-colors',
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
