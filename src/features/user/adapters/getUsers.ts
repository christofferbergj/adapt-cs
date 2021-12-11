import api from '@application/api'
import type { GetResponseData } from '@api/users'
import type { User } from '@features/user/entities/types'
import type { UserAdapter } from '@application/ports'
import { getErrorMessage } from '@utils/getErrorMessage'

type GetUsers = UserAdapter['getUsers']

export const getUsers: GetUsers = async () => {
  try {
    const { data } = await api.get<GetResponseData['users']>('/users')

    const transformer = (user: typeof data[number]): User => {
      const { id, name, email, image } = user

      return {
        id,
        name: name ?? 'No name',
        email: email ?? 'No email',
        avatar: image,
      }
    }

    return data.map(transformer)
  } catch (error) {
    const message = getErrorMessage(error)
    console.warn(message)

    return []
  }
}
