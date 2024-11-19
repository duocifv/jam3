import React, { ReactNode } from 'react'

interface ColumnProps {
  width?: string
  children: ReactNode
}

const Column: React.FC<ColumnProps> = ({ width = 'auto', children }) => {
  return (
    <div className={`p-4`} style={{ width }}>
      {children}
    </div>
  )
}

export default Column
