import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { Width } from '@/blocks/Form/Width'
import { RichText } from '@/components/RichText'
import React from 'react'

export const Message: React.FC<{ message: SerializedEditorState }> = ({ message }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  )
}
