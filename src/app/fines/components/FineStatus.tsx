import clsx from 'clsx'

import { Fine } from '@app/fines'
import { getStatusText } from '@app/fines/helpers/getStatusText'

type Props = {
  status: Fine['status']
}

export const FineStatus = ({ status }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <span
        className={clsx('w-[10px] h-[10px] rounded-full', {
          'bg-green-9': status === 'paid',
          'bg-yellow-9': status === 'pending',
          'bg-red-9': status === 'unpaid',
        })}
      />

      {/* flex-1 prevents the status circle from shrinking */}
      <span className="flex-1">{getStatusText(status)}</span>
    </div>
  )
}
