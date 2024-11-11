import Column from './Column'
import { Blocks } from '@/app/pages/about/page'

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
  if (!blocks) return null
  return (
    <div
      className={`flex ${isStackedOnMobile ? 'flex-col md:flex-row' : 'flex-row'}`}
    >
      {blocks.map((block: Block, index) => {
        const attr = JSON.parse(block?.attributesJSON)
        if (!attr?.width) return
        return (
          <Column key={index} width={attr?.width ?? '100%'}>
            {block.innerBlocks.map((block: Block, index: number) => {
              return <Blocks key={index} block={block} />
            })}
          </Column>
        )
      })}
    </div>
  )
}

export default Columns
