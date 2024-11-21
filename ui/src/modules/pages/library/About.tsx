import Text from 'components/Text'
import Columns from 'components/Columns'
import Picture from '@/shared/components/Picture'

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
        <Picture
          src={url}
          alt={alt}
          width={parseInt(width, 10) || 800}
          height={parseInt(width, 10) || 800}
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