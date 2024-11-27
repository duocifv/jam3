import ForgotPage from '@/modules/auth/forgot'
import { Button } from '@/stories/Button'
import React from 'react'

const Forgot = async () => {
  return (
    <div>
      Hello Forgot
      <div className='flex justify-center items-center'>
        <Button
          label="コンテスト"
          color="primary"
          size="small"
          className="w-28 min-h-24"
        />
        <Button
          label="研修会"
          color="primary"
          size="small"
          className="w-28 h-24"
        />
        <Button
          label="奨学金"
          color="primary"
          size="small"
          className="w-28 h-24"
        />
        <Button
          label="寮イベント"
          color="primary"
          size="small"
          className="w-28 h-24"
        />
        <Button
          label="つつじヶ丘男子学生会館"
          color="primary"
          size="small"
          className="w-28 h-24"
        />
        <Button
          label="相模大野学生会館"
          color="primary"
          size="small"
          className="w-28 h-24"
        />
      </div>
      <ForgotPage />
    </div>
  )
}

export default Forgot
