import React, { ButtonHTMLAttributes } from 'react'
import styles from '@/styles/module/Button.module.css'
import { capitalize } from '@/types/stringUtils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  full?: boolean
  isLoading?: boolean
  disabled?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  full = false,
  iconLeft,
  iconRight,
  disabled = false,
  ...props
}) => {
  const buttonClass = getButtonClass(variant, size, isLoading, disabled)

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${buttonClass} ${full ? 'w-full' : ''}`}
    >
      {isLoading ? (
        <span className="loader"></span> // Loader khi đang tải
      ) : (
        <>
          {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
          {children}
          {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
        </>
      )}
    </button>
  )
}

export default Button

function getButtonClass(
  variant: string,
  size: string,
  isLoading: boolean,
  disabled: boolean
) {
  const variantClass = styles[variant]
  const sizeClass = styles[`size${capitalize(size)}`]
  const disabledClass = disabled || isLoading ? styles.disabled : ''

  return `${styles.buttonBase} ${variantClass} ${sizeClass} ${disabledClass}`
}
