'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const endpoint = 'https://cms.duocnv.top/wp-json/custom-data-json/v1'

type Item = { key: string; value: string }

const KeyBox = () => {
  const [view, setView] = useState<Item | null>(null)
  const [items, setItems] = useState([])
  const [key, setKey] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [values, setValues] = useState<object>({})
  const [image, setImage] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [editKey, setEditKey] = useState<string>('')
  const [editValue, setEditValue] = useState<string>('')
  const [edit, setEdit] = useState(false)
  const [preview, setPreview] = useState(null)
  const pathname = usePathname()
  const segments = pathname.replace(/^\/|\/$/g, '').replaceAll('/', '_')
  const [rows, setRows] = useState(1)
  const [loading, setLoading] = useState(false)
  console.log("values", values)
  useEffect(() => {
    fetch(`${endpoint}/list/${segments}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        if (response.ok) {
          const { data } = await response?.json()
          if (!data) return setItems([])
          const text = JSON.parse(data)
          const result = Object.keys(text?.data).map((key) => ({
            [key]: text?.data[key],
          }))
          setItems(result)
          console.log('result', result)
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
    setLoading(true)
    let dataInput
    if (key && image) {
      dataInput = await handleUpload()
    }

    if (key && value || key && values ) {
      dataInput = rows === 1 ? value : values
    }
    
    
   
    if (!dataInput) {
      return alert('Vui lòng nhập key và value')
    }

    const newItem = { [key]: dataInput }
    const newItems = [...items, newItem]
    console.log("newItems", newItems)

    const data = newItems.reduce((acc, obj) => {
      const [key, value] = Object.entries(obj)[0]
      acc[key] = value
      return acc
    }, {})

    let urlParam = 'update'
    if (!items) {
      urlParam = 'add'
    }

    fetch(`${endpoint}/${urlParam}/${segments}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: data,
      }),
    })
      .then(async (response) => {
        setLoading(false)
        alert('Đã tạo xong')
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
    fetch(`${endpoint}/update/${segments}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { ...result } }),
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
    const formData = new FormData()
    formData.append('image', image)
    try {
      const response = await fetch('http://localhost:3002/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data?.file) {
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
      <div className={`p-4 min-h-full ${edit ? 'hidden' : ''} max-h-full overflow-y-scroll`}>
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
          {rows === 1 && ( <input
              type="text"
              className="border border-gray-600 rounded-md h-8 mb-4 w-full px-3"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />)
          }
         
          {rows > 1 && [...Array(rows)].map((item, index) => (
            <Row
              key={index}
              setValues={setValues}
              image={image}
              items={items}
              keys={key}
              setImage={setImage}
              loading={loading}
            />
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
              className={`bg-blue-500 text-white px-4 py-2 w-full ${loading && 'bg-gray-500'}`}
              onClick={handleCreate}
            >
              {loading ? 'Loading' : 'Done'}
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
  const [key, setKey] = useState<string>()
  const [value, setValue] = useState<string>()
  const handleChange = (e) => {
    if (e.target.value === 'text') {
      p.setImage(null)
    }
    setSelect(e.target.value)
  }
  useEffect(()=> {
    if(p.loading) {
      setValue('')
      setKey('')
    }
  },[p.loading])
  const keyPrimary= p.items.find(item =>item[p.keys]) || {}
  return (
    <div className="mb-4 flex overflow-hidden">
      <div className="flex justify-between mb-2">
        <select onChange={handleChange} value={select}>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
      </div>
      <div className="row">
        {select === 'text' && (
          <>
            <input
              type="text"
              className="border border-gray-600 rounded-md h-8 mb-4 w-full px-3"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <input
              type="text"
              className="border border-gray-600 rounded-md h-8 mb-4 w-full px-3"
              value={value}
              onChange={(e) => {
                const { value } = e.target;
                setValue(value)
                p.setValues((prev) => ({...keyPrimary[p.keys], ...prev, [key]: value}));
              }}
            />
          </>
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
    </div>
  )
}
