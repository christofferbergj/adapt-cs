import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { hasAdminRole } from '@app/users/helpers/hasAdminRole'

type Link = {
  href: string
  title: string
  isActive?: boolean
  isDisabled?: boolean
  isAdmin?: boolean
}

const links: Link[] = [
  {
    href: '/',
    title: 'Home',
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
  {
    href: '/admin/fines',
    title: 'Admin fines',
    isAdmin: true,
  },
]

export const Menu = () => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const { data: session } = useSession()

  /**
   * Check if the user is admin
   */
  const userIsAdmin = !!session?.user && hasAdminRole(session.user)

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(!open)} modal={false}>
      <Dialog.Trigger>
        <button className="relative z-30">
          {open ? <Cross2Icon /> : <HamburgerMenuIcon />}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-20 bg-purple-3">
          <ul className="flex h-full flex-col items-center justify-center gap-6">
            {links.map(({ href, title, isDisabled, isAdmin }, i) => {
              if (isAdmin && !userIsAdmin) return null

              return (
                <Link href={href} key={i}>
                  <a
                    className={clsx(
                      'whitespace-nowrap py-1 text-2xl font-semibold leading-none transition-colors',
                      {
                        'pointer-events-none opacity-40': isDisabled,
                        'text-purple-11 hover:text-black':
                          router.pathname !== href,
                        'text-purple-12': router.pathname === href,
                      }
                    )}
                  >
                    {title}
                  </a>
                </Link>
              )
            })}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
