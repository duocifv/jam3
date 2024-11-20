import React from 'react'
import FormRegister from './form.register'
import cn from  './register.module.css'

const RegisterPage = () => {
  return (
    <div className={cn.register}>
      Register Page
      <FormRegister />
    </div>
  )
}

export default RegisterPage
