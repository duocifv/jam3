'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const MenuList = ({ initialData, path, children }) => {
  const [open, setOpen] = useState(false)
  if (initialData.length === 0) return
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-xl text-lime-700 font-bold">{children}</h3>
        <button
          onClick={() => setOpen(!open)}
          className="bg-lime-600 p-2 text-gray-50"
        >
          Module
        </button>
      </div>
      <hr className="bg-lime-700" />
      {open &&
        initialData.map((item, index) => (
          <div key={index}>
            <Link href={`${path}/${item.slug}`}>
              {item.name} {item?.count && `(${item.count})`}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default MenuList
