import { type ChangeEvent, useMemo, useRef, useState } from 'react'

export function useInput(initialValue = '') {
  const [inputValue, setInputValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  const handlers = useMemo(
    () => ({
      handleInputChange: (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
      },
      resetInput: () => {
        setInputValue('')
      },
    }),
    []
  )

  return {
    inputValue,
    inputRef,
    ...handlers,
  }
}
