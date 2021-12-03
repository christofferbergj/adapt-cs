import { useFineService } from '@services/fine'

export function useGetFines() {
  const fineService = useFineService()

  return async () => await fineService.getFines()
}
