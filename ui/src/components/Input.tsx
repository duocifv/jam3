import React, { InputHTMLAttributes } from 'react'
import styles from '@/styles/module/Input.module.css'
import { capitalize } from '@/types/stringUtils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
  variant?: 'outline' | 'filled' | 'underline'
  inputSize?: 'small' | 'medium' | 'large'
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  variant = 'outline',
  inputSize = 'medium',
  ...props
}) => {
  const inputClass = `${styles.base} ${styles[`variant${capitalize(variant)}`]} ${
    styles[`size${capitalize(inputSize)}`]
  } ${errorMessage ? styles.error : ''}`

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <input {...props} className={inputClass} />
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  )
}

export default Input
