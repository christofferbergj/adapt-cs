import clsx from 'clsx'
import dayjs from 'dayjs'
import type { InferGetStaticPropsType, NextPage } from 'next'

import { getFines } from '@services/fines/getFines'

import { Container } from '@components/layout/Container'
import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ fines }) => {
  return (
    <Layout>
      <Container>
        {fines.length > 0 && (
          <div className="flex flex-col mx-auto my-14 max-w-screen-lg text-sm border rounded-lg">
            {fines.map((fine) => (
              <div
                key={fine.id}
                className="grid gap-4 grid-cols-5 items-center p-4 border-b"
              >
                <div className="flex flex-col">
                  <span className="font-bold">Betaler</span>
                  <span className="text-gray-500">{fine.owner.name}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">Bøde</span>
                  <span className="text-gray-500">{fine.fineType.title}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">Dato</span>
                  <span className="text-gray-500">
                    {dayjs(fine.createdAt).format('DD/MM/YYYY HH:mm')}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">Status</span>
                  <span className="text-gray-500">
                    {fine.isPaid ? 'Betalt' : 'Ikke betalt'}
                  </span>
                </div>

                <span
                  className={clsx(
                    'ml-auto px-4 py-2 text-white font-bold bg-gray-400 rounded'
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

export const getStaticProps = async () => {
  const fines = await getFines()

  return {
    props: {
      fines,
    },
  }
}

export default Home
