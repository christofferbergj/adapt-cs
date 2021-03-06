import { z } from 'zod'

export const SkipTakeInput = z.object({
  take: z.number().min(1).optional(),
  skip: z.number().min(0).optional(),
})

export const PaginationInput = z.object({
  page: z.number().min(0).optional(),
  perPage: z.number().min(1).optional(),
})

export const GetOwnInput = z
  .object({
    userId: z.string().optional(),
  })
  .merge(SkipTakeInput)
