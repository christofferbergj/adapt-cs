import api from '@application/api'
import type { FineType } from '@features/fine-types'
import type { FineTypeAdapter } from '@application/ports'
import type { GetResponseData } from '@api/fine-types'
import { getErrorMessage } from '@utils/getErrorMessage'

type GetFineTypes = FineTypeAdapter['getFineTypes']

export const getFineTypes: GetFineTypes = async () => {
  try {
    const { data } = await api.get<GetResponseData['fineTypes']>('/fine-types')

    const transformer = (fineType: typeof data[number]): FineType => {
      const { id, title, price } = fineType

      return {
        id,
        title,
        price,
      }
    }

    return data.map(transformer)
  } catch (error) {
    const message = getErrorMessage(error)
    console.error(message)

    return []
  }
}
