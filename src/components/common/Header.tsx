import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

type Link = {
  href: string
  title: string
  isActive?: boolean
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
  },
]

export const Header = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <header className="border-gray-6 border-b">
      <div className="flex flex-col justify-between mx-auto px-5 max-w-screen-lg">
        <div className="flex items-center justify-between py-4 min-h-[68px]">
          <Link href="/">
            <a>Adapt CS</a>
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
          ) : (
            <button onClick={() => signIn('google')}>Sign in</button>
          )}
        </div>

        <div className="flex -mb-px overflow-x-auto space-x-4 md:space-x-6">
          {links.map(({ href, title }, i) => (
            <Link href={href} key={i}>
              <a
                className={clsx(
                  'pb-4 pt-2 whitespace-nowrap leading-none border-b border-transparent transition',
                  {
                    'dark:hover:border-gray-7 hover:border-gray-8':
                      router.pathname !== href,
                    'border-purple-9': router.pathname === href,
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
