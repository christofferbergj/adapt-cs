import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
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
]

export const Menu = () => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(!open)}>
      <button onClick={() => setOpen(true)}>
        <HamburgerMenuIcon />
      </button>

      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-40 bg-purple-3">
          <button
            className="absolute top-[2.20rem] right-0 mr-5 md:mr-10 xl:mr-5"
            onClick={() => setOpen(false)}
          >
            <Cross2Icon />
          </button>

          <ul className="flex flex-col gap-6 justify-center items-center h-full">
            {links.map(({ href, title, isDisabled }, i) => (
              <Link href={href} key={i}>
                <a
                  className={clsx(
                    'font-semibold whitespace-nowrap leading-none transition-colors py-1 text-2xl',
                    {
                      'opacity-40 pointer-events-none': isDisabled,
                      'text-gray-11 hover:text-black': router.pathname !== href,
                      'text-white': router.pathname === href,
                    }
                  )}
                >
                  {title}
                </a>
              </Link>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
