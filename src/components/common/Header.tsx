import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'

import logo from '/public/logo.png'
import { Container } from '@components/layout/Container'

type Link = {
  href: string
  title: string
  isActive?: boolean
  isAuth?: boolean
}

const links: Link[] = [
  {
    href: '/',
    title: 'Overview',
  },
  {
    href: '/statistics',
    title: 'Statistics',
  },
  {
    href: '/create',
    title: 'Create fine',
    isAuth: true,
  },
]

export const Header = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <header className="border-gray-6 border-b">
      <Container>
        <div className="flex items-center justify-center py-6 md:py-10">
          <Link href="/">
            <a>
              <Image
                alt="logo"
                src={logo}
                placeholder="blur"
                width={400}
                height={400}
              />
            </a>
          </Link>
        </div>

        <div className="flex justify-between -mb-px text-sm">
          <div className="flex">
            {links.map(({ href, title }, i) => (
              <Link href={href} key={i}>
                <a
                  className={clsx(
                    'font-sm pb-4 px-3 py-3 whitespace-nowrap leading-none border-b border-transparent',
                    {
                      'hover:border-gray-8': router.pathname !== href,
                      'border-purple-9 font-semibold': router.pathname === href,
                    }
                  )}
                >
                  {title}
                </a>
              </Link>
            ))}
          </div>

          {status === 'authenticated' ? (
            session?.user?.image ? (
              <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
                <Image
                  width={36}
                  height={36}
                  src={session?.user?.image}
                  alt="avatar"
                />
              </div>
            ) : null
          ) : status === 'unauthenticated' ? (
            <button
              className="font-sm hover:border-gray-8 pb-4 px-3 py-3 whitespace-nowrap leading-none border-b border-transparent hover:cursor-pointer"
              onClick={() => signIn('google')}
            >
              Sign in
            </button>
          ) : null}
        </div>
      </Container>
    </header>
  )
}
