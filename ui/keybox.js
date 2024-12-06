const multer = require('multer')
const sharp = require('sharp')
const http = require('http')
const fs = require('fs')
const path = require('path')

// Cấu hình lưu tệp với multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads/'); // Chỉ định thư mục lưu tệp
//   },
//   filename: (req, file, cb) => {
//     // Giữ lại tên gốc và phần mở rộng của tệp
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage });

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

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
        // const key = Object.keys(items)[0];
        if (!items) {
          res.statusCode = 400
          res.end(JSON.stringify({ message: 'Items not provided in data' }))
          return
        }

        const filePath = path.join(__dirname, 'src', 'content', `data.json`)

        // Tạo thư mục nếu chưa có
        if (!fs.existsSync(path.dirname(filePath))) {
          fs.mkdirSync(path.dirname(filePath), { recursive: true })
        }

        // Đọc dữ liệu cũ từ tệp, nếu có
        let existingData = []
        if (fs.existsSync(filePath)) {
          const rawData = fs.readFileSync(filePath)
          existingData = JSON.parse(rawData)
        }

        // Cập nhật dữ liệu (Ở đây bạn có thể thay đổi cách cập nhật dữ liệu tùy theo nhu cầu)
        const updatedData = {...existingData, ...items} // Hoặc bạn có thể thay thế hoàn toàn dữ liệu nếu cần

        // Ghi dữ liệu vào file
        fs.writeFileSync(filePath, JSON.stringify(updatedData, {}, 2))

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
  } else if (req.method === 'POST' && req.url === '/upload') {
    // Sử dụng multer để xử lý việc tải lên tệp
    upload.single('image')(req, res, async (err) => {
      if (err) {
        res.statusCode = 400
        res.end(
          JSON.stringify({
            message: 'Error uploading file',
            error: err.message,
          })
        )
        return
      }

      if (!req.file) {
        res.statusCode = 400
        res.end(JSON.stringify({ message: 'No file uploaded' }))
        return
      }
      const outputPath = path.join(
        __dirname,
        'public/uploads',
        `${Date.now()}.webp`
      )
      const result = await sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toFile(outputPath)

      res.end(
        JSON.stringify({
          file: {
            //originalFileName: req.file.originalname,
            fileUrl: `/uploads/${path.basename(outputPath)}`,
            size: result.size, // Image size after processing
            //format: result.format,
            width: result.width, // Image width after processing
            height: result.height, // Image height after processing
          },
        })
      )
    })
  } else if (req.method === 'GET' && req.url === '/key') {
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
        res.end(
          JSON.stringify({ message: 'Failed to read data', error: err.message })
        )
        return
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(data || {}) // Gửi dữ liệu từ file về client
    })
  } else {
    res.statusCode = 404
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

// Lắng nghe trên cổng 3002
server.listen(3002, () => {
  console.log('Server running at http://localhost:3002/')
})
