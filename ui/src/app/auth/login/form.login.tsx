'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

const FormLogin = () => {
  const { t } = useTranslation()
  return (
    <div>
      Hello form Login <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}

export default FormLogin
