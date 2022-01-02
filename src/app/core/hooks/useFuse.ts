import Fuse from 'fuse.js'
import lodashDebounce from 'lodash/debounce'
import { useMemo, useState } from 'react'

type Params<T> = {
  /**
   * List of data to Fuse
   */
  list: T[]

  /**
   * Fuse options
   */
  options: Fuse.IFuseOptions<T>

  /**
   * Time in milliseconds
   */
  debounce?: number
}

/**
 * Small hook wrapper around Fuse.js
 *
 * @param list - The list to feed into Fuse
 * @param options - Fuse options
 * @param debounce - Optional debounce time in milliseconds
 *
 * @link https://fusejs.io/
 * @link https://lodash.com/docs/4.17.15#debounce
 */
export function useFuse<T>({ list, options, debounce }: Params<T>) {
  const [query, setQuery] = useState<string>('')

  /**
   * Setup Fuse instance
   *
   * @link https://fusejs.io/examples.html#search-object-array
   */
  const fuse = useMemo(() => new Fuse<T>(list, options), [list, options])

  /**
   * Search Fuse index, and memoize result
   */
  const results = useMemo(
    () => fuse.search(query).map(({ item }) => item),
    [fuse, query]
  )

  /**
   * Set up a search function with optional debounce
   *
   * @link https://lodash.com/docs/4.17.15#debounce
   */
  const onSearch = useMemo(
    () => lodashDebounce((query: string) => setQuery(query.trim()), debounce),
    [debounce]
  )

  return {
    fuse,
    onSearch,
    query,
    results,
    setQuery,
  }
}
