import React from 'react'
import PagesCtrl from '@/controllers/server/PagesCtrl'
import Text from '@/components/common/Text'
import Columns from '@/components/common/Columns'
import Image from 'next/image'

export const Blocks = ({ block }) => {
  if (!block?.attributesJSON) return null
  const attributes = JSON.parse(block.attributesJSON)
  switch (block.name) {
    case 'core/heading': {
      const { level, fontSize, content } = attributes
      return (
        <Text
          level={level}
          size={fontSize}
          content={content}
          className="font-bold"
        />
      )
    }
    case 'core/paragraph': {
      const paragraph = attributes
      return (
        <Text
          dropCap={paragraph?.dropCap}
          size={paragraph?.fontSize || 'small'}
          content={paragraph?.content}
        />
      )
    }
    case 'core/columns': {
      return (
        <Columns
          isStackedOnMobile={attributes?.isStackedOnMobile}
          blocks={block.innerBlocks}
        />
      )
    }
    case 'core/image': {
      const { url, alt, width } = attributes
      return (
        <Image
          src={url}
          alt={alt}
          width={parseInt(width, 10) || '100%'}
          height={parseInt(width, 10) || '100%'}
        />
      )
    }
    case 'core/separator':
      return <hr className="border border-red-600" />
    default:
      return null
  }
}

const page = async () => {
  const data = await PagesCtrl.page('cG9zdDoxNjk=')

  return (
    <div>
      {data.blocks.map((block, index) => (
        <Blocks key={index} block={block} />
      ))}
    </div>
  )
}

export default page
