import { cn } from '@/utilities/cn'

type Props = {
  children?: React.ReactNode
  className?: string
}

export const FormItem: React.FC<Props> = ({ children, className }) => {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>
}
