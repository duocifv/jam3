import Input from '@/components/Input'
import React from 'react'

const Change = async () => {
  const { auth_change: password } = await import("../../content/data.json")
  return (
    <div>
      <div>
        <label htmlFor="">{password.old}</label>
        <Input />
        <label htmlFor="">{password.new}</label>
        <Input />
        <label htmlFor="">{password.confirm}</label>
        <Input />
      </div>
    </div>
  )
}

export default Change
