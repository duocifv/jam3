import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from '../style/FormLogin.module.css'
import { loginService } from '../feature/auth.service'

const FormLogin = () => {
  const login = loginService()
  const { t } = useTranslation()
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  return (
    <div className={cn.login}>
      <h1>{t('login.username')}</h1>
      <div className={`flex ${cn.cols}`}>
        <label htmlFor={t('login.username')}>{t('form.username')}</label>
        <input
          type="text"
          name="username"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, username: e.target.value }))
          }
        />
      </div>
      <div className={`flex ${cn.cols}`}>
        <label htmlFor={t('login.password')}>{t('form.password')}</label>
        <input
          type="text"
          name="password"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <div className={`${cn.cols} flex justify-center p-4`}>
        <button onClick={() => login.mutate(user)} className={`${cn.button}`}>
          {t('form.button')}
        </button>
      </div>
    </div>
  )
}

export default FormLogin
