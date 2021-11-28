import { signOut, useSession, signIn } from 'next-auth/react'
import Link from 'next/link'

export const Header = () => {
  const { data: session, status } = useSession()

  console.log('session', session)

  return (
    <header className="bg-gray-100">
      <div className="mx-auto px-5 py-4 max-w-screen-lg">
        <nav className="flex items-center">
          <Link href="/">
            <a>Adapt CS</a>
          </Link>

          <div className="flex items-center ml-auto text-sm">
            <div className="flex items-center mr-10 space-x-3">
              <Link href="/create">
                <a>/create</a>
              </Link>

              <Link href="/me">
                <a>/me</a>
              </Link>
            </div>

            {status === 'authenticated' ? (
              <div className="flex items-center space-x-4">
                <span>{session?.user?.name}</span>

                <button
                  className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button onClick={() => signIn('google')}>Sign in</button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
