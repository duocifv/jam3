import About from '@/modules/shared/library/Blocks'
import Column from './Column'

type Block = {
  name: string
  attributesJSON: string
  order?: number
  innerBlocks: []
}
interface ColumnsProps {
  isStackedOnMobile?: boolean
  blocks: Block[]
}

const Columns = ({ isStackedOnMobile = true, blocks }: ColumnsProps) => {

  if (!blocks?.length) return null

  return (
    <div
      className={`flex ${isStackedOnMobile ? 'flex-col md:flex-row' : 'flex-row'}`}
    >
      {blocks.map((block: Block, index) => {
        const attr = JSON.parse(block?.attributesJSON)
        return (
          <Column key={index} width={attr?.width ?? '100%'}>
            {block.innerBlocks.map((block: Block, index: number) => {
              return <About key={index} block={block} />
            })}
          </Column>
        )
      })}
    </div>
  )
}

export default Columns
