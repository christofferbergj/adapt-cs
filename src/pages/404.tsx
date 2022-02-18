import Image from 'next/image'
import { NextPage } from 'next'

import steffen from '/public/steffen.png'

const NotFound: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image
        alt="steffen"
        src={steffen}
        placeholder="blur"
        width={300}
        height={300}
      />

      <h1 className="mt-10 -ml-4 border border-purple-9 bg-purple-3 px-8 py-3 text-2xl font-bold">
        No content here
      </h1>
    </div>
  )
}

export default NotFound
