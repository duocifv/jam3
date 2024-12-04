const http = require('http')
const fs = require('fs')
const path = require('path')

// Tạo server đơn giản
const server = http.createServer((req, res) => {
  // Thêm header CORS để cho phép tất cả các domain
  res.setHeader('Access-Control-Allow-Origin', '*') // Cho phép tất cả các nguồn
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Xử lý yêu cầu OPTIONS (Preflight CORS request)
  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
    return
  }

  // Xử lý yêu cầu POST tại route /save
  if (req.method === 'POST' && req.url === '/key') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        // Kiểm tra xem body có dữ liệu hay không
        if (!body) {
          res.statusCode = 400
          res.end(JSON.stringify({ message: 'No data provided' }))
          return
        }

        // Parse dữ liệu từ body
        const items = JSON.parse(body)

        if (!items) {
          res.statusCode = 400
          res.end(JSON.stringify({ message: 'Items not provided in data' }))
          return
        }

        const filePath = path.join(__dirname, 'src', 'content', 'data.json')

        // Tạo thư mục nếu chưa có
        if (!fs.existsSync(path.dirname(filePath))) {
          fs.mkdirSync(path.dirname(filePath), { recursive: true })
        }

        // Ghi dữ liệu vào file
        fs.writeFileSync(filePath, JSON.stringify(items, {}, 2))

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ message: 'Data saved successfully' }))
      } catch (error) {
        // Xử lý lỗi khi JSON không hợp lệ
        res.statusCode = 400
        res.end(
          JSON.stringify({
            message: 'Failed to parse JSON',
            error: error.message,
          })
        )
      }
    })
  } 
  // Xử lý yêu cầu GET tại route /all để lấy tất cả dữ liệu
  else if (req.method === 'GET' && req.url === '/key') {
    const filePath = path.join(__dirname, 'src', 'content', 'data.json')

    // Kiểm tra xem tệp data.json có tồn tại không
    if (!fs.existsSync(filePath)) {
      res.statusCode = 404
      res.end(JSON.stringify({ message: 'No data found' }))
      return
    }

    // Đọc dữ liệu từ tệp và gửi trả về
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end(JSON.stringify({ message: 'Failed to read data', error: err.message }))
        return
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(data || {}) // Gửi dữ liệu từ file về client
    })
  } 
  else {
    res.statusCode = 404
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

// Lắng nghe trên cổng 3002
server.listen(3002, () => {
  console.log('Server running at http://localhost:3002/')
})
