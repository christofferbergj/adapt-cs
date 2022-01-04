/**
 *
 * @param page
 * @param take
 */
export function getPaginationSkip({
  page,
  take,
}: {
  page: number
  take: number
}): number {
  return page * take
}

/**
 * Get pagination metadata from a skip/take API query
 * Used to build ui pagination
 *
 * @param count - Length of the data to paginate
 * @param page - Current paginated page
 * @param take - Amount of items to take from
 * @param skip - Current skip
 */
export function getPaginationMeta({
  count,
  page,
  take,
  skip,
}: {
  count: number
  page: number
  take: number
  skip: number
}): {
  current: number
  hasMore: boolean
  pageTotal: number
} {
  const current = page === 0 ? 1 : page * take
  const hasMore = skip + take < count
  const pageTotal = (page + 1) * take

  return {
    current,
    hasMore,
    pageTotal,
  }
}

export const pagination = {
  getSkip: getPaginationSkip,
  getMeta: getPaginationMeta,
}
