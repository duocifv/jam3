import React from 'react'
import * as pageService from 'modules/page/page.service'
import { notFound } from 'next/navigation'
import Blocks from '@/modules/home/library/Blocks'

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
  console.log("pageDetail", pageDetail)
  if (!pageDetail) notFound()
  return (
    <div>
      <h2>{pageDetail?.title}</h2>
      {pageDetail?.page?.blocks?.map((block, index: number) => (
        <Blocks key={index} block={block} />
      ))}
    </div>
  )
}

export default SamplePage
