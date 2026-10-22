import { HeaderClient } from '@/components/Header/index.client'

import './index.css'

import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Header() {
  const header = await getCachedGlobal('header', 1)()

  return <HeaderClient header={header} />
}
