import React from 'react'
import * as pageService from 'modules/page/page.service'
import { notFound } from 'next/navigation'
import About from '@/modules/pages/library/About'

export async function generateStaticParams() {
  const data = await pageService.getPagePath()
  return data || []
}

type PageProps = {
  params: Promise<{ pageSlug: string }>
}

const SamplePage = async (props: PageProps) => {
  const { pageSlug } = await props.params
  
  if (!pageSlug) notFound()
  const pageDetail = await pageService.getPageDetail(pageSlug)
  if (!pageDetail) notFound()
  return (
    <div>
      <h2>{pageDetail?.title}</h2>
      {pageDetail?.blocks?.page?.blocks?.map((block, index: number) => (
        <About key={index} block={block} />
      ))}
    </div>
  )
}

export default SamplePage
