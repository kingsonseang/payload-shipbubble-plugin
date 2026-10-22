import type { Cart as CartType } from '@/payload-types'

import { CartModal } from '@/components/Cart/CartModal'
import React from 'react'

export type CartItem = NonNullable<CartType['items']>[number]

export function Cart() {
  return <CartModal />
}
