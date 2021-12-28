import { useState } from 'react'

import type { FineType } from '@domain/fine-type/entities'

export function useSelectFineType(initialValue?: FineType['id']) {
  const [selected, setSelected] = useState<FineType['id'] | null>(
    initialValue ?? null
  )

  return [selected, setSelected] as const
}
