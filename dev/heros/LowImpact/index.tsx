import type { Page } from '@/payload-types'

import { RichText } from '@/components/RichText'
import React from 'react'

type LowImpactHeroType =
  | ({
      children?: never
      richText?: Page['hero']['richText']
    } & Omit<Page['hero'], 'richText'>)
  | {
      children?: React.ReactNode
      richText?: never
    }

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-3xl">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
