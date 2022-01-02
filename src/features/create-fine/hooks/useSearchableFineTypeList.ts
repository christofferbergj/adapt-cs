import { useEffect, useMemo } from 'react'

import type { FineType } from '@app/fine-types'
import { useFineTypes } from '@features/create-fine/hooks/useFineTypes'
import { useFuse } from '@app/core/hooks/useFuse'
import { useInput } from '@app/core/hooks/useInput'

/**
 * Searchable fine types list
 *
 * Get a list of fine types and feed it into Fuse.js fuzzy search,
 * and return a list of fine types based on search results or the
 * default list
 *
 * @link https://fusejs.io/
 *
 * @returns - A list of fine types, and a search function
 */
export function useSearchableFineTypeList() {
  const { fineTypes } = useFineTypes()
  const { inputRef, inputValue, handleInputChange, resetInput } = useInput()

  const { results, onSearch } = useFuse<FineType>({
    list: fineTypes,
    options: { keys: ['title'], threshold: 0.3 },
  })

  const list = useMemo(
    () => (results.length > 0 ? results : fineTypes),
    [fineTypes, results]
  )

  /**
   * Sync input value with searching the fine types list
   */
  useEffect(() => onSearch(inputValue), [inputValue, onSearch])

  return {
    handleInputChange,
    list,
    inputRef,
    resetInput,
    inputValue,
  }
}
