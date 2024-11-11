import React, { ReactElement } from 'react'
import InnerHTML from './InnerHTML'

interface TextProps {
  level: number
  size: 'small' | 'medium' | 'large'
  content: ReactElement | string
  dropCap: boolean
}

const font = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
}

const Text: React.FC<TextProps> = ({
  level = 0,
  size = 'medium',
  content = '',
  dropCap = false,
  ...props
}) => {
  const Tag =
    level === 0
      ? 'p'
      : (`h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements)
  return (
    <Tag
      className={font[size]}
      style={dropCap ? { textTransform: 'capitalize' } : {}}
      {...props}
    >
      <InnerHTML node={content.toString()} />
    </Tag>
  )
}

export default Text
