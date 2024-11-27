import React from 'react'
import clsx from 'clsx';

import './button.css'

export interface ButtonProps {
  primary?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary'
  circular?: boolean
  active?: boolean
  label: string
  loading?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export const Button = ({
  color = 'secondary',
  size = 'medium',
  circular = false,
  active = false,
  disabled = false,
  backgroundColor,
  className,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(cnBase, cnSize[size], cnColor[color], { [cnState.disabled]: disabled }, className)}
      {...props}
    >
      {label}
    </button>
  )
}

const cnBase = 'cursor-pointer transition duration-150 ease-in-out'
const cnSize = {
  small: 'text-sm rounded-sm py-2 px-4 border',
  medium: 'text-base rounded-md py-3 px-6 border-2',
  large: 'text-lg rounded-lg py-4 px-8 border-4',
}
const cnColor = {
  primary:
    'bg-primary text-white border-white hover:text-primary hover:bg-white',
  secondary:
    'bg-secondary text-white border-white hover:text-secondary hover:bg-white',
}
const cnState = {
  disabled: `cursor-default opacity-60 !bg-gray-400`,
}
