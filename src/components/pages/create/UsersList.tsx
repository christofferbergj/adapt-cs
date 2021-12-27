import type { User } from '@features/user/entities'
import { useFuse } from '@hooks/useFuse'
import { useUsers } from '@features/user/hooks/useUsers'

import { Input } from '@components/elements/Input'

export const UsersList = () => {
  const { users } = useUsers()
  const { results, onSearch } = useFuse<User>({
    list: users,
    options: { keys: ['name'], threshold: 0.3 },
  })

  const list = results.length > 0 ? results : users

  return (
    <div className="flex flex-col gap-4">
      <Input.Wrapper>
        <Input.Label htmlFor="users">Users</Input.Label>

        <Input.Element
          id="users"
          autoComplete="off"
          autoFocus
          onChange={({ target: { value } }) => onSearch(value)}
          placeholder="E.g. 'Kim Nyhuus'"
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
