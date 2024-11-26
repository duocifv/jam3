import React from 'react'
import * as pageService from '@/modules/page/feature/page.service'
import { notFound } from 'next/navigation'

const page = async () => {
  const pagesList = await pageService.getPagesList()
  if (!pagesList?.length) notFound()
  return (
    <div>
      {pagesList.map((item) => (
        <div key={item.pageId}>
          <h2>
            {item.title} | {item.slug}
          </h2>
        </div>
      ))}
    </div>
  )
}

export default page
