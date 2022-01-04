export function getPaginationSkip({
  page,
  perPage,
}: {
  page: number
  perPage: number
}): { skip: number; take: number; nextSkip: number } {
  return {
    skip: page * perPage,
    take: perPage,
    nextSkip: (page + 1) * perPage,
  }
}

/** */
export function getPaginationMeta({
  count,
  page,
  perPage,
}: {
  count: number
  page: number
  perPage: number
}): {
  current: number
  hasMore: boolean
  pageTotal: number
} {
  const take = perPage
  const { skip } = getPaginationSkip({ page, perPage })

  const current = page === 0 ? 1 : skip
  const hasMore = skip + take < count
  const pageTotal = (page + 1) * take

  return {
    current,
    hasMore,
    pageTotal,
  }
}

export const pagination = {
  getSkipTake: getPaginationSkip,
  getMeta: getPaginationMeta,
}

// TODO: Make unit tests

// const page = 0
// const perPage = 10

// const defaultSkipTake = pagination.getSkipTake({ page, perPage }) // { skip: 0, take: 10, nextSkip: 10 }
// const nextSkipTake = pagination.getSkipTake({ page: page + 1, perPage }) // { skip: 10, take: 10, nextSkip: 20 }

// // const nextPage = skip === 0 ? page : skip + page

// console.log(defaultSkipTake)
// console.log(nextSkipTake)
