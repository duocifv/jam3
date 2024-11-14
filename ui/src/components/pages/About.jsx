import Text from '@/components/core/Text'
import Columns from '@/components/core/Columns'
import Image from 'next/image'

const About = ({ block }) => {
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

    // case 'core/table': {
    //   const { url, alt, width } = attributes
    //   return (
    //     <Table

    //     />
    //   )
    // }
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

export default About
