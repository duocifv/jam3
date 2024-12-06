'use client'
import { Field } from '@/components/Field'
import { Button } from '@/stories/Button'
import Text from '@/stories/text'
import React, { useState } from 'react'
import { forgotService } from '../feature/auth.service'
import { useKeyBox } from '@/utils/useKeyBox'

const ForgotForm = () => {
  const { auth_forgot: t } = useKeyBox()
  const [value, setValue] = useState<string>()
  const dispatch = forgotService()
  const handleSend = () => {
    dispatch.mutate({ user_email: value })
  }
  return (
    <div>
      <Field
        copy={<Text copy={t.email} />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        copy={<Text copy={t.button} />}
        color="primary"
        onClick={handleSend}
      />
    </div>
  )
}

export default ForgotForm
