import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import type { FineType } from '@features/fine-types/entities'
import { useFineTypes } from '@features/fine-types/hooks/useFineTypes'
import { useFuse } from '@hooks/useFuse'

import { Input } from '@components/elements/Input'

export const FineTypesList = () => {
  const [selected, setSelected] = useState<FineType['id'] | null>(null)
  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { fineTypes } = useFineTypes()
  const { results, onSearch } = useFuse<FineType>({
    list: fineTypes,
    options: { keys: ['title'], threshold: 0.3 },
  })

  useEffect(() => onSearch(value), [onSearch, value])

  const list = results.length > 0 ? results : fineTypes

  const handleSelect = (id: FineType['id']) => {
    value && inputRef.current?.focus()
    setValue('')

    if (selected === id) {
      return setSelected(null)
    }

    setSelected(id)
  }

  return (
    <div className="flex flex-col gap-4">
      <Input.Wrapper>
        <Input.Label htmlFor="fine-type">Fine types</Input.Label>

        <Input.Element
          ref={inputRef}
          id="fine-type"
          autoComplete="off"
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
          placeholder="E.g. 'Møde for sent'"
        />
      </Input.Wrapper>

      {list.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {list.map((item) => (
            <button
              key={item.id}
              className={clsx(
                'p-5 rounded border transition-colors outline-none font-semibold text-sm',
                {
                  'border-gray-7 hover:border-gray-8 hover:bg-gray-4 focus:bg-gray-4':
                    selected !== item.id,
                  'border-purple-7 hover:border-purple-8 focus:border-purple-8 bg-purple-5 hover:bg-purple-6 focus:bg-purple-6':
                    selected === item.id,
                }
              )}
              onClick={() => handleSelect(item.id)}
            >
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
