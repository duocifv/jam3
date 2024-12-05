import React from 'react'
import ForgotForm from './library/ForgotForm'

const ForgotPage = async () => {
  return
  const { auth_forgot } = await import('../../content/data.json')
  if (!auth_forgot) return
  return <ForgotForm label={auth_forgot} />
}

export default ForgotPage
