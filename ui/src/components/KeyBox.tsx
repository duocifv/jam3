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
  const [image, setImage] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [editKey, setEditKey] = useState<string>('')
  const [editValue, setEditValue] = useState<string>('')
  const [edit, setEdit] = useState(false)
  const [preview, setPreview] = useState(null)
  const pathname = usePathname()
  const segments = pathname.replace(/^\/|\/$/g, '').replaceAll('/', '_')
  const [rows, setRows] = useState(1)

  useEffect(() => {
    fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response?.json()
          if (!data?.[segments]) return setItems([])
          const result = Object.keys(data?.[segments]).map((key) => ({
            [key]: data?.[segments][key],
          }))
          setItems(result)
        } else {
          console.error(`Error: ${response.status} - ${await response.text()}`)
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [segments, refresh])

  // Xử lý thay đổi input để loại bỏ dấu và ký tự đặc biệt
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): string => {
    let value = e.target.value
    value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    value = value.replace(/[^a-zA-Z0-9]/g, '')
    return value
  }

  // Tạo key-value mới
  const handleCreate = async () => {
    let dataInput
    if (key && image) {
      dataInput = await handleUpload()
    }

    if (key && value) {
      dataInput = value
    }
    console.log(dataInput, key, image, value)

    if (!dataInput) {
      return alert('Vui lòng nhập key và value')
    }

    const newItem = { [key]: dataInput }
    const newItems = [...items, newItem]

    const data = newItems.reduce((acc, obj) => {
      const [key, value] = Object.entries(obj)[0]
      acc[key] = value
      return acc
    }, {})

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

  const handleUpload = async () => {
    console.log('calll api')
    const formData = new FormData()
    formData.append('image', image)
    try {
      const response = await fetch('http://localhost:3002/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data?.file) {
        //const fileString = JSON.stringify(data.file, null, 2)
        return data.file
      } else {
        alert('Upload failed!')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('An error occurred while uploading the image.')
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 w-80 min-h-full bg-gray-200 p-0  ${edit && '!w-0'}`}
    >
      <button
        onClick={() => setEdit(!edit)}
        className="absolute top-0 w-14 h-14 bg-red-400 right-[-56px]"
      >
        Edit
      </button>
      <div className={`p-4 min-h-full ${edit && 'hidden'}`}>
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
          <div className="flex justify-between">
            <label htmlFor="value">Value</label>
            <div>
            Number rows: 
            <input  
              type="text"
              className="border w-12 border-gray-600 rounded-md h-8 mb-4 px-3"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
            />
            </div>
          </div>
          
          {[...Array(rows)].map((item, index) => (
           <Row key={index} value={value} setValue={setValue} image={image} setImage={setImage}/>
          ))}

          {preview && (
            <div>
              <h3>Preview:</h3>
              <img
                src={preview}
                alt="Image Preview"
                style={{ width: '200px', height: 'auto' }}
              />
            </div>
          )}

          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 w-full"
              onClick={handleCreate}
            >
              Done
            </button>
          </div>
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
                  <pre className="text-sm">{key}</pre>
                  <pre className="text-md">
                    {JSON.stringify(value, null, 2)}
                  </pre>
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
    </div>
  )
}

export default KeyBox


const Row = (p) => {
  const [select, setSelect] = useState('text')
  const handleChange = (e) => {
    if (e.target.value === 'text') {
      p.setImage(null)
    }
    setSelect(e.target.value)
  }
  return ( <div className="mb-4 flex overflow-hidden" >
    <div className="flex justify-between mb-2">
      <select onChange={handleChange} value={select}>
        <option value="text">Text</option>
        <option value="image">Image</option>
      </select>
    </div>
    <div className="row">
      {select === 'text' && (
        <input
          type="text"
          className="border border-gray-600 rounded-md h-8 mb-4 w-full px-3"
          value={p.value}
          onChange={(e) => p.setValue(e.target.value)}
        />
      )}
      {select === 'image' && (
        <input
          type="file"
          accept="image/*"
          className="text-sm"
          onChange={(e) => {
            const file = e.target.files[0]
            if (file) {
              console.log('File selected:', file)
              p.setImage(file)
            } else {
              console.error('No file selected!')
            }
          }}
        />
      )}
    </div>
  </div>)
}