import { useSearchableUserList } from '@features/create-fine/hooks/useSearchableUserList'

import { Input } from '@components/elements/Input'

export const UsersList = () => {
  const { list, inputRef, inputValue, handleInputChange } = useSearchableUserList()

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
          {list.map((item) => (
            <div key={item.id} className="px-4 py-3 rounded bg-gray-3">
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
