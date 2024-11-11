// components/BlockColumns.tsx
import React from 'react'

type ColumnData = {
  image?: string
  text?: string
  style?: React.CSSProperties
  alt?: string
}

type BlockColumnsProps = {
  columns: ColumnData[]
}

const BlockColumns: React.FC<BlockColumnsProps> = ({ columns }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {columns.map((column, idx) => (
        <div
          key={idx}
          className="w-full sm:w-1/2 lg:w-1/3 p-4"
          style={column.style}
        >
          {column.image && (
            <img src={column.image} alt={column.alt} className="w-full" />
          )}
          {column.text && <p className="text-sm">{column.text}</p>}
        </div>
      ))}
    </div>
  )
}

export default BlockColumns
