import clsx from 'clsx'
import dayjs from 'dayjs'
import type { InferGetServerSidePropsType, NextPage } from 'next'

import { getFines } from '@services/fines/getFines'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Overview: NextPage<Props> = ({ fines }) => {
  console.log('fines', fines)

  return (
    <Layout>
      <Container>
        {fines.length > 0 && (
          <div className="border-gray-6 flex flex-col mx-auto my-14 max-w-screen-lg text-sm border rounded-lg">
            {fines.map((fine) => (
              <div
                key={fine.id}
                className="border-gray-6 grid gap-4 grid-cols-5 items-center p-5 border-b"
              >
                <div className="flex flex-col">
                  <span className="font-bold">Betaler</span>
                  <span className="text-gray-11">{fine.owner.name}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">Bøde</span>
                  <span className="text-gray-11">{fine.fineType.title}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">Dato</span>
                  <span className="text-gray-11">
                    {dayjs(fine.createdAt).format('DD/MM/YYYY HH:mm')}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">Status</span>
                  <span className="text-gray-11">
                    {fine.isPaid ? 'Betalt' : 'Ikke betalt'}
                  </span>
                </div>

                <span
                  className={clsx(
                    'bg-red-9 ml-auto px-4 py-2 text-white font-bold rounded'
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

export const getServerSideProps = async () => {
  const fines = await getFines()

  return {
    props: {
      fines,
    },
  }
}

export default Overview
