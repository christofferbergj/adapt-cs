import type { User } from '@domain/user'
import { setSelectedUser } from '@features/create-fine/createFineSlice'
import { useAppDispatch } from '@redux/hooks'
import { useSearchableUserList } from '@features/create-fine/hooks/useSearchableUserList'

import { Input } from '@components/elements/Input'

export const UsersList = () => {
  const dispatch = useAppDispatch()
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
        <div className="grid grid-cols-4 gap-4">
          {list.map(({ id, name }) => (
            <button
              key={id}
              className="px-4 py-3 rounded bg-gray-3"
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
