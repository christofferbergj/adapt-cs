import { useEffect, useMemo } from 'react'

import type { User } from '@app/users'
import { useFuse } from '@app/core/hooks/useFuse'
import { useInput } from '@app/core/hooks/useInput'
import { useUsers } from '@features/create-fine/hooks/useUsers'

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
