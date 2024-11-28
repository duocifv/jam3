import React, { FC, ReactElement, ReactNode } from 'react'
import clsx from 'clsx'
import cn from './button.module.css'

export interface ButtonProps {
  primary?: boolean
  backgroundColor?: string
  size?: 'small' | 'normal' | 'medium' | 'large'
  color?: 'primary' | 'secondary'
  rounded?: boolean
  active?: boolean
  label: string
  outlined?: boolean
  loading?: boolean
  disabled?: boolean
  iconStart?: ReactElement
  iconEnd?: ReactElement
  className?: string
  onClick?: () => void
}

export const Button = ({
  color = 'secondary',
  size = 'normal',
  rounded = false,
  active = false,
  disabled = false,
  outlined = false,
  loading = false,
  backgroundColor,
  iconStart,
  iconEnd,
  className,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        cn.button,
        cnSize[size],
        outlined ? cnOutlined[color] : cnColor[color],
        rounded && '!rounded-full',
        loading && cn.loading,
        disabled && 'opacity-60',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {iconStart && <span className={cn.icon}>{iconStart}</span>}
      <span>{label}</span>
      {iconEnd && <span className={cn.icon}>{iconEnd}</span>}
    </button>
  )
}

const cnColor = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
}
const cnOutlined = {
  primary: 'border border-primary text-primary bg-white',
  secondary: 'border border-secondary text-secondary bg-white',
}
const cnSize = {
  small: 'text-sm',
  normal: 'text-base',
  medium: 'text-md',
  large: 'text-lg',
}

export const ButtonGroup: FC<{
  children: ReactNode
  align: 'start' | 'center' | 'end'
  gap: number
}> = (props) => {
  return (
    <div
      className={`flex gap-2 justify-${props.align}`}
      style={{ gap: props.gap }}
    >
      {props.children}
    </div>
  )
}
