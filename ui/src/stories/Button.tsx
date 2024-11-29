import React, { FC, ReactElement, ReactNode } from 'react'
import clsx from 'clsx'
import './Button.css'

export interface ButtonProps {
  primary?: boolean
  media?: 'small' | 'medium' | 'large' 
  color?: 'primary' | 'secondary'
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
  active = false,
  media= 'small',
  disabled = false,
  outlined = false,
  loading = false,
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
        'button',
        outlined ? outlines[color] : colors[color],
        loading && 'loading',
        disabled && 'opacity-60',
        medias[media],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {iconStart && <span className="icon">{iconStart}</span>}
      <span>{label}</span>
      {iconEnd && <span className="icon">{iconEnd}</span>}
    </button>
  )
}
const medias = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
}
const colors = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
}
const outlines = {
  primary: 'border border-primary text-primary bg-white',
  secondary: 'border border-secondary text-secondary bg-white',
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
