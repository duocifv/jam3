import React from 'react'

// Định nghĩa kiểu dữ liệu cho bảng
type TableCell = {
  content: string
  tag: string
  scope?: string
  align?: 'left' | 'right' | 'center' // Giới hạn các giá trị align hợp lệ
  colspan?: string
  rowspan?: string
}

type TableRow = {
  cells: TableCell[]
}

type TableProps = {
  hasFixedLayout: boolean
  caption: string
  head: TableCell[]
  body: TableRow[]
  foot: TableCell[]
  anchor: string
}

const Table = ({ hasFixedLayout, caption, head, body, foot }: TableProps) => {
  return (
    <div
      className={`overflow-x-auto bg-white shadow-md rounded-lg ${hasFixedLayout ? 'table-fixed' : ''}`}
    >
      {caption && (
        <caption className="text-xl font-semibold mb-4">{caption}</caption>
      )}
      <table className="min-w-full table-auto">
        {/* Render table head */}
        {head.length > 0 && (
          <thead>
            <tr className="bg-gray-100">
              {head.map((cell, index) => (
                <th
                  key={index}
                  scope={cell.scope}
                  className="px-4 py-2 text-left"
                >
                  {cell.content}
                </th>
              ))}
            </tr>
          </thead>
        )}

        {/* Render table body */}
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2"
                  colSpan={cell.colspan ? Number(cell.colspan) : undefined} // Chuyển từ string sang number
                  rowSpan={cell.rowspan ? Number(cell.rowspan) : undefined} // Chuyển từ string sang number
                  style={{ textAlign: cell.align || 'left' }} // Gán giá trị align hợp lệ
                >
                  <div dangerouslySetInnerHTML={{ __html: cell.content }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* Render table footer */}
        {foot.length > 0 && (
          <tfoot>
            <tr className="bg-gray-100">
              {foot.map((cell, index) => (
                <td key={index} className="px-4 py-2 text-left">
                  {cell.content}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}

export default Table
