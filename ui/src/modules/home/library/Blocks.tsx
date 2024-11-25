import Text from 'components/Text'
import Columns from 'components/Columns'
import Picture from '@/shared/components/Picture'
import Gallery from '@/shared/components/Gallery'

const Blocks = ({ block }) => {
  if (!block?.attributesJSON) return null
  const attributes = JSON.parse(block.attributesJSON)

  switch (block.name) {
    case 'core/heading': {
      const { fontSize, textColor, textAlign } = attributes
      return (
        <Text
          size={fontSize}
          color={textColor}
          align={textAlign}
          content={block.saveContent}
          className="font-bold"
        />
      )
    }
    case 'core/paragraph': {
      const { dropCap, fontSize, textColor, align } = attributes
      return (
        <Text
          dropCap={dropCap}
          color={textColor}
          align={align}
          size={fontSize || 'small'}
          content={block.saveContent}
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
    case 'core/gallery': {
      return (
        <Gallery innerBlocks={block.innerBlocks} />
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

export default Blocks
