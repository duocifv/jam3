import React from 'react'
import PagesCtrl from '@/controllers/server/PagesCtrl'
import About from '@/components/pages/About'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return await PagesCtrl.path()
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

  const detail = await PagesCtrl.detail(pageSlug)
  return (
    <div>
      <h2>{detail?.title}</h2>
      {detail.blocks.map((block: Block, index: number) => (
        <About key={index} block={block} />
      ))}
    </div>
  )
}

export default page
