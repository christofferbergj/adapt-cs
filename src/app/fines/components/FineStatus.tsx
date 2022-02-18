import clsx from 'clsx'

import { Fine } from '@app/fines'
import { getStatusText } from '@app/fines/helpers/getStatusText'

type Props = {
  status: Fine['status']
}

export const FineStatus = ({ status }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={clsx('h-[10px] w-[10px] rounded-full', {
          'bg-green-9': status === 'paid',
          'bg-yellow-9': status === 'pending',
          'bg-red-9': status === 'unpaid',
        })}
      />

      {/* flex-1 prevents the status circle from shrinking */}
      <span className="flex-1 truncate">{getStatusText(status)}</span>
    </div>
  )
}
