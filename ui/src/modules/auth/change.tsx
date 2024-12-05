import Input from '@/components/Input'
import Picture from '@/stories/picture'
import React from 'react'

const Change = async () => {
  return
  const { auth_change: value } = await import('../../content/data.json')
  if(!value?.old) {
    return
  }
  return (
    <div>
      <div>
        <label htmlFor="">{value.old}</label>
        <Input />
        <label htmlFor="">{value.new}</label>
        <Input />
        <label htmlFor="">{value.confirm}</label>
        <Input />
        <Picture
          src={value.img.fileUrl}
          width={value.img.width}
          height={value.img.height}
          alt=""
          className='bg-red-400'
        />
      </div>
    </div>
  )
}

export default Change
