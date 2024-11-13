import React from 'react'
import PagesCtrl from '@/controllers/server/PagesCtrl'
import About from '@/components/pages/About'

const page = async () => {
  const pages = await PagesCtrl.all()
  return (
    <div>
      {pages.map((block, index) => (
        <About key={index} block={block} />
      ))}
    </div>
  )
}

export default page
