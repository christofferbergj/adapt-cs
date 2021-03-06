import Image from 'next/image'
import clsx from 'clsx'
import { useState } from 'react'

const sizes = {
  sm: 'w-[30px] h-[30px] text-xs',
  md: 'w-[36px] h-[36px] text-xs',
  lg: 'w-[44px] h-[44px] text-xs',
}

const sizeNumber = {
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
        'relative overflow-hidden rounded-full leading-none',
        sizes[size],
        {
          'border border-purple-6 bg-purple-3': showInitials,
        }
      )}
    >
      {showInitials && (
        <span className="absolute inset-0 -mb-[2px] flex items-center justify-center overflow-hidden font-medium">
          {initials}
        </span>
      )}

      {imageUrl && !isError && (
        <Image
          width={sizeNumber[size]}
          height={sizeNumber[size]}
          src={imageUrl}
          alt="avatar"
          onLoadingComplete={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  )
}
