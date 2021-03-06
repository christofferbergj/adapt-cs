import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import type { FineType } from '@app/fine-types'
import { formatCurrency } from '@utils/formatCurrency'
import { scrollToWithOffset } from '@utils/scrollToWithOffset'
import {
  setSelectedFineType,
  useSelectedFineType,
  useSelectedUser,
} from '@features/create-fine/createFineSlice'
import { useAppDispatch } from '@redux/hooks'
import { useSearchableFineTypeList } from '@features/create-fine/hooks/useSearchableFineTypeList'

import { Input } from '@app/core/components/elements/Input'

export const FineTypesList = () => {
  const dispatch = useAppDispatch()
  const selectedFineType = useSelectedFineType()
  const selectedUser = useSelectedUser()
  const listRef = useRef<HTMLDivElement>(null)
  const { list, inputRef, inputValue, handleInputChange, resetInput } =
    useSearchableFineTypeList()

  /**
   * Handle selecting a fine type
   * and de-select if the same fine type is selected.
   *
   * @param id - The id of the fine type
   */
  const handleSelectFineType = (id: FineType['id']) => {
    resetInput()
    dispatch(setSelectedFineType(id))
  }

  // Focus the fine types input when a user has been selected
  useEffect(() => {
    const element = listRef.current

    if (!selectedFineType && selectedUser && element) {
      scrollToWithOffset(element, 30)
    }
  }, [inputRef, selectedFineType, selectedUser])

  return (
    <div ref={listRef} className="flex flex-col gap-4">
      <Input.Wrapper>
        <Input.Label htmlFor="fine-type">Fine types</Input.Label>

        <Input.Element
          ref={inputRef}
          id="fine-type"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search fine types"
        />
      </Input.Wrapper>

      {list.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {list.map(({ id, title, price }) => (
            <button
              key={id}
              className={clsx(
                'flex min-h-[100px] flex-col items-center justify-center gap-3 rounded border p-5 font-semibold outline-none transition-colors lg:min-h-[140px]',
                {
                  'border-gray-7 hover:border-gray-8 hover:bg-gray-4 focus:bg-gray-4':
                    selectedFineType !== id,
                  'border-purple-7 bg-purple-5 hover:border-purple-8 hover:bg-purple-6 focus:border-purple-8 focus:bg-purple-6':
                    selectedFineType === id,
                }
              )}
              onClick={() => handleSelectFineType(id)}
            >
              <span>{title}</span>
              <span className="text-sm">{formatCurrency(price)}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
