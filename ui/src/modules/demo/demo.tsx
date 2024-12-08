import React from 'react'
import { demoService } from './feature/demo.service'

const Demo = async () => {
  const data = await demoService()
  return (
    <div>
      {data?.map((item, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </div>
  )
}

export default Demo
