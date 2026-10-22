import type { OrderStatus as StatusOptions } from '@/payload-types'

import { cn } from '@/utilities/cn'

type Props = {
  className?: string
  status: StatusOptions
}

export const OrderStatus: React.FC<Props> = ({ className, status }) => {
  return (
    <div
      className={cn(
        'text-xs tracking-widest font-mono uppercase py-0 px-2 rounded w-fit',
        className,
        {
          'bg-primary/10': status === 'processing',
          'bg-success': status === 'completed',
        },
      )}
    >
      {status}
    </div>
  )
}
