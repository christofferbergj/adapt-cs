import { useEffect, useMemo } from 'react'

import type { User } from '@domain/user'
import { useFuse } from '@hooks/useFuse'
import { useInput } from '@hooks/useInput'
import { useUsers } from '@adapters/user/hooks/useUsers'

/**
 * Searchable users list
 *
 * Get a list of users and feed it into Fuse.js fuzzy search,
 * and return a list of users based on search results or the
 * default list
 *
 * @link https://fusejs.io/
 *
 * @returns - A list of users, and a search function
 */
export function useSearchableUserList() {
  const { users } = useUsers()
  const { inputRef, inputValue, handleInputChange, resetInput } = useInput()

  const { results, onSearch } = useFuse<User>({
    list: users,
    options: { keys: ['name'], threshold: 0.4 },
  })

  const list = useMemo(
    () => (results.length > 0 ? results : users),
    [users, results]
  )

  /**
   * Sync input value with searching the users list
   */
  useEffect(() => onSearch(inputValue), [inputValue, onSearch])

  return {
    handleInputChange,
    list,
    onSearch,
    inputRef,
    resetInput,
    inputValue,
  }
}
