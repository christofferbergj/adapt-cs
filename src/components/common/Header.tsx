import { signOut, useSession, signIn } from 'next-auth/react'

export const Header = () => {
  const { data: session, status } = useSession()

  console.log('session', session)

  return (
    <header className="bg-gray-100">
      <div className="mx-auto px-5 py-4 max-w-screen-lg">
        <nav className="flex items-center">
          <h2>Adapt CS</h2>

          <div className="flex items-center ml-auto text-sm">
            {status === 'authenticated' && (
              <div className="mr-6">
                <span>{session?.user?.name} </span>
              </div>
            )}

            {session ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <button onClick={() => signIn('google')}>Sign in</button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
