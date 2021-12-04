import { useFineService } from '@services/fines'

export function useGetFines() {
  const fineService = useFineService()

  return async () => await fineService.getFines()
}
