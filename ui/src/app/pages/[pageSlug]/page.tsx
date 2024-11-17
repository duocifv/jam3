import React from 'react'
import * as pageService from '@/modules/page/page.service'
import About from '@/components/pages/About'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const data = await pageService.getPagePath()
  return data || []
}

type PageProps = {
  params: Promise<{ pageSlug: string }>
}
type Block = {
  name: string
  attributesJSON?: string
  order?: number
  innerBlocks?: []
}

const page = async ({ params }: PageProps) => {
  const { pageSlug } = await params
  if (!pageSlug) notFound()
  const pageDetail = await pageService.getPageDetail(pageSlug)

  if (!pageDetail) notFound()
  return (
    <div>
      <h2>{pageDetail?.title}</h2>
      {pageDetail.blocks.page.blocks.map((block: Block, index: number) => (
        <About key={index} block={block} />
      ))}
    </div>
  )
}

export default page
