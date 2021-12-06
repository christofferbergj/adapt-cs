import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'

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
      <div className="flex flex-col justify-between mx-auto px-5 max-w-screen-lg">
        <div className="min-h-[84px] flex items-center justify-between py-4 md:py-6">
          <Link href="/">
            <a className="text-xl font-bold">Adapt CS</a>
          </Link>

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
            <button onClick={() => signIn('google')}>Sign in</button>
          ) : null}
        </div>

        <div className="flex -mb-px">
          {links.map(({ href, title }, i) => (
            <Link href={href} key={i}>
              <a
                className={clsx(
                  'font-sm py-4 px-3 whitespace-nowrap leading-none border-b border-transparent',
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
      </div>
    </header>
  )
}
