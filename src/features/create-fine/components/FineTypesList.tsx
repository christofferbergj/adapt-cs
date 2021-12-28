import clsx from 'clsx'

import type { FineType } from '@domain/fine-type/entities'
import { useSearchableFineTypeList } from '@features/create-fine/hooks/useSearchableFineTypeList'
import { useSelectFineType } from '@features/create-fine/hooks/useSelectFineType'

import { Input } from '@components/elements/Input'

export const FineTypesList = () => {
  const [selected, setSelected] = useSelectFineType()
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
          value={inputValue}
          onChange={handleInputChange}
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
              onClick={() => handleSelectFineType(item.id)}
            >
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
