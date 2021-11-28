import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from '@lib/prisma'

import { Layout } from '@components/common/Layout'
import { Container } from '@components/layout/Container'
import clsx from 'clsx'
import dayjs from 'dayjs'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Me: NextPage<Props> = ({ fines }) => {
  return (
    <Layout>
      <Container>
        {fines.length > 0 && (
          <div className="flex flex-col mx-auto my-14 max-w-prose text-sm border rounded-lg">
            {fines.map((fine) => (
              <div
                key={fine.id}
                className="flex gap-4 items-center justify-between p-4 border-b"
              >
                <div className="flex flex-col">
                  <span className="font-bold">{fine.fineType.title}</span>

                  <span className="text-gray-500">
                    {dayjs(fine.createdAt).format('DD/MM/YYYY HH:MM')}
                  </span>
                </div>

                <span
                  className={clsx(
                    'ml-auto px-3 py-1 text-white font-bold rounded',
                    {
                      'bg-red-600': !fine.paid,
                      'bg-green-600': fine.paid,
                    }
                  )}
                >
                  {fine.fineType.price} kr.
                </span>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const session = await getSession({ req })

  const fines = await prisma.fine.findMany({
    where: {
      owner: {
        email: session?.user?.email,
      },
    },
    include: {
      fineType: true,
    },
  })

  return {
    props: {
      fines,
    },
  }
}

export default Me
