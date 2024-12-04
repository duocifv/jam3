'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const endpoint = 'http://localhost:3002/key'

type Item = { key: string; value: string }

const KeyBox = () => {
  const [view, setView] = useState<Item | null>(null)
  const [items, setItems] = useState([])
  const [key, setKey] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [refresh, setRefresh] = useState(false)
  const [editKey, setEditKey] = useState<string>('')
  const [editValue, setEditValue] = useState<string>('')

  const pathname = usePathname()
  const segments = pathname.replace(/^\/|\/$/g, '').replaceAll('/', '_')

  // Fetch dữ liệu khi component mount hoặc refresh thay đổi
  useEffect(() => {
    fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response?.json()
          if (!data?.[segments]) return
          const result = Object.keys(data?.[segments]).map((key) => ({
            [key]: data?.[segments][key],
          }))
          setItems(result || [])
        } else {
          console.error(`Error: ${response.status} - ${await response.text()}`)
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [refresh])

  // Xử lý thay đổi input để loại bỏ dấu và ký tự đặc biệt
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): string => {
    let value = e.target.value
    value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    value = value.replace(/[^a-zA-Z0-9]/g, '')
    return value
  }

  // Tạo key-value mới
  const handleCreate = () => {
    if (!key || !value) return alert('Điền key và value')
    const newItem = { [key]: value }
   const newItems =  [...items, newItem]
   
   const data = newItems.reduce((acc, obj) => {
     const [key, value] = Object.entries(obj)[0];
     acc[key] = value;
     return acc;
    }, {});

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [segments]: data }),
    })
      .then(async (response) => {
        return await response.json()
      })
      .then(() => {
        setRefresh(!refresh)
        setKey('')
        setValue('')
      })
      .catch((error) => console.error('Error saving data:', error))
  }

  // Cập nhật key-value
  const handleUpdate = () => {
    if (!view) return

    const updatedItems = items.map((item) => {
      return item[view.key] ? { [editKey || view.key]: editValue } : item
    })
    const result = updatedItems.reduce((acc, obj) => {
      const [key, value] = Object.entries(obj)[0]
      acc[key] = value
      return acc
    }, {})
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [segments]: { ...result } }),
    })
      .then(async (response) => {
        return await response.json()
      })
      .then(() => {
        setItems(updatedItems)
        setView(null)
        alert('Đã cập nhật')
      })
      .catch((error) => console.error('Error updating data:', error))
  }

  return (
    <div className="fixed top-0 left-0 w-80 min-h-full bg-gray-200 p-4">
      {view && (
        <div className="absolute inset-0 bg-gray-200 z-50 p-4">
          <button
            className="ml-auto block px-4 py-1 text-blue-500"
            onClick={() => setView(null)}
          >
            Close
          </button>
          <label htmlFor="editKey">Key</label>
          <input
            type="text"
            className="border border-gray-600 rounded-md block w-full px-3 mb-2"
            defaultValue={view.key}
            onChange={(e) => setEditKey(inputChange(e))}
          />
          <label htmlFor="editValue">Value</label>
          <textarea
            rows={5}
            className="border border-gray-600 rounded-md block w-full px-3 mb-4"
            defaultValue={view.value}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      )}

      <div>
        <label htmlFor="key">Key</label>
        <input
          type="text"
          className="border border-gray-600 rounded-md h-8 mb-2 block w-full px-3"
          value={key}
          onChange={(e) => setKey(inputChange(e))}
        />
        <label htmlFor="value">Value</label>
        <input
          type="text"
          className="border border-gray-600 rounded-md h-8 mb-4 block w-full px-3"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleCreate}
        >
          Add Entry
        </button>
      </div>

      <div className="max-h-[74vh] overflow-y-auto scrollbar">
        {items.map((item, index) => {
          const key = Object.keys(item)[0]
          const value = item[key]
          return (
            <div
              key={index}
              className="border-b border-gray-700 mt-2 flex justify-between"
            >
              <div>
                <div className="text-sm">{key}</div>
                <div className="text-md">{value}</div>
              </div>
              <button
                className="text-blue-500 underline"
                onClick={() => setView({ key, value })}
              >
                Edit
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default KeyBox
