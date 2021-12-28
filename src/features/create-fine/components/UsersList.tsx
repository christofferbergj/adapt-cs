import clsx from 'clsx'

import type { User } from '@domain/user'
import {
  setSelectedUser,
  useSelectedUser,
} from '@features/create-fine/createFineSlice'
import { useAppDispatch } from '@redux/hooks'
import { useSearchableUserList } from '@features/create-fine/hooks/useSearchableUserList'

import { Input } from '@components/elements/Input'

export const UsersList = () => {
  const dispatch = useAppDispatch()
  const selectedUser = useSelectedUser()
  const { list, inputRef, inputValue, handleInputChange, resetInput } =
    useSearchableUserList()

  const handleSelectUser = (id: User['id']) => {
    resetInput()
    dispatch(setSelectedUser(id))
  }

  return (
    <div className="flex flex-col gap-4">
      <Input.Wrapper>
        <Input.Label htmlFor="users">Users</Input.Label>

        <Input.Element
          id="users"
          autoComplete="off"
          autoFocus
          onChange={handleInputChange}
          placeholder="E.g. 'Kim Nyhuus'"
          ref={inputRef}
          value={inputValue}
        />
      </Input.Wrapper>

      {list.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {list.map(({ id, name }) => (
            <button
              key={id}
              className={clsx(
                'p-5 rounded border transition-colors outline-none font-semibold text-sm',
                {
                  'border-gray-7 hover:border-gray-8 hover:bg-gray-4 focus:bg-gray-4':
                    selectedUser !== id,
                  'border-purple-7 hover:border-purple-8 focus:border-purple-8 bg-purple-5 hover:bg-purple-6 focus:bg-purple-6':
                    selectedUser === id,
                }
              )}
              onClick={() => handleSelectUser(id)}
            >
              <span>{name}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
