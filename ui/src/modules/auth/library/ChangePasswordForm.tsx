import Input from '@/components/Input'
import { Button } from '@/stories/Button'
import { useKeyBox } from '@/utils/useKeyBox'
import React from 'react'

const ChangePasswordForm = () => {
  const { auth_change: t } = useKeyBox()
  return (
    <div>
      <label htmlFor="">{t.old}</label>
      <Input />
      <label htmlFor="">{t.new}</label>
      <Input />
      <label htmlFor="">{t.confirm}</label>
      <Input />
      <Button copy={t.button} color="primary" />
    </div>
  )
}

export default ChangePasswordForm
