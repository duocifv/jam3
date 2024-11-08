// my-api/server.js
const express = require('express')
const app = express()
const port = 3001 // Chọn cổng mà bạn muốn

let callCount = 0

// Middleware để phân tích cú pháp JSON
app.use(express.json()) // Thêm middleware để phân tích cú pháp JSON từ body

// Endpoint để lấy cursors

app.post('/graphql', async (req, res) => {
  const url = 'http://jam.x10.bz/graphql'
  //const url = 'http://localhost/graphql'

  // Phân tích cú pháp body từ yêu cầu
  const body = req.body // Chỉnh sửa từ req.query thành req.body

  if (!body) {
    return res.status(400).json({ error: 'No body provided' }) // Kiểm tra nếu không có body
  }

  try {
    // Sử dụng dynamic import để gọi node-fetch
    const fetch = (await import('node-fetch')).default

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Gửi body từ yêu cầu đến
    })

    // Kiểm tra xem có lỗi không
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Error fetching from GraphQL server' })
    }

    const data = await response.json() // Nhận dữ liệu từ server GraphQL gốc

    callCount++ // Tăng biến đếm lên mỗi khi gọi hàm
    console.log(`${callCount} : ${body.query}`) // In ra số lần gọi

    return res.status(200).json(data) // Trả về dữ liệu
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Bắt đầu server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`)
})
