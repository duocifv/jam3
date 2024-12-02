"use client"
import React, { ReactElement } from 'react'
import InnerHTML from './InnerHTML'

interface TextProps {
  level?: number
  size: 'small' | 'medium' | 'large'
  content: ReactElement | string
  dropCap?: boolean
  className?: string
  color?: string
  align?: string
}

const font = {
  small: 'text-base',
  medium: 'text-lg',
  large: 'text-2xl',
}
const textColor = {
  "vivid-red": 'text-red-600',
  black: 'text-black',
}

const textAlign = {
  center: "text-center",
  left: "text-left"
}
const Text: React.FC<TextProps> = ({
  level = 0,
  size = 'medium',
  content = '',
  color = 'black',
  align = "left",
  dropCap = false,
  ...props
}) => {
  const Tag =
    level === 0
      ? 'div'
      : // eslint-disable-next-line no-undef
        (`h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements)
  return (
    <Tag
      {...props}
    >
      <InnerHTML node={content.toString()} className={`${font[size]} ${textColor[color]} ${textAlign[align]} mb-4`} />
    </Tag>
  )
}

export default Text
