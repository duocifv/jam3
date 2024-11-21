'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from './FormLogin.module.css'
import { useLogin } from '../feature/auth.store'

const FormLogin = () => {
  const login = useLogin()
  const { t } = useTranslation()
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  return (
    <div className={cn.login}>
      <h1>{t('login.username')}</h1>
      <button className={cn.button}>Hello</button>
      <div className={`flex ${cn.cols}`}>
        <label htmlFor={t('login.username')}>{t('login.username')}</label>
        <input
          type="text"
          name="username"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, username: e.target.value }))
          }
        />
      </div>
      <div className={`flex ${cn.cols}`}>
        <label htmlFor={t('login.password')}>{t('login.password')}</label>
        <input
          type="text"
          name="password"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <div className={`${cn.cols} flex justify-center p-4`}>
        <button
          onClick={async () => (await login).mutate(user)}
          className={`${cn.button}`}
        >
          {t('login.button')}
        </button>
      </div>
    </div>
  )
}

export default FormLogin
