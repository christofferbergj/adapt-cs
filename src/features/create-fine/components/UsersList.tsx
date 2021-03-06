import clsx from 'clsx'

import type { User } from '@app/users'
import {
  setSelectedUser,
  useSelectedUser,
} from '@features/create-fine/createFineSlice'
import { useAppDispatch } from '@redux/hooks'
import { useSearchableUserList } from '@features/create-fine/hooks/useSearchableUserList'

import { Input } from '@app/core/components/elements/Input'
import { Avatar } from '@app/core/components/elements/Avatar'

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
          onChange={handleInputChange}
          placeholder="Search users"
          ref={inputRef}
          value={inputValue}
        />
      </Input.Wrapper>

      {list.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {list.map(({ id, name, avatar }) => (
            <button
              key={id}
              className={clsx(
                'flex min-h-[100px] flex-col items-center justify-center gap-3 rounded border p-5 font-semibold outline-none transition-colors lg:min-h-[140px]',
                {
                  'border-gray-7 hover:border-gray-8 hover:bg-gray-4 focus:bg-gray-4':
                    selectedUser !== id,
                  'border-purple-7 bg-purple-5 hover:border-purple-8 hover:bg-purple-6 focus:border-purple-8 focus:bg-purple-6':
                    selectedUser === id,
                }
              )}
              onClick={() => handleSelectUser(id)}
            >
              <Avatar name={name} imageUrl={avatar} />
              <span>{name}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
