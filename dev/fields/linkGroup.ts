import type { LinkAppearances } from '@/fields/link'
import type { ArrayField, Field } from 'payload'

import { link } from '@/fields/link'
import { deepMerge } from '@/utilities/deepMerge'

type LinkGroupType = (options?: {
  appearances?: false | LinkAppearances[]
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
      }),
    ],
  }

  return deepMerge(generatedLinkGroup, overrides)
}
