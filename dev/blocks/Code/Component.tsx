import { Code } from '@/blocks/Code/Component.client'
import React from 'react'

export type CodeBlockProps = {
  blockType: 'code'
  code: string
  language?: string
}

export const CodeBlock: React.FC<
  {
    className?: string
    id?: number | string
  } & CodeBlockProps
> = ({ className, code, language }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code code={code} language={language} />
    </div>
  )
}
