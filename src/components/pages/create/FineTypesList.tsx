import type { FineType } from '@features/fine-types/entities'
import { useFineTypes } from '@features/fine-types/hooks/useFineTypes'
import { useFuse } from '@hooks/useFuse'

export const FineTypesList = () => {
  const { fineTypes } = useFineTypes()
  const { results, onSearch } = useFuse<FineType>({
    list: fineTypes,
    options: { keys: ['title'], threshold: 0.3 },
  })

  const list = results.length > 0 ? results : fineTypes

  return (
    <div className="flex flex-col gap-4">
      <input
        name="fine-type"
        autoComplete="off"
        onChange={({ target: { value } }) => onSearch(value)}
        className="px-4 py-2 w-full rounded outline-none bg-gray-3 hover:bg-gray-4 focus:bg-gray-5 border border-gray-7 focus:gray-8"
        placeholder="Search fine type"
      />

      {list.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {list.map((item) => (
            <div key={item.id} className="px-4 py-3 rounded bg-gray-3">
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
