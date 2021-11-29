import { Prisma } from '@prisma/client'
import { useState } from 'react'
import clsx from 'clsx'
import Router from 'next/router'
import type { NextPage, InferGetServerSidePropsType } from 'next'

import { prisma } from '@lib/prisma'
import type { FineType, User } from '.prisma/client'

import { Layout } from '@components/common/Layout'
import { Container } from '@components/layout/Container'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export const Create: NextPage<Props> = ({ fineTypes, users }) => {
  const [selectedUser, setSelectedUser] = useState<User['id'] | null>(null)
  const [selectedFineType, setSelectedFineType] = useState<
    FineType['id'] | null
  >(null)

  const canSubmit = selectedUser && selectedFineType

  console.log('fineTypes', fineTypes)
  console.log('users', users)

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
                    'p-6 text-white bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded outline-none shadow transition duration-100',
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
                  <h2>{user.name}</h2>
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

export const getServerSideProps = async () => {
  const fineTypes = await prisma.fineType.findMany()
  const users = await prisma.user.findMany()

  return {
    props: {
      fineTypes,
      users,
    },
  }
}

export default Create