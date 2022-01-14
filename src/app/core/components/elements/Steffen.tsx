import Image from 'next/image'
import { motion } from 'framer-motion'
import { useMedia } from 'react-use'

import steffen from '/public/steffen.png'

const MobileSteffen = () => {
  const isWide = useMedia('(min-width: 768px)')

  const generateY = (length = 5) =>
    Array.from({ length }, () => ['0%', '5%']).flat()

  return (
    <div className="top-[-70px] absolute z-0 right-0 pointer-events-none lg:hidden">
      <motion.div
        className="inline-flex"
        animate={{
          x: isWide ? -240 : -160,
          y: generateY(6),
        }}
        transition={{
          repeat: Infinity,
          duration: isWide ? 2 : 2,
          repeatType: 'mirror',
        }}
      >
        <Image
          alt="steffen"
          src={steffen}
          placeholder="blur"
          width={160}
          height={160}
        />
      </motion.div>
    </div>
  )
}
