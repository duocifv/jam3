import React from 'react'
import PagesCtrl from '@/controllers/server/PagesCtrl'
import About from '@/components/pages/About'

const page = async () => {
  const data = await PagesCtrl.page('cG9zdDoxNjk=')

  return (
    <div>
      {data.blocks.map((block, index) => (
        <About key={index} block={block} />
      ))}
    </div>
  )
}

export default page
