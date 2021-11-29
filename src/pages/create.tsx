import { Prisma } from '@prisma/client'
import { useState } from 'react'
import clsx from 'clsx'
import Router from 'next/router'
import type { NextPage, InferGetStaticPropsType } from 'next'

import { prisma } from '@lib/prisma'
import type { FineType, User } from '.prisma/client'

import { Layout } from '@components/common/Layout'
import { Container } from '@components/layout/Container'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Create: NextPage<Props> = ({ fineTypes, users }) => {
  const [selectedUser, setSelectedUser] = useState<User['id'] | null>(null)
  const [selectedFineType, setSelectedFineType] = useState<
    FineType['id'] | null
  >(null)

  const canSubmit = selectedUser && selectedFineType

  const handleSubmitData = async () => {
    if (!canSubmit) return

    const payload: Prisma.FineCreateInput = {
      owner: {
        connect: {
          id: selectedUser,
        },
      },
      fineType: {
        connect: {
          id: selectedFineType,
        },
      },
    }

    try {
      await fetch('/api/fine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      setSelectedFineType(null)
      setSelectedUser(null)

      Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <Container>
        <div className="py-20">
          {fineTypes.length > 0 && (
            <div className="grid gap-6 mb-20 sm:grid-cols-2 md:grid-cols-3">
              {fineTypes.map((fineType) => (
                <button
                  key={fineType.id}
                  onClick={() => setSelectedFineType(fineType.id)}
                  className={clsx(
                    'p-6 text-white bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded outline-none shadow transition duration-100 text-lg',
                    {
                      'bg-green-800 ring-4 ring-green-500':
                        selectedFineType === fineType.id,
                    }
                  )}
                >
                  <h2>{fineType.title}</h2>
                </button>
              ))}
            </div>
          )}

          {users.length > 0 && (
            <div className="grid gap-6 mb-20 sm:grid-cols-2 md:grid-cols-3">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={clsx(
                    'p-6 text-white bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 rounded outline-none shadow transition-all duration-100',
                    {
                      'bg-indigo-800 ring-4 ring-indigo-500':
                        selectedUser === user.id,
                    }
                  )}
                >
                  <div className="flex items-center space-x-5">
                    <img
                      className="ring-[3px] w-14 rounded-full ring-indigo-300"
                      src={user.image}
                    />
                    <h2 className="text-lg">{user.name}</h2>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Container>

      <button
        disabled={!canSubmit}
        onClick={handleSubmitData}
        className={clsx(
          'fixed bottom-0 left-1/2 px-8 py-3 text-white text-lg bg-red-600 hover:bg-red-700 rounded transform -translate-x-1/2 transition-all',
          {
            'translate-y-full': !canSubmit,
            '-translate-y-10': canSubmit,
          }
        )}
      >
        Tilføj bøde
      </button>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const getFineTypes = prisma.fineType.findMany()
  const getUsers = prisma.user.findMany()

  const [fineTypes, users] = await Promise.all([getFineTypes, getUsers])

  return {
    props: {
      fineTypes,
      users,
    },
    revalidate: 10,
  }
}

export default Create
