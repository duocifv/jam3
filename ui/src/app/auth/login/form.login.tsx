'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './login.module.css'
import cn from  '@/styles/module/Button.module.css'
const FormLogin = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.login}>
      Hello form Login <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      <button className={cn.buttonBase}>Hello</button>
    </div>
  )
}

export default FormLogin
