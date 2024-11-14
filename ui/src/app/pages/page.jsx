import React from 'react'
import * as pagesService from 'server/pages.service'
import About from '@/components/pages/About'

const page = async () => {
  const data = await pagesService.all()
  return (
    <div>
      {data.map((block, index) => (
        <About key={index} block={block} />
      ))}
    </div>
  )
}

export default page
