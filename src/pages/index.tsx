import type { InferGetStaticPropsType, NextPage } from 'next'

import { prisma } from '@lib/prisma'

import { Layout } from '@components/common/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ users, fines, fineTypes }) => {
  console.log('fines', fines)
  console.log('users', users)

  const hasUsers = users.length > 0

  return (
    <Layout>
      <div className="mx-auto px-5 max-w-screen-lg space-y-20">
        {hasUsers && (
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold">Spilleroversigt</h2>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col items-start p-4 bg-white border border-gray-200 rounded shadow-sm"
                >
                  <h4 className="mb-4 font-bold">{user.name}</h4>

                  <span className="text-sm">
                    Antal bøder: {user.fines.length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const users = await prisma.user.findMany({
    include: {
      fines: {
        include: {
          fineType: true,
        },
      },
    },
  })

  const fines = await prisma.fine.findMany({ include: { fineType: true } })
  const fineTypes = await prisma.fineType.findMany()

  return {
    props: {
      users,
      fines,
      fineTypes,
    },
  }
}

export default Home
