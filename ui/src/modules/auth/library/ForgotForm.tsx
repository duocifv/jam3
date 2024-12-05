'use client'
import { Field } from '@/components/Field'
import { Button } from '@/stories/Button'
import Text from '@/stories/text'
import React, { useState } from 'react'
import { forgotService } from '../feature/auth.service'

const ForgotForm = ({ label }) => {
  const [value, setValue] = useState<string>()
  const dispatch = forgotService()
  const handleSend = () => {
    dispatch.mutate({ user_email: value })
  }
  return (
    <div>
      <Field
        copy={<Text>{label.email}</Text>}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        content={<Text>{label.send}</Text>}
        color="primary"
        onClick={handleSend}
      />
    </div>
  )
}

export default ForgotForm
