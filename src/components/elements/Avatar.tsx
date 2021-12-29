import Image from 'next/image'
import clsx from 'clsx'
import { useState } from 'react'

const sizes = {
  sm: 30,
  md: 36,
  lg: 44,
}

type Props = {
  imageUrl?: string | null
  name: string
  size?: keyof typeof sizes
}

export const Avatar = ({ imageUrl, name, size = 'md' }: Props) => {
  const [isError, setIsError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const sizeNumber = sizes[size]
  const sizeClass = clsx([`w-[${sizeNumber}px] h-[${sizeNumber}px]`], {
    'text-xs': size === 'sm',
    'text-sm': size === 'md',
    'text-base': size === 'lg',
  })

  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(' ')

    const initials =
      firstName && lastName
        ? `${firstName.charAt(0)}${lastName.charAt(0)}`
        : firstName.charAt(0)

    return initials.toUpperCase()
  }

  const initials = getInitials(name)
  const showInitials = !isLoaded || isError

  return (
    <div
      className={clsx(
        'rounded-full overflow-hidden relative leading-none',
        sizeClass,
        {
          'border bg-purple-3 border-purple-6': showInitials,
        }
      )}
    >
      {showInitials && (
        <span className="flex overflow-hidden absolute inset-0 justify-center items-center font-medium -mb-[2px]">
          {initials}
        </span>
      )}

      {imageUrl && !isError && (
        <Image
          width={sizeNumber}
          height={sizeNumber}
          src={imageUrl}
          alt="avatar"
          onLoadingComplete={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  )
}
