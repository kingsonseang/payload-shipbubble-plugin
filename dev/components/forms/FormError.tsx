import clsx from 'clsx'

type Props = {
  as?: 'p' | 'span'
  className?: string
  message?: string
}

export const FormError: React.FC<Props> = ({ as, className, message }) => {
  const Element = as || 'p'

  if (!message) {
    return null
  }

  return <Element className={clsx('text-error text-sm', className)}>{message}</Element>
}
